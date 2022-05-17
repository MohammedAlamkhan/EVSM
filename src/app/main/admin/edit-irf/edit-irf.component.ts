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
  public contentHeader: object;
  irfCreationForm: FormGroup;
  unsubscribe$ = new Subject<void>();
  holdSalesDetails: any;
  arrayWorkActivityControls: { workId: number, workDescription: string }[] = [];
  credentials:any;

  constructor(private fb: FormBuilder,
    private sales: SalesService,
    private notify: Notify,
    private router: Router,
    private admin : Admin) {

  }

  isHeading: boolean = false
  isVisit: boolean = false
  toggleVisit() {
    this.isVisit = !this.isVisit
  }

  ngOnInit(): void {
    debugger;
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
    this.sales.salesInformation$.subscribe(
      (data) => {
        if (data !== undefined && data !== null) {
          this.holdSalesDetails = data;
          this.setValuesFromSalesOrder();
        }
        (err) => {
          this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Error);
          this.router.navigate(['/pages/miscellaneous/not-authorized']);
        }
      }
    )
  }

  setValuesFromSalesOrder(): void {
    console.log(this.holdSalesDetails);
    this.accessIrfForm['soNumber'].patchValue(this.holdSalesDetails.salesOrderNo);
    this.accessIrfForm['requestRaisedby'].patchValue(this.credentials.fullName);
    this.accessIrfForm['customerName'].patchValue(this.holdSalesDetails.customerName);
    this.accessIrfForm['address'].patchValue(this.holdSalesDetails.address);
    this.accessIrfForm['pONoAndDate'].patchValue(this.holdSalesDetails.poNo + ' ' + this.holdSalesDetails.poDate);
    this.accessIrfForm['contactPersonName'].patchValue(this.holdSalesDetails.customerName);
    this.accessIrfForm['contactNumber'].patchValue(this.holdSalesDetails.customerPersonMobileNo);
    this.accessIrfForm['emailId'].patchValue(this.holdSalesDetails.customerPersonEmailId);

  }
  disableFields(): void {
    this.accessIrfForm['soNumber'].disable();
    this.accessIrfForm['requestRaisedby'].disable();
    this.accessIrfForm['customerName'].disable();
    this.accessIrfForm['address'].disable();
    this.accessIrfForm['pONoAndDate'].disable();
    this.accessIrfForm['contactPersonName'].disable();
    this.accessIrfForm['contactNumber'].disable();
    this.accessIrfForm['emailId'].disable();
  }
  
  createDataToSend():object {
    let yourDateOfAssignment = new Date (this.accessIrfForm['dateOfAssignment'].value.toString());
    let yourTentativePlanDate = new Date(this.accessIrfForm['tentativePlanDate'].value.toString());
    let yourIrfCreationDate = new Date();
    const yourWorkActivities =  this.accessTrFormArray.value.map(x=>{
      const container = {};
      container["workId"]=+x.workId,
      container["exicomScopeFlag"]=x.exicomScope == true ? 'Y':'N',
      container["customerScopeFlag"]=x.customerScope == true ? 'Y':'N',
      container["makeModelDesciption"]=x.specification == undefined || null ? '':x.specification,
      container["maxNoOfVisit"]=x.maxNoOfVisit == undefined || null ? '':x.maxNoOfVisit,
      container["extraVisitCharge"]=x.extraCharge == undefined || null ? '':x.extraCharge
      return container;
    })  
    console.log(yourWorkActivities);
    let requestBodyToSend = {
      assestId: 0,
      userId: this.credentials.userId,
      salesOrderId: this.holdSalesDetails.salesOrderId,
      requestRaisedBy: this.credentials.userId,
      dateOfAssignment:  yourDateOfAssignment.toISOString(),  // dateOfAssignment "2022-04-29T06:25:16.015Z",
      tentativePlanDate: yourTentativePlanDate.toISOString(),
      installationActivity:  this.accessIrfForm['activityTypeInstallation'].value == true ? 'I':'N',
      commissionActivity: this.accessIrfForm['activityTypeCommisioning'].value == true ? 'I':'N',
      surveyActivity: this.accessIrfForm['activityTypeSurvey'].value == true ? 'I':'N',
      otherVisitActivity: this.accessIrfForm['activityOtherVisit'].value == true ? 'I':'N',
      otherVisitDescription:this.accessIrfForm['otherVisit'].value  ,
      irfGenratedBy: this.credentials.userId,
      irfCreationDate: yourIrfCreationDate.toISOString(),
      saveStatus: "D",
      status: "A",
      irfWorks: yourWorkActivities
    }
      
      return requestBodyToSend
  }
  createMainForm(): void {

    this.irfCreationForm = this.fb.group({
      soNumber: [''],
      requestRaisedby: [''],
      dateOfAssignment: ['', [Validators.required]],
      tentativePlanDate: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pONoAndDate: ['', [Validators.required]],
      contactPersonName: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      activityTypeSurvey: [false],
      activityTypeInstallation: [false],
      activityTypeCommisioning: [false],
      activityOtherVisit: [false],
      otherVisit: [''],
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
    debugger;
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
    debugger;
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
      this.accessTrFormArray.controls[i].get('specification')?.disable();
      this.accessTrFormArray.controls[i].get('maxNoOfVisit')?.disable();
      this.accessTrFormArray.controls[i].get('extraCharge')?.disable();
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
