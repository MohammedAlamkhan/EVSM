import { Component, OnInit } from '@angular/core';
import {InstallationService} from './installation.service'
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
  constructor(private installationService: InstallationService) { }

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
      this.installationService.selectedInstall = this.installationService[index];
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

