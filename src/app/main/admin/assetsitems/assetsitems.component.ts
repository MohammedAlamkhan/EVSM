import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assetsitems',
  templateUrl: './assetsitems.component.html',
  styleUrls: ['./assetsitems.component.scss']
})
export class AssetsitemsComponent implements OnInit {
public contentHeader :object
  constructor() { }

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
  isTataShow: boolean = true; // hidden by default
  isMgShow: boolean = false;

  toggleTata() {
    this.isTataShow = true
    this.isMgShow = false
  }
  toggleMg() {
    this.isMgShow = true
    this.isTataShow = false;
  }
}
