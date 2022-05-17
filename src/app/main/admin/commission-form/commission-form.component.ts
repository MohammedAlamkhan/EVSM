import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { FileUploader } from 'ng2-file-upload';
									
const URL = 'https://your-url.com';
@Component({
  selector: 'app-commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['./commission-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommissionFormComponent implements OnInit {
public contentHeader :object
  constructor() { }
  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  };

  public uploader: FileUploader = new FileUploader({
    url: URL,
  isHTML5: true
    });
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: ' Commissioning Form',
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
