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
  irfworklistMap: {};
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
    this.irfworklistMap={
      "1":"Site Survey",
      "2":"Installation",
      "3":"Commissioning",
      "4":"Civil Plinth/Stand",
      "5":"Supply of Input Cable",
      "6":"Supply of DB Box",
      "7":"Supply of IP/MCB/MCCB",
      "8":"Supply of Energy Meter",
      "9":"Supply of Meter Box",
      "10":"Supply of Earth Cable",
      "11":"Earthing Pit Material",
      "12":"Laying/Fixing-Input Cable",
      "13":"Installation-DB Box",
      "14":"Installation-MCB/MCCB",
      "15":"Fork Lift/Hydra Crane for Charger Mounting",
      "16":"Installation-Earthing Pit",
      "17":"Installation-Energy Meter",
      "18":"Installation-Meter Box",
      "19":"Laying/Fixing-Earth Cable",
      "20":"Electric Vehicle for Testing"
    }
       
  
  }

}
