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
    this.getSalesDetails();


  }



  getSalesDetails() {
    let salesOrder = this.salesOrderNo;
    this.sales.getSalesDetails(salesOrder)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((x) => {
          this.sOTotalQty = x.totalQuantity
            ; this.client = x.clients.clientName
            ; this.invoiceNumber = x.invoiceNo
            ; this.billedAssetQty = x.totalBilledAssest
            ; this.salesOrderCreationDate = x.orderCreateDate
            ; this.invoiceDate = x.invoiceDate
        })
      ).subscribe();
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    this.sales.salesInformation$.subscribe(
      (data) => {
        if (data !== null && data !== undefined && data.salesOrder !== undefined && data.salesOrder !== null) {
          this.singleRowSalesDetails = data.salesOrder.filter(x => x.salesOrderNo == this.salesOrderNo);
          this.salesOrderId = this.singleRowSalesDetails[0].salesOrderId;
          this.sales.getSalesInformation({ salesOrderId: this.salesOrderId, lazyEvent: JSON.stringify(event) }).subscribe(
            (data) => {
              console.log(data);
              this.assests = data.assests;
              this.totalRecords = data.totalRecords;
              this.loading = false;
            }
          )
        }

      }
    )
   

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
