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
  noOfRows: number=5;
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
    // this.loadDataForOpen();
  }

  passSalesData(index){
    this.salesService.selectedSalesOrder = this.salesOrder[index];
  }

  loadDataForOpen($event) {
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = false;
    this.salesService.getOpenSalesOrder(req).subscribe(
      (data) => {
        this.salesOrder = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }


  loadDataForClose($event) {
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }   
    this.loading = false;
    this.salesService.getCloseSalesOrder(req).subscribe(
      (data) => {
        this.salesOrder = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }


}
