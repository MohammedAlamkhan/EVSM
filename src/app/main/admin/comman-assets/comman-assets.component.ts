import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-comman-assets',
  templateUrl: './comman-assets.component.html',
  styleUrls: ['./comman-assets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommanAssetsComponent implements OnInit {
  public contentHeader: object

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    dateFormat:'d.m.Y H:i'
  };

  constructor(private modalService: NgbModal) { }
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }
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
  }

}
