import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assetsitems',
  templateUrl: './assetsitems.component.html',
  styleUrls: ['./assetsitems.component.scss']
})
export class AssetsitemsComponent implements OnInit {
public contentHeader :object;
assets:any;

  constructor() { }

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
    this.assets =  {
      "content": [
          {
              "salesOrderId": null,
              "isInstallationGenerated": false,
              "isIrfGenerated": false,
              "statusName": "Purchased",
              "createdByPhone": "9999999999",
              "irfStatusId": 4,
              "id": 1,
              "modifiedByName": "System Admin",
              "serialNo": "DO2110391180009",
              "sapDeliveryDocumentNumber": null,
              "productId": 1,
              "dateOfDeliveryExpiryDate": null,
              "installationStatusId": 4,
              "ownerName": "System Admin",
              "amcPurchaseOrderNumber": null,
              "irfStatusName": "",
              "modifiedDate": "2022-05-22T11:42:24.000+00:00",
              "warrantyFromDateOfInstallationInMonth": null,
              "amcStartDate": null,
              "statusId": 5,
              "accountId": 2,
              "commissioningStatusName": "completed",
              "plant": null,
              "modifiedbyPhone": "9999999999",
              "installationStatusName": "notRequired",
              "productName": "HE518294",
              "purchaseDate": null,
              "amcExpiryDate": null,
              "amcPeriod": null,
              "siteName": null,
              "accountName": "TATA Power Company Ltd",
              "createByName": "System Admin",
              "purchaseOrderDate": null,
              "surveyStatusName": "inProcess",
              "commissioningStatusId": 4,
              "installDate": null,
              "isCommissioningGenerated": false,
              "manualId": "DO2110391180009#HE518294",
              "salesOrderNo": null,
              "createdDate": "2022-05-22T11:42:24.000+00:00",
              "installExpiryDate": null,
              "surveyStatusId": 4,
              "sapCode": "TATA",
              "isSurveyGenerated": true,
              "salesDocNumber": null,
              "amcPurchaseOrderDate": null,
              "warrantyExpiryDate": null,
              "purchaseOrderNumber": null,
              "sapMaterialDocumentNumber": null,
              "siteId": null,
              "warrantyFromDateOfDeliveryInMonth": null,
              "ownerPhone": "9999999999",
              "remarks": null,
              "productDescription": "Product Description dummy data",
              "warrantyStatus": false
          }
      ],
      "pageable": {
          "sort": {
              "empty": true,
              "sorted": false,
              "unsorted": true
          },
          "offset": 0,
          "pageSize": 20,
          "pageNumber": 0,
          "paged": true,
          "unpaged": false
      },
      "totalPages": 1,
      "totalElements": 1,
      "last": true,
      "size": 20,
      "number": 0,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "first": true,
      "numberOfElements": 1,
      "empty": false
  };
  
  }

}
