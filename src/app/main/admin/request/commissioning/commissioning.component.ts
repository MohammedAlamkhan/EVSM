import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommissioningService } from '../../approval/commissioning/commissioning.service';
import { IrfService } from '../../irf/irf.service';

@Component({
  selector: 'app-commissioning',
  templateUrl: './commissioning.component.html',
  styleUrls: ['./commissioning.component.scss']
})
export class CommissioningComponent implements OnInit {
public contentHeader :object
assests: any;
noOfRows: number = 20;

totalRecords: number;
loading: boolean = false;
cols: any[];
irf: any;
commissions:any;
first: any;
  constructor(
    private _Commissioning:CommissioningService,private router: Router,
    private route: ActivatedRoute,private irfService: IrfService, 
 ) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Commissioning',
      actionButton: true,
      breadcrumb: {
      type: '',
      links: [
        {
        name: 'Home',
        isLink: true,
        link: '/sales'
        },
        // {
        // name: 'Sales',
        // isLink: true,
        // link: '/'
        // }
        // {
        //   name: 'Accordion',
        //   isLink: false
        // }
      ]
      }
    };
    }

    
//     loadData($event) {
//       this.first = $event.first;
//       const req={
//         "page":$event.first/this.noOfRows,
//         "size":$event.rows
//       }
//       this.loading = true;
//             this._Commissioning.getCommisioning(req).subscribe(
//               (data) => {
//                // console.log(data);
               
//                 this.assests = data.content;
//              //   console.log('zdzsdsad', this.assests);
//                 this.totalRecords = data.totalRecords;
//                 this.loading = false;
//               }
//             )
// }

loadData($event) {
  this.first = $event.first;
  const req={
    "page":$event.first/this.noOfRows,
    "size":$event.rows
  }
  this.loading = true;
  this.assests =   this._Commissioning.getCommisioning(req).subscribe(
    (data) => {
      this.assests = data.content;
      this.totalRecords = data.totalElements;
      this.loading = false;
    }
  )
}


passIrfData(index){
  
  this.irfService.irfId = this.assests[index-this.first].irfId;
  this.irf =   this.irfService.getIrfInformationById().subscribe(
    (data) => {
      this.irfService.selectedIrf = data;
      this.loading = true;
      this.go_next('\irf-details');
    }
  )
}

go_next(route){
  setTimeout(() => {
      this.loading = false;
      this.router.navigate([route])
    }
    , 100);
}

}

