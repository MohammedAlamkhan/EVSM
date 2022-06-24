import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ManageUserService } from './../manage-user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-comman-user',
  templateUrl: './comman-user.component.html',
  styleUrls: ['./comman-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommanUserComponent implements OnInit {
  public contentHeader: object

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    dateFormat:'d.m.Y H:i'
  };
  account: any;
  user: any;

  resMap={
    "1":"No",
    "0":"Yes"
  }
  
  revresMap={
    "0":"No",
    "1":"Yes"
  }

  constructor(private userService: ManageUserService,private modalService: NgbModal) { }
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Users',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/manage-user'
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

    this.user=   this.userService.selectedUser;
  
  }

}
