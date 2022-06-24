import { Component, OnInit } from '@angular/core';
import {InstallationService} from './installation.service'
import {IrfService} from './../../irf/irf.service'
import { Router } from '@angular/router';
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
  noOfRows: number=20;
  irf: any;
  first: any;
  constructor(private installationService: InstallationService,private irfService: IrfService,  private router: Router) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'EVSE Installation',
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
    // this.loadData();
    }

    passInstallData(index){
      
      this.installationService.installationId = this.installations[index-this.first].id;
      this.installationService.getInstallationInformationById().subscribe(
        (data) => {
          this.installationService.selectedInstall = data;
          this.loading = true;
          this.go_next('\comp-req-installations');
        }
      )
      
    }

    go_next(route){
      setTimeout(() => {
          this.loading = false;
          this.router.navigate([route])
        }
        , 1000);
  }

  
    passIrfData(index){
      this.irfService.irfId = this.installations[index-this.first].irfId;
      this.irf =   this.irfService.getIrfInformationById().subscribe(
        (data) => {
          this.irfService.selectedIrf = data;
          this.loading = true;
          this.go_next('\irf-details');
        }
      )
    }
   

    loadData($event) {
      this.first = $event.first;
      const req={
        "page":$event.first/this.noOfRows,
        "size":$event.rows
      }
      this.loading = true;
      this.installations =   this.installationService.getInstallationInformation(req).subscribe(
        (data) => {
          this.installations = data.content;
          this.totalRecords = data.totalElements;
          this.loading = false;
        }
      )
    }

}

