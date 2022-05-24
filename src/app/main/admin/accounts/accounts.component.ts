import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountComponent implements OnInit {
  public contentHeader: object
  accounts: any;
  loading: boolean = false;


  constructor(private accountsService: AccountsService) { }
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
   this.loadData();
  }

  loadData() {
    this.loading = true;
    this.accounts =   this.accountsService.getAccountsInformation().subscribe(
      (data) => {
        this.accounts = data.content;
        this.loading = false;
      }
    )
  }

}
