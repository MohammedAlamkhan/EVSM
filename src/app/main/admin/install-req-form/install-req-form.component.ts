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


  constructor(
    private fb: FormBuilder,
    private notify: Notify,
    private router: Router,
    private admin: Admin
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
  }
  selectedType = ' ';

  onChange(event) {
    this.selectedType = event.target.value;
  }


  createMainForm(): void {

    this.installationForm = this.fb.group({
      installationCaseNumber: ['']
      , soNumber: ['']
      , clientName: ['']
      , clientCode: ['']
      , typeOfCharger: ['']
      , modelNumber: ['']
      , serialNumber: ['']
      , dateOfDelivery: ['']
      , dateOfDispatch: ['']
      , installationAddress: ['']
      , pinCode: ['']
      , city: ['']
      , state: ['']
      , country: ['']
      , installationDate: ['']
      , pointOfInstallation: ['']
      , nameOfTheSite: ['']
      , siteID: ['']
      , contactPersonAtSite: ['']
      , contactNumber: ['']
      , alternateContactNumber: ['']
      , installationType: ['']
      , installationStatus: ['']
      , installedByVendorName: ['']
      , cableSize: ['']
      , cableLengthUsed: ['']
      , remarks: ['']
      , engineerName: ['']
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
      remarks: [''],
    });
  }

  setDescription() {

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
  submit() {
    debugger;
    console.log(this.installationForm);
  }

}
