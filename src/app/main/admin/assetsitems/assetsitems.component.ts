import { Component, OnInit } from '@angular/core';
import { AssetsService } from './assetsitems.service'
import { ActivatedRoute } from '@angular/router';
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
  constructor(private assetsService: AssetsService ,
    private route: ActivatedRoute) { }

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
    this.assetsService.selectedAsset = this.assets[index];
  }

  loadData($event) {
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
