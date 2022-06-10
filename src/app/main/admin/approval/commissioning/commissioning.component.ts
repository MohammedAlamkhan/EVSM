import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent';
import { CommissioningService } from './commissioning.service';
import { ServicesService as Admin } from '../../../admin/services.service';
@Component({
  selector: 'app-commissioning',
  templateUrl: './commissioning.component.html',
  styleUrls: ['./commissioning.component.scss']
})
export class CommissioningComponent implements OnInit {
  public contentHeader: object

  noOfRows: number = 20;
  comissioningList : [];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;
  first: any;
  engineerMap: any;
  circleMap: any;
  comissioning: any;
  approvalRemark: any;
  approvalAction: any;

  constructor(private modalService: NgbModal, private admin : Admin,
    private comissioningService: CommissioningService) { }
  modalOpenSM(modalSM, id) {
    this.passComData(id)
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  modalOpenSM2(modalSM2, id) {
    this.passComData(id)
    this.modalService.open(modalSM2, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  ngOnInit(): void {
    debugger;
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
    this.comissioningService.getEngineerMap(circleId).subscribe(
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
      "id":this.comissioning.id,
      "engineerId": (<HTMLInputElement>document.getElementById("eid")).value, 
    }
    this.comissioningService.reassignCommisioning(req).subscribe(
      (data) => {
      }
    )

  }



  
  approveOrReject(){
    const req ={
      "id":this.comissioning.tobeApprovedId,
      "action": this.approvalAction,
      "remark":this.approvalRemark
    
    }
    this.comissioningService.approveRejectCommissioning(req).subscribe(
      (data) => {
      }
    )

  }

  passComData(id){
    this.comissioningService.getCommisioningDeatil(id).subscribe(
      (data) => {
        this.comissioning = data;
      }
    )
    
  }

  loadApprovalData($event) {
    this.first = $event.first;
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.comissioningService.getCommissioningListToBeApproved(req).subscribe(
      (data) => {
        this.comissioningList = data.content;
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
    this.comissioningService.getCommissioningListToBeAssigned(req).subscribe(
      (data) => {
        this.comissioningList = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }

}
