import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FileUploader } from 'ng2-file-upload';

const URL = 'https://your-url.com';
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SurveyFormComponent implements OnInit {
  public contentHeader: object
  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  constructor() { }
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Survey Form',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/sales'
          },
   
        ]
      }
    };
  }

}
