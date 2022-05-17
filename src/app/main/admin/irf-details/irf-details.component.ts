import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-irf-details',
  templateUrl: './irf-details.component.html',
  styleUrls: ['./irf-details.component.scss']
})
export class IrfDetailsComponent implements OnInit {
public contentHeader : object
  constructor() { }

  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: ' Installation Requistion Form',
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
