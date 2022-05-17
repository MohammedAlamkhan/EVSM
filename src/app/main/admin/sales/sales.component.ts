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
  noOfRows: number = 9;
  salesOrder : SalesOrder[];
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
    this.loading = true;
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    this.salesService.getOpenSalesOrder({ lazyEvent: JSON.stringify(event) }).subscribe(
      (data) => {
        this.salesOrder = data.salesOrder;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }
    )

  }

  loadDataForClose(event: LazyLoadEvent) {
    ;
    this.loading = true;
    this.salesService.getCloseSalesOrder({ lazyEvent: JSON.stringify(event) }).subscribe(
      (data) => {
        ;
        this.salesOrder = data.salesOrder;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }
    )

  }


}
