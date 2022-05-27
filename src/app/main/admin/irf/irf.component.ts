import { Component, OnInit } from '@angular/core';
import {IrfService} from './irf.service'
@Component({
  selector: 'app-irf',
  templateUrl: './irf.component.html',
  styleUrls: ['./irf.component.scss']
})
export class IrfComponent implements OnInit {
  public contentHeader: object
  irfs: any;
  loading: boolean = false;
  noOfRows: number=10;
  totalRecords: number;


  constructor(private irfService: IrfService) { }
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
    this.loadData();
  }

  passIrfData(index){
    this.irfService.selectedIrf = this.irfs[index];
  }

  passAssetData(index){
    this.irfService.selectedIrf = this.irfs[index];
  }


  loadData() {
    this.loading = true;
    this.irfs =   this.irfService.getIrfInformation().subscribe(
      (data) => {
        this.irfs = data.content;
        this.totalRecords = data.content.length;
        this.loading = false;
      }
    )
  }

}
