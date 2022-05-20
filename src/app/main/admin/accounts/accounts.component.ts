import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountComponent implements OnInit {
  public contentHeader: object

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
  }

}
