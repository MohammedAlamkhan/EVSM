import { Component, OnInit } from '@angular/core';
import {IrfService} from './irf.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-irf',
  templateUrl: './irf.component.html',
  styleUrls: ['./irf.component.scss']
})
export class IrfComponent implements OnInit {
  public contentHeader: object
  irfs: any;
  loading: boolean = false;
  noOfRows: number=5;
  totalRecords: number;
  first: any;


  constructor(private irfService: IrfService, private router: Router) { }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'IRF',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/sales'
          },

        ]
      }
    };
    // this.loadData();
  }

  passIrfData(index){
    this.irfService.irfId = this.irfs[index-this.first].id;
    this.irfService.selectedIrf =  this.irfService.getIrfInformationById().subscribe(
      (data) => {
        this.irfService.selectedIrf = data;
        this.go_next('\irf-details');
      }
    )
  }

  go_next(route){
    setTimeout(() => {
        this.loading = false;
        this.router.navigate([route])
      }
      , 1000);
}


  loadData($event) {
    this.first = $event.first;
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.irfs =   this.irfService.getIrfInformation(req).subscribe(
      (data) => {
        this.irfs = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )
  }

}
