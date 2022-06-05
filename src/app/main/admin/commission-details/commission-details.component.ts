import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  assignForm:FormGroup;
  assignSubmitted = false;

  constructor(private modalService: NgbModal, 
    private _route: ActivatedRoute,
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
    this.ApprovaRejectInit();
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

  ApprovaRejectInit()
{

  this.approveRejectForm = this.formBuilder.group({
    txtremarks: [null],
    dpdAction: ['',Validators.required]
    

  });
}
assignFormInit()
{

  this.assignForm = this.formBuilder.group({
   
    dpdAssignAction: ['',Validators.required]
    

  });
}
  LoadDatacommissionDetails() {
    this._Commissioning.getCommisioningDeatil(this.commissionId).subscribe(
      (res) => {
        debugger
        this.getDetails = res;
        if((this.getDetails.commissioningStatusId===6 ))
        {
          this.isShowApprove= true;
          this.isShowEdit=true;
        }
        else
        {
        
          this.isShowEdit=true;
          this.isShowApprove= false;
          
        }
      },
      error => {
        console.log('There was an error while retrieving Comments !!!' + error);
      });
  }

  onSubmit(){
  
   this.submitted=true;
   let Approvalremarks=this.approveRejectForm.value.txtremarks;
   let approvalStatus=this.approveRejectForm.value.dpdAction;
   let RequestType="A";
    if (this.approveRejectForm.valid) {

     // this._Commissioning.putApprovalModerate(this.commissionId,Approvalremarks,approvalStatus,RequestType).subscribe()
         this.reset();
  }
}
  
  get f() {
    return this.approveRejectForm.controls;
  }

 
  reset()
  {
    this.submitted=false;
    this.approveRejectForm.patchValue(
      { txtremarks:null,dpdAction:''}
    );

  }

  get Assignf() {
    return this.assignForm.controls;
  }
  fnAssign()
  {
   
    this._Commissioning.getAssign(this.commissionId).subscribe(
      (res) => {
        this.getAssignRespone = res;
        
      },
      error => {
        console.log('There was an error while retrieving Comments !!!' + error);
      });
  
  
  }
  onChangeAssign()
  {

  }
  AssignSubmit()
{

this.assignSubmitted=true;

let approvalStatus=this.assignForm.value.dpdAssignAction;

 if (this.assignForm.valid) {

  // this._Commissioning.putApprovalModerate(this.commissionId,Approvalremarks,approvalStatus,RequestType).subscribe()
     // this.reset();
}
  
}

ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
