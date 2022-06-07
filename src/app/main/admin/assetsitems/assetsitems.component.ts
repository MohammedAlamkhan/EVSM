import { Component, OnInit } from '@angular/core';
import { AssetsService } from './assetsitems.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assetsitems',
  templateUrl: './assetsitems.component.html',
  styleUrls: ['./assetsitems.component.scss']
})
export class AssetsitemsComponent implements OnInit {
public contentHeader :object;
assets:any;
loading: boolean = false;
noOfRows: number=5;
totalRecords: number;
cols: any[];
  first: any;
  constructor(private assetsService: AssetsService ,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Assets',
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
  // this.loadData();
  }


  passAssetData(index){
    
    this.assets =   this.assetsService.getSingleAssetsInformation(this.assets[index-this.first].id).subscribe(
      (data) => {
        this.assetsService.selectedAsset = data;
        this.go_next('\comp-assets');
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
    this.assets =   this.assetsService.getAssetsInformation(req).subscribe(
      (data) => {
        this.assets = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )
  }

}
