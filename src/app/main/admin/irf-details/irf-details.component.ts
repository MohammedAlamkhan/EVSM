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
      "1":"Civil Plinth/Stand",
      "2":"Commissioning",
      "3":"Earthing Pit Material",
      "4":"Electric Vehicle for Testing",
      "5":"Fork Lift/Hydra Crane for Charger Mounting",
      "6":"Installation",
      "7":"Installation-DB Box",
      "8":"Installation-Earthing Pit",
      "9":"Installation-Energy Meter",
      "10":"Installation-MCB/MCCB",
      "11":"Installation-Meter Box",
      "12":"Laying/Fixing-Earth Cable",
      "13":"Laying/Fixing-Input Cable",
      "14":"Site Survey",
      "15":"Supply of DB Box",
      "16":"Supply of Earth Cable",
      "17":"Supply of Energy Meter",
      "18":"Supply of Input Cable",
      "19":"Supply of IP/MCB/MCCB",
      "20":"Supply of Meter Box"
    }
       
  
  }

}
