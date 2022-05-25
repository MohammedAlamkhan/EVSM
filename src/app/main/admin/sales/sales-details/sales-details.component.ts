import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SalesService } from '../sales.service'
import { LazyLoadEvent } from '../../../../Models/lazyloadevent'
import { Assest } from '../../../../Models/Sales';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit, OnDestroy {
  public contentHeader: object;
  unsubscribe$ = new Subject<void>();
  salesOrderId: string;
  singleRowSalesDetails : any[];
  sOTotalQty: string;
  salesOrder: any;
  ; client: string
    ; invoiceNumber: string
    ; billedAssetQty: string
    ; salesOrderCreationDate: string
    ; invoiceDate: string
  noOfRows: number = 5;
  assests: Assest[];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;
  salesOrderNo: string
  title: string = 'Sales Details(';
  constructor(private sales: SalesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(x => {
        this.salesOrderNo = x.salesOrderNo
        this.title = this.title + this.salesOrderNo + ')'
      }
      );
    // content header
    this.contentHeader = {
      headerTitle: this.salesOrderNo,
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
    this.loading = true;
    this.loadData({});


  }





  loadData(event: LazyLoadEvent) {
    this.loading = true;
    this.salesOrder=this.sales.selectedSalesOrder
    this.totalRecords = 1;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
