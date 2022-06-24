import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent';
import { InstallationService } from '../../../admin/request/installation/installation.service';
import { ServicesService as Admin } from '../../../admin/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  public contentHeader: object

  noOfRows: number = 20;
  installationList : [];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;
  first: any;
  engineerMap: any;
  circleMap: any;
  installation: any;
  approvalRemark: any;
  approvalAction: any;

  constructor(private modalService: NgbModal, private admin : Admin,  private router: Router,
    private installationService: InstallationService) { }
  modalOpenSM(modalSM, id) {
    this.getInstallData(id)
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  modalOpenSM2(modalSM2, id) {
    this.getInstallData(id)
    this.modalService.open(modalSM2, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  ngOnInit(): void {
    
    // content header
    this.contentHeader = {
      headerTitle: 'Inbox',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/sales'
          },

        ]
      }
    };
    this.getCircleMap();
    this.loading = true;
  }

  getEngineerList($event){
    const circleId = $event.target.value;
    this.installationService.getEngineerMap(circleId).subscribe(
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

   reassign(){
    const req ={
      "id":this.installation.id,
      "engineerId": (<HTMLInputElement>document.getElementById("eid")).value, 
    }
    this.installationService.reassignInstallation(req).subscribe(
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
    this.installationService.approveRejectInstallation(req).subscribe(
      (data) => {
      }
    )

  }

  passInstallData(id){
    this.installationService.installationId = id;
    this.installationService.getInstallationInformationById().subscribe(
      (data) => {
        this.installation = data;
        this.installationService.selectedInstall= this.installation;
        this.go_next('\comp-req-installations');
      }
    )
    
  }

  getInstallData(id){
    this.installationService.installationId = id;
    this.installationService.getInstallationInformationById().subscribe(
      (data) => {
        this.installation = data;
        this.installationService.selectedInstall= this.installation;
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


  loadApprovalData($event) {
    this.first = $event.first;
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.installationService.getInstallationListToBeApproved(req).subscribe(
      (data) => {
        this.installationList = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }

  loadAssignData($event) {
    this.first = $event.first;
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.installationService.getInstallationListToBeAssigned(req).subscribe(
      (data) => {
        this.installationList = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }

}
