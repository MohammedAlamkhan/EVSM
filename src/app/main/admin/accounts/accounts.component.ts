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
  noOfRows: number=5;
  totalRecords: number;


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
  //  this.loadData();
  }

  passAccountData(index){
    this.accountsService.selectedAccount = this.accounts[index];
  }

  loadData($event) {
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.accounts =   this.accountsService.getAccountsInformation(req).subscribe(
      (data) => {

        this.accounts = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )
  }

}
