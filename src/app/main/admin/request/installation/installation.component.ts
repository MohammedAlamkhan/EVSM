import { Component, OnInit } from '@angular/core';
import {InstallationService} from './installation.service'
import {IrfService} from './../../irf/irf.service'
@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
public contentHeader : object
  loading: boolean=false;
  installations: any;
  totalRecords: any;
  noOfRows: number=10;
  irf: any;
  constructor(private installationService: InstallationService,private irfService: IrfService) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Installation',
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

    passInstallData(index){
      this.installationService.installationId = this.installations[index].id;
      this.installationService.getInstallationInformationById().subscribe(
        (data) => {
          this.installationService.selectedInstall = data;
        }
      )
    }
  
    passIrfData(index){
      this.irfService.irfId = this.installations[index].irfId;
      this.irf =   this.irfService.getIrfInformationById().subscribe(
        (data) => {
          this.irfService.selectedIrf = data;
        }
      )
    }
   

    loadData() {
      this.loading = true;
      this.installations =   this.installationService.getInstallationInformation().subscribe(
        (data) => {
          this.installations = data.content;
          this.totalRecords = data.content.length;
          this.loading = false;
        }
      )
    }

}

