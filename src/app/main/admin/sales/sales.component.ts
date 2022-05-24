import { Component, OnInit } from '@angular/core';
import { AuthenticationService as Auth } from '@core/core/authentication.service'
import { SalesOrder } from 'app/Models/Sales';
import { LazyLoadEvent } from '../../../Models/lazyloadevent';
import {SalesService} from '../sales/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  public contentHeader: object;
  noOfRows: number=10;
  salesOrder : any;
  totalRecords: number;
  cols: any[];
  loading: boolean = false;


  constructor(private auth: Auth, private salesService : SalesService) {

  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Sales-Order',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/sales'
          }
        ]
      }
    };
    this.loadDataForOpen();
  }

  loadDataForOpen() {
    this.loading = false;
    this.salesService.getOpenSalesOrder().subscribe(
      (data) => {
        this.salesOrder = data.content;
        this.totalRecords = data.content.length;
        this.loading = false;
      }
    )

  }

  loadDataForClose() {
    ;
    this.loading = false;
    this.salesService.getCloseSalesOrder().subscribe(
      (data) => {
        this.salesOrder = data.content;
        this.totalRecords = data.content.length;
        this.loading = false;
      }
    )

  }


}
