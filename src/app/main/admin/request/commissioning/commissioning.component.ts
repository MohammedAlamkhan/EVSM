import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assest } from 'app/Models/Sales';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent'
import { CommissioningService } from '../../approval/commissioning/commissioning.service';


@Component({
  selector: 'app-commissioning',
  templateUrl: './commissioning.component.html',
  styleUrls: ['./commissioning.component.scss']
})
export class CommissioningComponent implements OnInit {
public contentHeader :object
assests: any[];
noOfRows: number = 5;

totalRecords: number;
loading: boolean = false;
  constructor(private _Commissioning:CommissioningService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Commissioning',
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
    loadData($event) {
      debugger
      const req={
        "page":$event.first/this.noOfRows,
        "size":$event.rows
      }
      this.loading = true;
            this._Commissioning.getCommisioning(req).subscribe(
              (data) => {
               // console.log(data);
              
                this.assests = data.content;
             //   console.log('zdzsdsad', this.assests);
                this.totalRecords = data.totalRecords;
                this.loading = false;
              }
            )
}
}

