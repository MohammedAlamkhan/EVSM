import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { InstallationService } from '../installation/installation.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService as Admin } from '../../../admin/services.service';
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
  totalChargerSupplied: any;
  chargerMountingType: any;
  civilFoundationStatus: any;
  mcbdcb: any;
  cablingStatus: any;
  cableConsumed: any;
  earthingStatus: any;
  canopyStatus: any;
  canopyType: any;
  engineerMap: any;
  circleMap: any;
  approvalRemark: any;
  approvalAction: any;
  

  constructor( private admin : Admin, private installationsService: InstallationService,private modalService: NgbModal) { }
  modalOpenDefault(modalDefault) {
    this.modalService.open(modalDefault, {
      centered: true
    });
  }

  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  modalOpenSM2(modalSM2) {
    this.modalService.open(modalSM2, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
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

    this.installation.installationWorkList.forEach(element => {
      if(element.installationWorkListId === 9 ){
        this.totalChargerSupplied = element;
      }
      if(element.installationWorkListId === 4){
        this.chargerMountingType = element;
      }
      if(element.installationWorkListId === 5){
        this.civilFoundationStatus = element;
      }
      if(element.installationWorkListId === 7){
        this.mcbdcb = element;
      }
      if(element.installationWorkListId === 1){
        this.cablingStatus = element;
      }
      if(element.installationWorkListId === 8){  
        this.cableConsumed = element;
      }
      if(element.installationWorkListId === 6){
        this.earthingStatus = element;
      }
      if(element.installationWorkListId === 2){
        this.canopyStatus = element;
      }
      if(element.installationWorkListId === 3){
        this.canopyType = element;
      }
      
    });

    this.getCircleMap();
  }

  reassign(){
    const req ={
      "id":this.installation.id,
      "engineerId": (<HTMLInputElement>document.getElementById("eid")).value, 
    }
    this.installationsService.reassignInstallation(req).subscribe(
      (data) => {
      }
    )

  }



  
  approveOrReject(){
    const req ={
      "id":this.installation.tobeApprovedId,
      "action": this.approvalAction,
      "remark":this.approvalRemark
    
    }
    this.installationsService.approveRejectInstallation(req).subscribe(
      (data) => {
      }
    )

  }


  getEngineerList($event){
    const circleId = $event.target.value;
    this.installationsService.getEngineerMap(circleId).subscribe(
       (data) => {
         this.engineerMap = data;
       }
     )
   }

   getCircleMap(){
    this.admin.getCircleMap().subscribe(
       (data) => {
         this.circleMap = data;
       }
     )
   }


  downloadInstallationReport(fileName){
    const req = {
      id:  this.installation.id,
      file : fileName
    }

    this.installationsService.downloadInstallationReport(req).subscribe(
      (data) => {
      }
    )

  }

}
