import { Component, OnInit } from '@angular/core';
import { AssetsService } from './assetsitems.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assetsitems',
  templateUrl: './assetsitems.component.html',
  styleUrls: ['./assetsitems.component.scss']
})
export class AssetsitemsComponent implements OnInit {
public contentHeader :object;
assets:any;
loading: boolean = false;

  constructor(private assetsService: AssetsService ,
    private route: ActivatedRoute) { }

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
  this.loadData();
  }

  loadData() {
    this.loading = true;
    this.assets =   this.assetsService.getAssetsInformation({}).subscribe(
      (data) => {
        this.assets = data.content;
        this.loading = false;
      }
    )
  }

}
