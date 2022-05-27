import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { InstallationService } from '../installation.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-comman-installations',
  templateUrl: './comman-installation.component.html',
  styleUrls: ['./comman-installation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommanInstallationsComponent implements OnInit {
  public contentHeader: object

  public basicDateOptions: FlatpickrOptions = {
    altInput: true,
    dateFormat:'d.m.Y H:i'
  };
  installation: any;
  

  constructor(private installationsService: InstallationService,private modalService: NgbModal) { }
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Installations',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/installations'
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

    this.installation=   this.installationsService.selectedInstall;
  
  }

}
