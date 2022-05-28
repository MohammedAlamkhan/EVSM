import { Component, OnInit } from '@angular/core';
import {IrfService} from './../irf/irf.service'
@Component({
  selector: 'app-irf-details',
  templateUrl: './irf-details.component.html',
  styleUrls: ['./irf-details.component.scss']
})
export class IrfDetailsComponent implements OnInit {
public contentHeader : object
  irf: any;
  constructor(private irfService: IrfService) { }

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

    this.irf = this.irfService.selectedIrf;
    }

}
