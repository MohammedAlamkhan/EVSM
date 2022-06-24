import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/core/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CommissioningService } from '../approval/commissioning/commissioning.service';

@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.scss']
})
export class CommissionDetailsComponent implements OnInit {
  public contentHeader: object
  isShowEdit:boolean = true;
  isShowApprove:boolean = false;
  commissionId: string;
  unsubscribe$ = new Subject<void>();
  getDetails: any;
  getAssignRespone: any;
  approveRejectForm:FormGroup;
  submitted = false;
  circleMap: any;
  assignForm:FormGroup;
  assignSubmitted = false;
  engineerMap: any;
  baseUrl = environment.imageApiIUrl;
  approvalRemark: any;
  approvalAction: any;
  creds = this.authService.getCredentials;
  history: any;
  id: any;
  constructor(private modalService: NgbModal, public authService: AuthenticationService,
    private _route: ActivatedRoute,private _Router: Router,
     private _Commissioning: CommissioningService,
     private formBuilder: FormBuilder ) { }
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
   
    this.getCircleMap();
   // this.assignFormInit();
    // get commision id start
    this._route.paramMap.subscribe(params => {
      this.commissionId = params.get('commissionId');
    });
    // get commision id end
    
    this.LoadDatacommissionDetails();
  
    // content header
    this.contentHeader = {
      headerTitle: ' Commissioning Details',
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

//   ApprovaRejectInit()
// {

//   this.approveRejectForm = this.formBuilder.group({
//     txtremarks: [null],
//     dpdAction: ['',Validators.required]
    

//   });
// }
assignFormInit()
{

  this.assignForm = this.formBuilder.group({
   
    dpdAssignAction: ['',Validators.required]
    

  });
}
  LoadDatacommissionDetails() {
    this._Commissioning.getCommisioningDeatil(this.commissionId).subscribe(
      (res) => {
        
        this.getDetails = res;
        this.id = res.id;
        this.getHistory(res.id);
        // if((this.getDetails.commissioningStatusId===6 ))
        // {
        //   this.isShowApprove= true;
        //   this.isShowEdit=true;
        // }
        // else
        // {
        
        //   this.isShowEdit=true;
        //   this.isShowApprove= false;
          
        // }
      },
      error => {
        console.log('There was an error while retrieving Comments !!!' + error);
      });
     
  }

//   onSubmit(){
  
//    this.submitted=true;
//    let Approvalremarks=this.approveRejectForm.value.txtremarks;
//    let approvalStatus=this.approveRejectForm.value.dpdAction;
//    let RequestType="A";
//     if (this.approveRejectForm.valid) {

//      // this._Commissioning.putApprovalModerate(this.commissionId,Approvalremarks,approvalStatus,RequestType).subscribe()
//         // this.reset();
//   }
// }
  
  // get f() {
  //   return this.approveRejectForm.controls;
  // }

 
  // reset()
  // {
  //   this.submitted=false;
  //   this.approveRejectForm.patchValue(
  //     { txtremarks:null,dpdAction:''}
  //   );

  // }

  // get Assignf() {
  //   return this.assignForm.controls;
  // }
  // fnAssign()
  // {
   
  //   this._Commissioning.getAssign(this.commissionId).subscribe(
  //     (res) => {
  //       this.getAssignRespone = res;
        
  //     },
  //     error => {
  //       console.log('There was an error while retrieving Comments !!!' + error);
  //     });
  
  
  // }
  onChangeAssign()
  {

  }
//   AssignSubmit()
// {

// this.assignSubmitted=true;

// let approvalStatus=this.assignForm.value.dpdAssignAction;

//  if (this.assignForm.valid) {

//   // this._Commissioning.putApprovalModerate(this.commissionId,Approvalremarks,approvalStatus,RequestType).subscribe()
//      // this.reset();
// }
  
// }


downloadInstallationReport(fileName){
  
  let uri="";
  if(fileName==="phaseToNeurtal"){
  //  uri="/api/installation/file/download?id=3&file=forramji-Copy.jpg";
  //  uri="/api/commissioning/file/download?id=1&file=hardware_modification_snap-1640864878998_1654678900819.jpg";
  uri=this.getDetails.file.phaseToNeutralFileDownloadUri;
  console.log("phaseToNeutralFileDownloadUri: "+uri);
  }
  if(fileName==="neutralToEarth"){
   uri=this.getDetails.file.neutralToEarthFileDownloadUri;
  }
  if(fileName==="distributionBox"){
    uri=this.getDetails.file.distributionBoxFileDownloadUri;
  }
  if(fileName==="vehicleCharging"){
    uri=this.getDetails.file.vehicleChargingFileDownloadUri;
  }
  if(fileName==="engineerSignature"){
    uri=this.getDetails.file.engineerSignatureFileDownloadUri;
  }
  if(fileName==="customerSignature"){
   uri=this.getDetails.file.customerSignatureFileDownloadUri;
  }
  if(fileName==="commissioningReport"){
    uri=this.getDetails.file.commissioningReportFileDownloadUri;
  }
  if(fileName==="softwareUpdImage"){
   uri=this.getDetails.file.softwareUpdImageFileDownloadUri;
  }


 location.href = this.baseUrl+uri;


}

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}

getCircleMap(){
  this._Commissioning.getCircleMap().subscribe(
     (data) => {
       this.circleMap = data;
     }
   )
 }
 approveOrReject(){

  const req ={
    "id":this.getDetails.tobeApprovedId,
    "action": this.approvalAction,
    "remark":this.approvalRemark
  
  }
  this._Commissioning.approveRejectCommision(req).subscribe(
    (data) => {
      //this._route.navigate()['/request/commissioning']);
      this._Router.navigate(['request/commissioning'])
    }
  )
  
}

 
getHistory(id){
  this._Commissioning.getHistory(id).subscribe(
     (data) => {
       this.history = data;
     }
   )
 }


 downloadPdf(){
  location.href = this.baseUrl +"commissioning/file/report/download?id="+this.id;
 }


reassign(){
  const req ={
    "id":this.commissionId,
    "engineerId": (<HTMLInputElement>document.getElementById("eid")).value, 
  }
  this._Commissioning.reassignInstallation(req).subscribe(
    (data) => {
      
    }
  )
  this._Router.navigate(['request/commissioning'])
}

getEngineerList($event){
  const circleId = $event.target.value;
  this._Commissioning.getEngineerMap(circleId).subscribe(
     (data) => {
       this.engineerMap = data;
     }
   )
 }
}
