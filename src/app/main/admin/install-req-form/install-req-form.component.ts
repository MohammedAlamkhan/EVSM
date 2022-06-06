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
import { environment } from 'environments/environment';
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
  countryMap = [{
      "countryId": 1,
      "countryName": "India"  
  }];
  stateMap = [
    {
     "stateId": 1,
     "stateName": "ANDAMAN AND NICOBAR ISLANDS"
    },
    {
     "stateId": 2,
     "stateName": "ANDHRA PRADESH"
    },
    {
     "stateId": 3,
     "stateName": "ARUNACHAL PRADESH"
    },
    {
     "stateId": 4,
     "stateName": "ASSAM"
    },
    {
     "stateId": 5,
     "stateName": "BIHAR"
    },
    {
     "stateId": 6,
     "stateName": "CHANDIGARH"
    },
    {
     "stateId": 7,
     "stateName": "CHATTISGARH"
    },
    {
     "stateId": 8,
     "stateName": "DADRA AND NAGAR HAVELI AND DAMAN AND DIU"
    },
    {
     "stateId": 9,
     "stateName": "DELHI"
    },
    {
     "stateId": 10,
     "stateName": "GOA"
    },
    {
     "stateId": 11,
     "stateName": "GUJARAT"
    },
    {
     "stateId": 12,
     "stateName": "HARYANA"
    },
    {
     "stateId": 13,
     "stateName": "HIMACHAL PRADESH"
    },
    {
     "stateId": 14,
     "stateName": "JAMMU AND KASHMIR"
    },
    {
     "stateId": 15,
     "stateName": "JHARKHAND"
    },
    {
     "stateId": 16,
     "stateName": "KARNATAKA"
    },
    {
     "stateId": 17,
     "stateName": "KERALA"
    },
    {
     "stateId": 18,
     "stateName": "LADAKH"
    },
    {
     "stateId": 19,
     "stateName": "LAKSHADWEEP"
    },
    {
     "stateId": 20,
     "stateName": "MADHYA PRADESH"
    },
    {
     "stateId": 21,
     "stateName": "MAHARASHTRA"
    },
    {
     "stateId": 22,
     "stateName": "MANIPUR"
    },
    {
     "stateId": 23,
     "stateName": "MEGHALAYA"
    },
    {
     "stateId": 24,
     "stateName": "MIZORAM"
    },
    {
     "stateId": 25,
     "stateName": "NAGALAND"
    },
    {
     "stateId": 26,
     "stateName": "ODISHA"
    },
    {
     "stateId": 27,
     "stateName": "PUDUCHERRY"
    },
    {
     "stateId": 28,
     "stateName": "PUNJAB"
    },
    {
     "stateId": 29,
     "stateName": "RAJASTHAN"
    },
    {
     "stateId": 30,
     "stateName": "SIKKIM"
    },
    {
     "stateId": 31,
     "stateName": "TAMIL NADU"
    },
    {
     "stateId": 32,
     "stateName": "TELANGANA"
    },
    {
     "stateId": 33,
     "stateName": "TRIPURA"
    },
    {
     "stateId": 34,
     "stateName": "UTTAR PRADESH"
    },
    {
     "stateId": 35,
     "stateName": "UTTARAKHAND"
    },
    {
     "stateId": 36,
     "stateName": "WEST BENGAL"
    }
   ]
  baseUrl="http://evsepulseapi.exicom.in:8282"
  chargerPictureFileDownloadUrl: string='';
  installationReportFileDownloadUrl: string='';
  cablingPictureFileDownloadUrl: string='';
  mcbPictureFileDownloadUrl: string='';
  engineerSignatureFileDownloadUrl: string='';
  customerSignatureFileDownloadUrl: string='';
  showchargerPicture: boolean=false;
  showinstallationReport: boolean=false;
  showmcbPicture: boolean=false;
  showengineerSignature: boolean=false;
  showcustomerSignature: boolean=false;
  showcablingPicture: boolean=false;


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
    this.pushInstallationWorkRequestList();
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
    // this.go_next();

  }
  selectedType = ' ';

//   go_next(){
//     setTimeout(() => {
//       var objCountry =  (<HTMLSelectElement>document.getElementById("country"));
//       var objstateid =  (<HTMLSelectElement>document.getElementById("stateid"))
//       var objCharger =  (<HTMLSelectElement>document.getElementById("basicSelect"));
     
//       // this.setSelectedValue(objCountry, "India");
//       this.setSelectedValue(objstateid, "2");
//       this.setSelectedValue(objCharger, "AC001");
//       objCountry.value="1";
//       }
//       , 2000);
// }

  onChange(event) {
    this.selectedType = event.target.value;
  }

    
//   setSelectedValue(selectObj, valueToSet) {
//     for (var i = 0; i < selectObj.options.length; i++) {
//         if (selectObj.options[i].text== valueToSet) {
//             selectObj.options[i].selected = true;
//             return;
//         }
//     }
// }

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
      , installationWorkRequestList: this.fb.array([
        // this.createActivityControls()
      ])
    })
  }

  get accessInstallationForm() {
    return this.installationForm.controls
  }

  get accessInstallationWorkRequestListArray(): FormArray {
    return this.installationForm.controls["installationWorkRequestList"] as FormArray;

  }

  pushInstallationWorkRequestList() {
    for (let i = 0; i < 9; i++) {
      this.accessInstallationWorkRequestListArray.push(this.createActivityControls());
    }
  }

  createActivityControls() {
    return this.fb.group({
      description: [''],
      installationWorkListId: [''],
      responsibility: [''],
      AC001Charger: [''],
      DC001Charger: [''],
      type2EvCharger: [''],
      remark: [''],
    });
  }


  setValuesFromInstallPage(): void {
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    console.log(this.holdInstallValue);
    this.accessInstallationForm['id'].patchValue(this.holdInstallValue.irfManualId);
    this.accessInstallationForm['soNumber'].patchValue(this.holdInstallValue.manualId);
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
    this.accessInstallationForm['responsibility'].patchValue(this.holdInstallValue.responsibility);
    this.accessInstallationForm['remark'].patchValue(this.holdInstallValue.remark);
    this.accessInstallationForm['exicomRepresentativeName'].patchValue(this.holdInstallValue.exicomRepresentativeName);
    this.accessInstallationForm['employeeCode'].patchValue(this.holdInstallValue.employeeCode);
    this.accessInstallationForm['customerRepresentativeName'].patchValue(this.holdInstallValue.customerRepresentativeName);
  }


  setDescription() {

    this.accessInstallationWorkRequestListArray.controls[0]?.patchValue(this.totalChargerSupplied);
    this.accessInstallationWorkRequestListArray.controls[0]?.patchValue(this.totalChargerSupplied);
    this.accessInstallationWorkRequestListArray.controls[1]?.patchValue(this.chargerMountingType);
    this.accessInstallationWorkRequestListArray.controls[2]?.patchValue(this.civilFoundationStatus);
    this.accessInstallationWorkRequestListArray.controls[3]?.patchValue(this.mcbdcb);
    this.accessInstallationWorkRequestListArray.controls[4]?.patchValue(this.cablingStatus);
    this.accessInstallationWorkRequestListArray.controls[5]?.patchValue(this.cableConsumed);
    this.accessInstallationWorkRequestListArray.controls[6]?.patchValue(this.earthingStatus);
    this.accessInstallationWorkRequestListArray.controls[7]?.patchValue(this.canopyStatus);
    this.accessInstallationWorkRequestListArray.controls[8]?.patchValue(this.canopyType);

   
    this.accessInstallationWorkRequestListArray.controls[0].get('description')?.patchValue('Total Charger Supplied');
    this.accessInstallationWorkRequestListArray.controls[1].get('description')?.patchValue('Charger Mounting Type');
    this.accessInstallationWorkRequestListArray.controls[2].get('description')?.patchValue('Civil Foundation Status');
    this.accessInstallationWorkRequestListArray.controls[3].get('description')?.patchValue('MCB with DB Box');
    this.accessInstallationWorkRequestListArray.controls[4].get('description')?.patchValue('Cabling Status from DB to Charger');
    this.accessInstallationWorkRequestListArray.controls[5].get('description')?.patchValue('Total Cable Consumed');
    this.accessInstallationWorkRequestListArray.controls[6].get('description')?.patchValue('Earthling Status');
    this.accessInstallationWorkRequestListArray.controls[7].get('description')?.patchValue('Canopy Status');
    this.accessInstallationWorkRequestListArray.controls[8].get('description')?.patchValue('Canopy Type');
  }

  // getFile(event: any) {
  //   this.uploadImages(event,"chargerPicture");
  //   if (event.target.files && event.target.files[0]) {
  //     const max_size = 800000; //700 kb
  //     const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
  //     if (event.target.files[0].size > max_size) {
        
  //       this.notify.show("Maximum size can be 500 Kb");
  //       return false;
  //     }
  //     if (!allowed_types.includes(event.target.files[0].type)) {
  //       this.notify.show("Only Images are allowed ( JPEG | JPG | PNG )");
  //       return false;
  //     }
  //   }
  //   //500000 bytes = 500 kb
  //   //700000
  //   debugger;
  //   console.log(event);
  // }
  saveAsDraft()
  {
    this.submit("draft");
  }


  fileList = [];
  uploadImages($event: any, type){
    if(type==="chargerPicture"){
      this.showchargerPicture = true;
    }
    if(type==="installationReport"){
      this.showinstallationReport = true;
    }
    if(type==="cablingPicture"){
      this.showcablingPicture = true;
    }
    if(type==="mcbPicture"){
      this.showmcbPicture = true;
    }
    if(type==="engineerSignature"){
      this.showengineerSignature = true;
    }
    if(type==="customerSignature"){
      this.showcustomerSignature = true;
    }

    if ($event.target.files.length > 0) {
      for (let i = 0; i < $event.target.files.length; i++) {
        this.fileList.push($event.target.files[i]);
      }
    }
    let formData = new FormData();
    formData.append('file', this.fileList[0],this.fileList[0].name);
    const qp={
      "installationId":this.holdInstallValue.id,
      "file":type
    }
  
    this.installationService.uploadInstallationPhotos(formData, qp).subscribe(
      (data) => {
        this.chargerPictureFileDownloadUrl= this.baseUrl+ data.chargerPictureFileDownloadUri;
        this.installationReportFileDownloadUrl=  this.baseUrl+ data.installationReportFileDownloadUri;
        
        this.cablingPictureFileDownloadUrl=  this.baseUrl+ data.cablingPictureFileDownloadUri;
        
        this.mcbPictureFileDownloadUrl=  this.baseUrl+ data.mcbPictureFileDownloadUri;
        
        this.engineerSignatureFileDownloadUrl=  this.baseUrl+ data.engineerSignatureFileDownloadUri;
        this.customerSignatureFileDownloadUrl=  this.baseUrl+ data.customerSignatureFileDownloadUri;
        
        

      }
    )
  }

  getSiteData($event){
    console.log("key down");
    console.log($event.target.value);
    console.log("key up");
    this.installationService.getSiteData($event.target.value).subscribe(
      (data) => {
        console.log(data);
        let siteData = data[0]
        this.accessInstallationForm['address'].patchValue(siteData.address);
        this.accessInstallationForm['emailId'].patchValue(siteData.emailId);
        this.accessInstallationForm['alternateContactNumber'].patchValue(siteData.alternateContactnumber);
        // this.accessInstallationForm['customerName'].patchValue(siteData.customerName);
        this.accessInstallationForm['city'].patchValue(siteData.city);
        this.accessInstallationForm['pincode'].patchValue(siteData.pincode);
        this.accessInstallationForm['siteId'].patchValue(siteData.siteId);
        this.accessInstallationForm['stateId'].patchValue(siteData.stateId);
        this.accessInstallationForm['siteName'].patchValue(siteData.siteName);
        this.accessInstallationForm['country'].patchValue(siteData.country);
        this.accessInstallationForm['contactNumber'].patchValue(siteData.contactNumber);
      }
    )
  }

  submit(draft?) {
    debugger;
    if(draft==="draft"){
      this.installationForm.value.installationStatusId=3
    }else{
      this.installationForm.value.installationStatusId=6
    }
    
    console.log(this.installationForm);
    this.installationService.installationId = this.holdInstallValue.id;
    const req = this.installationForm.value;
    delete req["soNumber"];
    delete req["clientName"];
    delete req["clientCode"];
    delete req["installationReport"];
    delete req["cablingPicture"];
    delete req["chargerPicture"];
    delete req["mCBPicture"];
    delete req["signatureEmployee"];
    delete req["signatureCustomer"];
    
    //need to add email and country in ai key

    for(let i=0;i<9;i++){
      delete req.installationWorkRequestList[i].description;
      req.installationWorkRequestList[i]["installationsId"]=this.holdInstallValue.id;
    }

    req.installationWorkRequestList[0].installationWorkListId = 9
    req.installationWorkRequestList[1].installationWorkListId = 4
    req.installationWorkRequestList[2].installationWorkListId = 5
    req.installationWorkRequestList[3].installationWorkListId = 7
    req.installationWorkRequestList[4].installationWorkListId = 1
    req.installationWorkRequestList[5].installationWorkListId = 8
    req.installationWorkRequestList[6].installationWorkListId = 6
    req.installationWorkRequestList[7].installationWorkListId = 2
    req.installationWorkRequestList[8].installationWorkListId = 3

   
    this.installationService.updateInstallation(req).subscribe(
      (data) => {
      

      }
    )
    

  }

}
