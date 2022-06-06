import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SalesService } from '../../admin/sales/sales.service';
import { NotificationService as Notify } from '../../../shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';
import { Router } from '@angular/router';
import { ServicesService as Admin } from '../../admin/services.service';

@Component({
  selector: 'app-edit-irf',
  templateUrl: './edit-irf.component.html',
  styleUrls: ['./edit-irf.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditIrfComponent implements OnInit, OnDestroy {
  circleMap: any;
  circleId: any;
  requestRaisedByIdMap: any;
  constructor(private fb: FormBuilder,
    private sales: SalesService,
    private notify: Notify,
    private router: Router,
    private admin : Admin) {

  }
  public contentHeader: object;
  irfCreationForm: FormGroup;
  unsubscribe$ = new Subject<void>();
  holdSalesDetails: any;
  arrayWorkActivityControls: { workId: number, workDescription: string }[] = [];
  credentials:any;
  SelectedSalesOrderData = this.sales.selectedSalesOrder;

  isHeading: boolean = false
  isVisit: boolean = false
  toggleVisit() {
    this.isVisit = !this.isVisit
  }

  ngOnInit(): void {
    this.getCircleMap();
    this.getRequestRaisedByIdMap();
    // content header
    this.contentHeader = {
      headerTitle: 'Installation Requistion Form',
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
    const savedCredentials = localStorage.getItem('credentialsKey');
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
    this.createMainForm();
    this.disableFields();


    this.accessIrfForm['activityTypeSurvey'].valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(x => this.manageSurveyControls())
    ).subscribe();
    this.accessIrfForm['activityTypeInstallation'].valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(x => this.manageInstAndCommisioningControls())
    ).subscribe();
    this.accessIrfForm['activityTypeCommisioning'].valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(x => this.manageInstAndCommisioningControls())
    ).subscribe();
    this.holdSalesDetails = this.sales.selectedSalesOrder;
    this.setValuesFromSalesOrder();

   

    
  }

  getCircleMap(){
   this.admin.getCircleMap().subscribe(
      (data) => {
        this.circleMap = data;
     
      }
    )
  }

  getRequestRaisedByIdMap(){
    this.admin.getRequestRaisedById().subscribe(
       (data) => {
         this.requestRaisedByIdMap = data;
       }
     )
   }

  setValuesFromSalesOrder(): void {
    console.log(this.holdSalesDetails);
    this.accessIrfForm['dateOfAssignment'].patchValue(new Date ());
    this.accessIrfForm['tentativePlanDate'].patchValue(new Date ());
    this.accessIrfForm['salesOrderNo'].patchValue(this.holdSalesDetails.manualId);
    this.accessIrfForm['ownerName'].patchValue(this.credentials.ownerName);
    this.accessIrfForm['AccountName'].patchValue(this.holdSalesDetails.AccountName);
    this.accessIrfForm['address'].patchValue(this.holdSalesDetails.address);
    this.accessIrfForm['pONoAndDate'].patchValue(this.holdSalesDetails.poNo + ' ' +  this.formatDate(this.holdSalesDetails.poDate));
    this.accessIrfForm['contactPersonName'].patchValue(this.holdSalesDetails.customerName);
    this.accessIrfForm['contactPersonPhone'].patchValue(this.holdSalesDetails.customerPhone);
    this.accessIrfForm['contactPersonEmail'].patchValue(this.holdSalesDetails.customerEmail);
    // this.accessIrfForm['contactNumber'].patchValue("");
    // this.accessIrfForm['emailId'].patchValue("");


  }
  disableFields(): void {
    this.accessIrfForm['salesOrderNo'].disable();
    // this.accessIrfForm['ownerName'].disable();
    this.accessIrfForm['AccountName'].disable();
    this.accessIrfForm['address'].disable();
    this.accessIrfForm['pONoAndDate'].disable();
    this.accessIrfForm['contactPersonName'].enable();
    this.accessIrfForm['contactPersonPhone'].enable();
    this.accessIrfForm['contactPersonEmail'].enable();
    // this.accessIrfForm['contactNumber'].disable();
    // this.accessIrfForm['emailId'].disable();
  }
  
  createDataToSend():object {
    let yourDateOfAssignment = new Date (this.accessIrfForm['dateOfAssignment'].value.toString());
    let yourTentativePlanDate = new Date(this.accessIrfForm['tentativePlanDate'].value.toString());
    let yourIrfCreationDate = new Date();
    const yourWorkActivities =  this.accessTrFormArray.value.map(x=>{
      const container = {};
      container["irfWorkListId"]=+x.workId,
      container["isExicomScope"]=x.exicomScope == true ? true:false,
      container["isCustomerScope"]=x.customerScope == true ? true:false,
      container["makeModelDescription"]=x.specification == undefined || null ? '':x.specification,
      container["maxNoOfVisit"]=x.maxNoOfVisit == undefined || null ? '':x.maxNoOfVisit,
      container["extraVisitCharge"]=x.extraCharge == undefined || null ? '':x.extraCharge,
      container["salesOrderId"]=x.id,
      container["requestRaisedById"]=x.requestRaisedById,
      container["contactPersonName"]=x.contactPersonName,
      container["contactPersonPhone"]=x.contactPersonPhone,
      container["contactPersonEmail"]=x.contactPersonEmail
      return container;
    })  
    console.log(yourWorkActivities);
    let requestBodyToSend = {
      // assestId: 0,
      // userId: this.credentials.userId,
       // irfGenratedBy: this.credentials.userId,
      // irfCreationDate: yourIrfCreationDate.toISOString(),
      // saveStatus: "D",
      // status: "A",
      // otherVisitActivity: this.accessIrfForm['activityOtherVisit'].value == true ? 'I':'N',
      // otherVisitDescription:this.accessIrfForm['otherVisit'].value  ,
      dateOfAssignment:  this.formatDate(yourDateOfAssignment),
      tentativePlanDate: this.formatDate(yourTentativePlanDate),
      surveyRequired: this.accessIrfForm['activityTypeSurvey'].value == true ?  true:false,
      installationRequired:  this.accessIrfForm['activityTypeInstallation'].value == true ? true:false,
      commissioningRequired: this.accessIrfForm['activityTypeCommisioning'].value == true ? true:false,
      salesOrderId: (<HTMLInputElement>document.getElementById("SONumber")).value, 
      requestRaisedById:  (<HTMLInputElement>document.getElementById("oid")).value, 
      circleId: (<HTMLInputElement>document.getElementById("cid")).value, 
      typeOfChargerId: (<HTMLInputElement>document.getElementById("typeOfCharger")).value, 
      ratingOfCharger: (<HTMLInputElement>document.getElementById("ratingOfCharger")).value, 
      quantity: (<HTMLInputElement>document.getElementById("quantity")).value, 
      icPoStatus: (<HTMLInputElement>document.getElementById("iCpoStatus")).value, 
      icPo: (<HTMLInputElement>document.getElementById("iCpo")).value, 
      icPrice: (<HTMLInputElement>document.getElementById("iCprice")).value, 
      contactPersonName: (<HTMLInputElement>document.getElementById("contactPersonNameIP")).value, 
      contactPersonPhone: (<HTMLInputElement>document.getElementById("contactPersonPhoneIP")).value, 
      contactPersonEmail: (<HTMLInputElement>document.getElementById("contactPersonEmailIP")).value, 
      irfWorkList: yourWorkActivities
    }

    return requestBodyToSend
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
  createMainForm(): void {

    this.irfCreationForm = this.fb.group({
      salesOrderNo: [''],
      ownerName: [''],
      dateOfAssignment: ['', [Validators.required]],
      tentativePlanDate: ['', [Validators.required]],
      AccountName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pONoAndDate: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactPersonPhone: ['', [Validators.required]],
      contactPersonEmail: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      activityTypeSurvey: [false],
      activityTypeInstallation: [false],
      activityTypeCommisioning: [false],
      activityOtherVisit: [false],
      otherVisit: [''],
      circleId: [''],
      trForm: this.fb.array([
        // this.createActivityControls()
      ])
    })
  }
  createActivityControls() {
    return this.fb.group({
      exicomScope: [false],
      customerScope: [false],
      specification: [''],
      maxNoOfVisit: [],
      extraCharge: [],
      label: [''],
      workId: ['']

    });
  }
  manageSurveyControls() {
    let activityTypeSurveyValue = this.accessIrfForm['activityTypeSurvey'].value;
    let activityTypeInstallationValue = this.accessIrfForm['activityTypeInstallation'].value;
    let activityTypeCommisioningValue = this.accessIrfForm['activityTypeCommisioning'].value;
    if (activityTypeSurveyValue) {
      this.isHeading = true;
      if (this.accessTrFormArray.length > 0) {
        while (this.accessTrFormArray.length !== 0)
          this.accessTrFormArray.removeAt(0);
      }
      this.pushTrForm(20);
      this.setLabelsDynamically();
      this.disableSurveyControls();
    }
    else {
      if (!activityTypeInstallationValue && !activityTypeCommisioningValue) {
        this.isHeading = false;
        this.removeSurveyControls();
        this.removeInstallationControls();
        this.removeCommisioningControls();

      }
      else if (activityTypeInstallationValue && !activityTypeCommisioningValue) {
        this.removeSurveyControls();
        this.removeCommisioningControls();
      }
      else if (!activityTypeInstallationValue && activityTypeCommisioningValue) {
        this.removeSurveyControls();
        this.removeInstallationControls();
      }
      else if (activityTypeInstallationValue && activityTypeCommisioningValue) {
        this.removeSurveyControls();
      }

    }

  }


  manageInstAndCommisioningControls() {

    let activityTypeSurveyValue = this.accessIrfForm['activityTypeSurvey'].value;
    let activityTypeInstallationValue = this.accessIrfForm['activityTypeInstallation'].value;
    let activityTypeCommisioningValue = this.accessIrfForm['activityTypeCommisioning'].value;

    if (activityTypeSurveyValue) {
      return;
    }
    if (activityTypeInstallationValue && activityTypeCommisioningValue) {
      while (this.accessTrFormArray.length !== 0)
        this.accessTrFormArray.removeAt(0);
      this.pushTrForm(9);
      this.isHeading = true;

    }
    else if (!activityTypeInstallationValue && !activityTypeCommisioningValue) {
      while (this.accessTrFormArray.length !== 0)
        this.accessTrFormArray.removeAt(0);
      this.isHeading = false;
    }
    else if (activityTypeInstallationValue && !activityTypeCommisioningValue) {
      while (this.accessTrFormArray.length !== 0)
        this.accessTrFormArray.removeAt(0);
      this.pushTrForm(8);
      this.isHeading = true;
    }
    else if (!activityTypeInstallationValue && activityTypeCommisioningValue) {
      while (this.accessTrFormArray.length !== 0)
        this.accessTrFormArray.removeAt(0);
      this.pushTrForm(1);
      this.isHeading = true;
    }
    this.setLabelsDynamically();
    this.disableInstallationAndCommisioningControls();
    //if both rae checked

  }

  submit() {

    
    this.admin.postBulkIrf(this.createDataToSend()).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe();
   
    
   
    console.log(this.irfCreationForm);
  }

  get accessIrfForm() {
    return this.irfCreationForm.controls
  }

  get accessTrFormArray(): FormArray {
    return this.irfCreationForm.controls["trForm"] as FormArray;

  }


  pushTrForm(noOfControls: number) {
    for (let i = 0; i < noOfControls; i++) {
      this.accessTrFormArray.push(this.createActivityControls());
    }
  }

  getWorkActivityControlsFromAPI() {

  }

  setLabelsDynamically() {
    this.setWorkIdAgainstWorkActivityControls();
    for (let i = 0; i < this.accessTrFormArray.controls.length; i++) {

      if (this.accessTrFormArray.controls.length === 20) // survey is checked
      {
        if (i == 0)
          this.patchLabelsValue(i, 'Site Survey');
        if (i == 1)
          this.patchLabelsValue(i, 'Installation');
        if (i == 2)
          this.patchLabelsValue(i, 'Commissioning');
        if (i == 3)
          this.patchLabelsValue(i, 'Civil Plinth/Stand')
        if (i == 4)
          this.patchLabelsValue(i, 'Supply of Input Cable');
        if (i == 5)
          this.patchLabelsValue(i, 'Supply of DB Box');
        if (i == 6)
          this.patchLabelsValue(i, 'Supply of IP/MCB/MCCB');
        if (i == 7)
          this.patchLabelsValue(i, 'Supply of Energy Meter');
        if (i == 8)
          this.patchLabelsValue(i, 'Supply of Meter Box');
        if (i == 9)
          this.patchLabelsValue(i, 'Supply of Earth Cable');
        if (i == 10)
          this.patchLabelsValue(i, 'Earthing Pit Material');
        if (i == 11)
          this.patchLabelsValue(i, 'Laying/Fixing-Input Cable');
        if (i == 12)
          this.patchLabelsValue(i, 'Installation-DB Box');
        if (i == 13)
          this.patchLabelsValue(i, 'Installation-MCB/MCCB');
        if (i == 14)
          this.patchLabelsValue(i, 'Fork Lift/Hydra Crane for Charger Mounting');
        if (i == 15)
          this.patchLabelsValue(i, 'Installation-Earthing Pit');
        if (i == 16)
          this.patchLabelsValue(i, 'Installation-Energy Meter');
        if (i == 17)
          this.patchLabelsValue(i, 'Installation-Meter Box');
        if (i == 18)
          this.patchLabelsValue(i, 'Laying/Fixing-Earth Cable');
        if (i == 19)
          this.patchLabelsValue(i, 'Electric Vehicle for Testing');


      }
      if (this.accessTrFormArray.controls.length === 8) {
        if (i == 0)
          this.patchLabelsValue(i, 'Laying/Fixing-Input Cable');
        if (i == 1)
          this.patchLabelsValue(i, 'Installation-DB Box');
        if (i == 2)
          this.patchLabelsValue(i, 'Installation-MCB/MCCB');
        if (i == 3)
          this.patchLabelsValue(i, 'Fork Lift/Hydra Crane for Charger Mounting');
        if (i == 4)
          this.patchLabelsValue(i, 'Installation-Earthing Pit');
        if (i == 5)
          this.patchLabelsValue(i, 'Installation-Energy Meter');
        if (i == 6)
          this.patchLabelsValue(i, 'Installation-Meter Box');
        if (i == 7)
          this.patchLabelsValue(i, 'Laying/Fixing-Earth Cable');
      }
      if (this.accessTrFormArray.controls.length === 9) {
        if (i == 0)
          this.patchLabelsValue(i, 'Laying/Fixing-Input Cable');
        if (i == 1)
          this.patchLabelsValue(i, 'Installation-DB Box');
        if (i == 2)
          this.patchLabelsValue(i, 'Installation-MCB/MCCB');
        if (i == 3)
          this.patchLabelsValue(i, 'Fork Lift/Hydra Crane for Charger Mounting');
        if (i == 4)
          this.patchLabelsValue(i, 'Installation-Earthing Pit');
        if (i == 5)
          this.patchLabelsValue(i, 'Installation-Energy Meter');
        if (i == 6)
          this.patchLabelsValue(i, 'Installation-Meter Box');
        if (i == 7)
          this.patchLabelsValue(i, 'Laying/Fixing-Earth Cable');
        if (i == 8)
          this.patchLabelsValue(i, 'Electric Vehicle for Testing');
      }
      if (this.accessTrFormArray.controls.length === 1) // commisioning  is checked
      {
        this.patchLabelsValue(i, 'Electric Vehicle for Testing');
      }
    }
  }

  removeInstallationControls() {
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Laying/Fixing-Input Cable'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation-DB Box'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation-MCB/MCCB'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Fork Lift/Hydra Crane for Charger Mounting'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation-Earthing Pit'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation-Energy Meter'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation-Meter Box'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Laying/Fixing-Earth Cable'));

  }
  removeCommisioningControls() {
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Electric Vehicle for Testing'));
  }
  patchLabelsValue(position: number, val: string) {
    this.accessTrFormArray.controls[position].get('label')?.patchValue(val);
    let k = this.arrayWorkActivityControls.filter(x => x.workDescription === val)
    if (k !== null && k !== undefined) {
      this.accessTrFormArray.controls[position].get('workId')?.patchValue(k[0].workId.toString());
    }

  }

  removeSurveyControls() {

    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Site Survey'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Installation'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Commissioning'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Civil Plinth/Stand'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of Input Cable'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of DB Box'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of IP/MCB/MCCB'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of Energy Meter'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of Meter Box'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Supply of Earth Cable'));
    this.accessTrFormArray.removeAt(this.accessTrFormArray.value.findIndex(x => x.label === 'Earthing Pit Material'));

  }

  disableInstallationAndCommisioningControls() {
    for (let i = 0; i < this.accessTrFormArray.controls.length; i++) {
      // this.accessTrFormArray.controls[i].get('specification')?.disable();
      // this.accessTrFormArray.controls[i].get('maxNoOfVisit')?.disable();
      // this.accessTrFormArray.controls[i].get('extraCharge')?.disable();
    }
  }

  disableSurveyControls() {
    this.disableWithGivenValues('Supply of Input Cable', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Supply of DB Box', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Supply of IP/MCB/MCCB', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Supply of Energy Meter', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Supply of Meter Box', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Supply of Earth Cable', 'maxNoOfVisit', 'extraCharge');
    this.disableWithGivenValues('Earthing Pit Material', 'maxNoOfVisit', 'extraCharge', 'specification');

    this.disableWithGivenValues('Laying/Fixing-Input Cable', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Installation-DB Box', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Installation-MCB/MCCB', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Fork Lift/Hydra Crane for Charger Mounting', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Installation-Earthing Pit', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Installation-Energy Meter', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Installation-Meter Box', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Laying/Fixing-Earth Cable', 'maxNoOfVisit', 'extraCharge', 'specification');
    this.disableWithGivenValues('Electric Vehicle for Testing', 'maxNoOfVisit', 'extraCharge', 'specification');
  }

  disableWithGivenValues(labelName: string, field1: string, field2: string, field3?: string) {
    let index = this.accessTrFormArray.value.findIndex(x => x.label === labelName);
    this.accessTrFormArray.controls[index].get(field1)?.disable();
    this.accessTrFormArray.controls[index].get(field2)?.disable();
    if (field3 !== undefined && field3 !== null)
      this.accessTrFormArray.controls[index].get(field3)?.disable();
  }


  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  setWorkIdAgainstWorkActivityControls() {
    this.arrayWorkActivityControls.push({ "workId": 1, "workDescription": "Site Survey" });
    this.arrayWorkActivityControls.push({ "workId": 2, "workDescription": "Installation" });
    this.arrayWorkActivityControls.push({ "workId": 3, "workDescription": "Commissioning" });
    this.arrayWorkActivityControls.push({ "workId": 4, "workDescription": "Civil Plinth/Stand" });
    this.arrayWorkActivityControls.push({ "workId": 5, "workDescription": "Supply of Input Cable" });
    this.arrayWorkActivityControls.push({ "workId": 6, "workDescription": "Supply of DB Box" });
    this.arrayWorkActivityControls.push({ "workId": 7, "workDescription": "Supply of IP/MCB/MCCB" });
    this.arrayWorkActivityControls.push({ "workId": 8, "workDescription": "Supply of Energy Meter" });
    this.arrayWorkActivityControls.push({ "workId": 9, "workDescription": "Supply of Meter Box" });
    this.arrayWorkActivityControls.push({ "workId": 10, "workDescription": "Supply of Earth Cable" });
    this.arrayWorkActivityControls.push({ "workId": 11, "workDescription": "Earthing Pit Material" });
    this.arrayWorkActivityControls.push({ "workId": 12, "workDescription": "Laying/Fixing-Input Cable" });
    this.arrayWorkActivityControls.push({ "workId": 13, "workDescription": "Installation-DB Box" });
    this.arrayWorkActivityControls.push({ "workId": 14, "workDescription": "Installation-MCB/MCCB" });
    this.arrayWorkActivityControls.push({ "workId": 15, "workDescription": "Fork Lift/Hydra Crane for Charger Mounting" });
    this.arrayWorkActivityControls.push({ "workId": 16, "workDescription": "Installation-Earthing Pit" });
    this.arrayWorkActivityControls.push({ "workId": 17, "workDescription": "Installation-Energy Meter" });
    this.arrayWorkActivityControls.push({ "workId": 18, "workDescription": "Installation-Meter Box" });
    this.arrayWorkActivityControls.push({ "workId": 19, "workDescription": "Laying/Fixing-Earth Cable" });
    this.arrayWorkActivityControls.push({ "workId": 20, "workDescription": "Electric Vehicle for Testing" });
  }


 

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
