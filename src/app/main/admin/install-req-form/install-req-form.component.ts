import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { NotificationService as Notify } from '../../../shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from 'app/shared/AppConstants';
import { Router } from '@angular/router';
import { ServicesService as Admin } from '../../admin/services.service';
import { InstallationService } from '../../admin/request/installation/installation.service';
const URL = 'https://your-url.com';

@Component({
  selector: 'app-install-req-form',
  templateUrl: './install-req-form.component.html',
  styleUrls: ['./install-req-form.component.scss']
})
export class InstallReqFormComponent implements OnInit {
  public contentHeader: object
  public basicDateOptions: FlatpickrOptions = {
    altInput: true
  };
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  })

  installationForm: FormGroup;
  credentials: any;
  isSaveDraftClicked: boolean;
  holdInstallValue: any;
  totalChargerSupplied: any;
  civilFoundationStatus: any;
  cablingStatus: any;
  chargerMountingType: any;
  cableConsumed: any;
  canopyStatus: any;
  mcbdcb: any;
  canopyType: any;
  earthingStatus: any;


  constructor(
    private fb: FormBuilder,
    private notify: Notify,
    private router: Router,
    private admin: Admin,
    private installationService: InstallationService
  ) { }
  replytype: any
  selectedValue: any
  isTableShow: boolean = false

  toggleTable() {
    this.isTableShow = true
  }
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'EVSE Installation',
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
    this.createMainForm();
    this.pushTrForm();
    this.setDescription();
    this.holdInstallValue = this.installationService.selectedInstall;
    this.holdInstallValue.installationWorkList.forEach(element => {
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
    this.setValuesFromInstallPage();
  }
  selectedType = ' ';

  onChange(event) {
    this.selectedType = event.target.value;
  }


  createMainForm(): void {

    this.installationForm = this.fb.group({
      id: ['']
      , soNumber: ['']
      , clientName: ['']
      , clientCode: ['']
      , address: ['']
      , pincode: ['']
      , city: ['']
      , stateId: ['']
      , country: ['']
      , installationDate: ['']
      , pointOfInstallation: ['']
      , siteId: ['']
      , siteName: ['']
      , contactPersonAtSite: ['']
      , contactNumber: ['']
      , alternateContactNumber: ['']
      , installationTypeId: ['']
      , installationStatusId: ['']
      , installedByVendor: ['']
      , cableSize: ['']
      , cableLength: ['']
      , remark: ['']
      , exicomRepresentativeName: ['']
      , employeeCode: ['']
      , customerRepresentativeName: ['']
      , installationReport: ['']
      , cablingPicture: ['']
      , chargerPicture: ['']
      , mCBPicture: ['']
      , signatureEmployee: ['']
      , signatureCustomer: ['']

      //   tentativePlanDate: ['', [Validators.required]],
      , emailId: ['', [Validators.required, Validators.email]]
      , trForm: this.fb.array([
        // this.createActivityControls()
      ])
    })
  }

  get accessInstallationForm() {
    return this.installationForm.controls
  }

  get accessTrFormArray(): FormArray {
    return this.installationForm.controls["trForm"] as FormArray;

  }

  pushTrForm() {
    for (let i = 0; i < 9; i++) {
      this.accessTrFormArray.push(this.createActivityControls());
    }
  }

  createActivityControls() {
    return this.fb.group({
      description: [''],
      responsibility: [''],
      installationTypeFromDropDown: [''],
      remark: [''],
    });
  }


  setValuesFromInstallPage(): void {
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    console.log(this.holdInstallValue);
    this.accessInstallationForm['id'].patchValue(this.holdInstallValue.id);
    this.accessInstallationForm['soNumber'].patchValue(this.holdInstallValue.irfId);
    this.accessInstallationForm['clientName'].patchValue(this.holdInstallValue.accountName);
    this.accessInstallationForm['clientCode'].patchValue(this.holdInstallValue.accountSapCode);
    this.accessInstallationForm['address'].patchValue(this.holdInstallValue.address);
    this.accessInstallationForm['pincode'].patchValue(this.holdInstallValue.pincode);
    this.accessInstallationForm['city'].patchValue(this.holdInstallValue.city);
    this.accessInstallationForm['stateId'].patchValue(this.holdInstallValue.stateId);
    this.accessInstallationForm['country'].patchValue(this.holdInstallValue.country);
    this.accessInstallationForm['pointOfInstallation'].patchValue(this.holdInstallValue.pointOfInstallation);
    this.accessInstallationForm['siteId'].patchValue(this.holdInstallValue.siteId);
    this.accessInstallationForm['siteName'].patchValue(this.holdInstallValue.siteName);
    this.accessInstallationForm['contactPersonAtSite'].patchValue(this.holdInstallValue.contactPersonAtSite);
    this.accessInstallationForm['contactNumber'].patchValue(this.holdInstallValue.contactNumber);
    this.accessInstallationForm['alternateContactNumber'].patchValue(this.holdInstallValue.alternateContactnumber);
    this.accessInstallationForm['emailId'].patchValue(this.holdInstallValue.accountContactPersonEmail);
    this.accessInstallationForm['installationTypeId'].patchValue(this.holdInstallValue.installationTypeId);
    this.accessInstallationForm['installationStatusId'].patchValue(this.holdInstallValue.installationStatusId);
    this.accessInstallationForm['installedByVendor'].patchValue(this.holdInstallValue.installedByVendor);
    this.accessInstallationForm['cableLength'].patchValue(this.holdInstallValue.cableLength);
    this.accessInstallationForm['cableSize'].patchValue(this.holdInstallValue.cableSize);
    this.accessInstallationForm['responsibility'].patchValue(this.holdInstallValue.dummy);
    this.accessInstallationForm['remark'].patchValue(this.holdInstallValue.remark);
    this.accessInstallationForm['exicomRepresentativeName'].patchValue(this.holdInstallValue.exicomRepresentativeName);
    this.accessInstallationForm['employeeCode'].patchValue(this.holdInstallValue.employeeCode);
    this.accessInstallationForm['customerRepresentativeName'].patchValue(this.holdInstallValue.customerRepresentativeName);
  }


  setDescription() {

    this.accessTrFormArray.controls[0]?.patchValue(this.totalChargerSupplied);
    this.accessTrFormArray.controls[0]?.patchValue(this.totalChargerSupplied);
    this.accessTrFormArray.controls[1]?.patchValue(this.chargerMountingType);
    this.accessTrFormArray.controls[2]?.patchValue(this.civilFoundationStatus);
    this.accessTrFormArray.controls[3]?.patchValue(this.mcbdcb);
    this.accessTrFormArray.controls[4]?.patchValue(this.cablingStatus);
    this.accessTrFormArray.controls[5]?.patchValue(this.cableConsumed);
    this.accessTrFormArray.controls[6]?.patchValue(this.earthingStatus);
    this.accessTrFormArray.controls[7]?.patchValue(this.canopyStatus);
    this.accessTrFormArray.controls[8]?.patchValue(this.canopyType);

   
    this.accessTrFormArray.controls[0].get('description')?.patchValue('Total Charger Supplied');
    this.accessTrFormArray.controls[1].get('description')?.patchValue('Charger Mounting Type');
    this.accessTrFormArray.controls[2].get('description')?.patchValue('Civil Foundation Status');
    this.accessTrFormArray.controls[3].get('description')?.patchValue('MCB with DB Box');
    this.accessTrFormArray.controls[4].get('description')?.patchValue('Cabling Status from DB to Charger');
    this.accessTrFormArray.controls[5].get('description')?.patchValue('Total Cable Consumed');
    this.accessTrFormArray.controls[6].get('description')?.patchValue('Earthling Status');
    this.accessTrFormArray.controls[7].get('description')?.patchValue('Canopy Status');
    this.accessTrFormArray.controls[8].get('description')?.patchValue('Canopy Type');
  }

  getFile(event: any) {
    this.uploadImages(event,"chargerPicture");
    if (event.target.files && event.target.files[0]) {
      const max_size = 800000; //700 kb
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
      if (event.target.files[0].size > max_size) {
        
        this.notify.show("Maximum size can be 500 Kb");
        return false;
      }
      if (!allowed_types.includes(event.target.files[0].type)) {
        this.notify.show("Only Images are allowed ( JPEG | JPG | PNG )");
        return false;
      }
    }
    //500000 bytes = 500 kb
    //700000
    debugger;
    console.log(event);
  }
  saveAsDraft()
  {
    debugger;
    this.isSaveDraftClicked = true;
  }

  uploadImages(event: any, type){
    const qp={
      "installationId":this.holdInstallValue.id,
      "file":type
    }

    const body = event.target.files;
    this.installationService.uploadInstallationPhotos(body, qp).subscribe(
      (data) => {
        
      }
    )
  }


  submit() {
    debugger;
    console.log(this.installationForm);
    this.installationService.installationId = this.holdInstallValue.id;
    const req = this.installationForm.value;
    delete req["soNumber"];

    this.installationService.updateInstallation(req).subscribe(
      (data) => {
      }
    )
    

  }

}
