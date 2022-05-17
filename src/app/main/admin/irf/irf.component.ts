import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-irf',
  templateUrl: './irf.component.html',
  styleUrls: ['./irf.component.scss']
})
export class IrfComponent implements OnInit {
  public contentHeader: object

  constructor() { }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'IRF',
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
