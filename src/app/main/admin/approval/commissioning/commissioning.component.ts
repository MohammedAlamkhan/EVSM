import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assest } from 'app/Models/Sales';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent'
import { CommissioningService } from './commissioning.service';

@Component({
  selector: 'app-commissioning',
  templateUrl: './commissioning.component.html',
  styleUrls: ['./commissioning.component.scss']
})
export class CommissioningComponent implements OnInit {
  public contentHeader : object;
  approveRejectForm:FormGroup;
  submitted = false;

  assests: any[];
  noOfRows: number = 20;

  totalRecords: number;
  loading: boolean = false;
  Resdata:any[];

  cols: any[];

  constructor(private modalService: NgbModal,
    private _Commissioning:CommissioningService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  
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
      headerTitle: 'Manage Request',
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
    this.ApprovaReject();
     // this.loadData();
    }

    loadData($event) {
      const req={
        "page":$event.first/this.noOfRows,
        "size":$event.rows
      }
      this.loading = true;
            this._Commissioning.getCommisioning(req).subscribe(
              (data) => {
               // console.log(data);
              
                this.assests = data.content;
             //   console.log('zdzsdsad', this.assests);
                this.totalRecords = data.totalRecords;
                this.loading = false;
              }
            )
}

getRequestType(value) {

  let recordStatus = '';

  if (value === 'R') {
    recordStatus = 'Case Request';
  } else if (value === 'A') {
    recordStatus = 'Case Approval';
  } else if (value === 'RJ') {
    recordStatus = 'Case Rejected.';
  } 

  return recordStatus;
}


ApprovaReject()
{

  this.approveRejectForm = this.formBuilder.group({
    txtremarks: [null],
    dpdAction: ['',Validators.required]
    

  });
}
onSubmit(){
  this.submitted=true;
  let remark=this.approveRejectForm.value.txtremarks;
  let action=this.approveRejectForm.value.dpdAction;
  let RequestType="A";
  let id=2;
  action=parseInt(action)
  let jsonObject = new Object();
  jsonObject = {action, remark,id }
   if (this.approveRejectForm.valid) {

    //  this._Commissioning.putApprovalModerate(this.assests[0].commissionId,Approvalremarks,approvalStatus,RequestType).subscribe()
    this._Commissioning.putApprovalModerate(jsonObject,id).subscribe()
        this.reset();
 }
}

reset()
{
  this.submitted=false;
  this.approveRejectForm.patchValue(
    { txtremarks:null,dpdAction:''}
  );

}


}


