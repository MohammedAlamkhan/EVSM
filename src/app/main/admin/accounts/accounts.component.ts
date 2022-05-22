import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountComponent implements OnInit {
  public contentHeader: object
  accounts: any;


  constructor() { }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Accounts',
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

    this.accounts={
      "content": [
          {
              "accountTypeName": "Self",
              "shippingStateId": 12,
              "modifiedDate": "2022-05-20T11:02:55.000+00:00",
              "billingStateName": "Haryana",
              "shippingStreet": null,
              "billingAddress": "Plot No. 38, Institutional Area, Sector 32",
              "createdDate": "2022-05-20T11:02:55.000+00:00",
              "description": null,
              "shippingAddress": "Plot No. 38, Institutional Area, Sector 32",
              "shippingPincode": "122001",
              "contactPersonPhone": null,
              "billingStateId": 12,
              "createByName": "System Admin",
              "sapCode": "Exicom",
              "createdByPhone": "9999999999",
              "isSynced": false,
              "id": 1,
              "billingCity": "Gurgaon",
              "billingPincode": "122001",
              "modifiedByName": "System Admin",
              "shippingCity": "Gurgaon",
              "ownerName": "System Admin",
              "shippingStateName": "Haryana",
              "accountTypeId": 2,
              "contactPersonName": null,
              "billingStreet": null,
              "billingCountry": "India",
              "name": "Exicom",
              "shippingCountry": "India",
              "modifiedbyPhone": "9999999999",
              "ownerPhone": "9999999999",
              "contactPersonEmail": null,
              "customer": null
          }
      ],
      "pageable": {
          "sort": {
              "empty": true,
              "sorted": false,
              "unsorted": true
          },
          "offset": 0,
          "pageNumber": 0,
          "pageSize": 20,
          "unpaged": false,
          "paged": true
      },
      "totalElements": 1,
      "totalPages": 1,
      "last": true,
      "size": 20,
      "number": 0,
      "sort": {
          "empty": true,
          "sorted": false,
          "unsorted": true
      },
      "numberOfElements": 1,
      "first": true,
      "empty": false
  }
   
  }

}
