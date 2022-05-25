import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { AccountsService } from '../accounts/accounts.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-comman-accounts',
  templateUrl: './comman-accounts.component.html',
  styleUrls: ['./comman-accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommanAccountsComponent implements OnInit {
  public contentHeader: object

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    dateFormat:'d.m.Y H:i'
  };
  account: any;
  

  constructor(private accountsService: AccountsService,private modalService: NgbModal) { }
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }
  ngOnInit(): void {
    // content header
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

    this.account=   this.accountsService.selectedAccount;
  
  }

}
