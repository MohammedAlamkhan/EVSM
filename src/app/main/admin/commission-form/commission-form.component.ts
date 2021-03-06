import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommissioningService } from '../approval/commissioning/commissioning.service';
import { ActivatedRoute } from '@angular/router';
import { from, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import country from 'assets/country.json';
import stateMap from 'assets/stateMap.json';
const URL = 'https://your-url.com';
@Component({
  selector: 'app-commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['./commission-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommissionFormComponent implements OnInit {
  stateData: any=stateMap.stateMap;
  countryData: any=country.countryMap;
  selectedStateId:any;
  selectedCountryId:any;
  commissionId: string;
  msgCheckProductSerial:any
  isMsgProsr:boolean = false;
  isShowSiteID:boolean = false;
  SiteIDMSG:string ='';
  public contentHeader: object
  commissionForm: FormGroup;
  unsubscribe$ = new Subject<void>();
  submitted = false;
  isSaveDraftClicked:boolean = false;
  requestBodyToSend: any;
  holdComissionDetails: any;
  commissionDateString:any;
  isLoading : boolean = false;

  myInpuPowerFiles:string [] = [];
  constructor(private formBuilder: FormBuilder, 
    private _route: ActivatedRoute,
    private _Commissioning: CommissioningService,
    private datePipe: DatePipe) { }
       public basicDateOptions: FlatpickrOptions = {
        mode: 'single',
        dateFormat: 'd.m.Y',
        defaultDate: new Date(Date.now()),
  };

  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  ngOnInit(): void {

    // get commision id start
    this._route.paramMap.subscribe(params => {
      this.commissionId = params.get('commissionId');
    });
    this.createCommissionForm();
  
    this.LoadDatacommissionForm();
    this.disableFields();
    // content header
    this.contentHeader = {
      headerTitle: ' Commissioning Form',
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
   
   
    //this.getCityData();

    

  }

  createCommissionForm(): void {
    this.commissionForm = this.formBuilder.group({

      txtIRF: [null],
      txtServiceRNumber: [null],
      txtClientName: [null],
      txtClientCode: [null],
      txtAddress: [null],
      txtCity: [null],

      txtCountry: [null],
      txtnameOfSite: [null],
      txtCommissionDate:[null],

      txtPinCode: [null],
      txtState: [null],
      txtPSNo: [null],
      txtoriginalProSrNo: [null],
      txtSiteID: [null],
     // txtContatct: [null],

      txtContactNoPersionSite: [null],
      txtContactNo: [null],
      txtAltContact: [null],
      txtEmailId: [null],
      txtPVInspect: [null],

      txtIndiDisplay: [null],
      txtAccessibility: [null],
      txtChgMPlate: [null],

      txtEBE: [null],
      txtEBEWLoad: [null],
      txtNoVoltage: [null],

      txtCheckPoint1: [null],
      txtCheckPoint2: [null],
      txtCheckPoint3: [null],
      txtCheckPoint4: [null],
      txtCheckPoint5: [null],

      txtCustomerName: [null],
      txtMobileNo: [null],
      txtEngineer: [null],
      txtEmpCode: [null],
      txtCustRepName: [null],
      txtremarks: [null],
      inputPowerImage:[null]
    });


  }
  saveAsDraft() {
    
    this.isLoading = true;
    this.isSaveDraftClicked = true;

  }
  
 
  FillDataToSendSave(): object {
    debugger
    let cDate= this.accessCommissionForm['txtCommissionDate'].value;
    if(cDate!=null)
    {
      cDate= this.datePipe.transform(cDate, 'yyyy-MM-dd');
    }
   if(this.selectedStateId== null && this.selectedStateId == undefined)
    {
      this.selectedStateId=this.holdComissionDetails.stateId;
    }
    debugger
    if(this.selectedCountryId== null && this.selectedCountryId == undefined)
    {
      this.selectedCountryId=this.holdComissionDetails.countryId;
    }
    this.requestBodyToSend = {
      id: this.commissionId,
      // irfId: this.holdComissionDetails.irfId,
      // accestId: this.holdComissionDetails.accestId,
      // sapSiteId: this.accessCommissionForm['txtSiteID'].value,
      // iRFRequestNumber: this.accessCommissionForm['txtIRF'].value,
      // serviceRequestNumber: this.accessCommissionForm['txtServiceRNumber'].value,

      customerName: this.accessCommissionForm['txtClientName'].value,
      customerCode: this.accessCommissionForm['txtClientCode'].value,
      address: this.accessCommissionForm['txtAddress'].value,
      pincode: this.accessCommissionForm['txtPinCode'].value,
      
      city: this.accessCommissionForm['txtCity'].value,

      stateId: parseInt(this.selectedStateId) ,
      country: parseInt(this.selectedCountryId),
      customerEmail: this.accessCommissionForm['txtEmailId'].value,

      customerMobile: this.accessCommissionForm['txtContactNo'].value,
      commissioningDate: cDate,
      siteName: this.accessCommissionForm['txtnameOfSite'].value,

       siteId: this.holdComissionDetails.siteId,

        contactPersonAtSite: this.accessCommissionForm['txtContactNoPersionSite'].value,
       alternateContactNumber: this.accessCommissionForm['txtAltContact'].value,
      origialProductSerialNo: this.accessCommissionForm['txtoriginalProSrNo'].value,
      productSerialNo: this.accessCommissionForm['txtPSNo'].value,
      partcode:this.holdComissionDetails.partCode,
      visualInspectionRequestList:[
      {
        "commissioningId": this.commissionId,
        "visualInspectionListId":1,
        "remark": this.accessCommissionForm['txtAccessibility'].value,
      },
        {
          "commissioningId": this.commissionId,
        "visualInspectionListId":2,
        "remark": this.accessCommissionForm['txtChgMPlate'].value
        
        },
        {
          "commissioningId": this.commissionId,
          "visualInspectionListId":3,
          "remark": this.accessCommissionForm['txtPVInspect'].value
       
        
        },
        {
          "commissioningId": this.commissionId,
          "visualInspectionListId":4,
          "remark": this.accessCommissionForm['txtIndiDisplay'].value
        }
         
      ],
      mainInputParameterRequestList:[
        {
          "commissioningId": this.commissionId,
            "mainInputParameterListId":1,
            "actualValue":this.accessCommissionForm['txtEBE'].value
        },
        {
          "commissioningId": this.commissionId,
            "mainInputParameterListId":2,
            "actualValue":this.accessCommissionForm['txtEBEWLoad'].value
        },
        {
          "commissioningId": this.commissionId,
            "mainInputParameterListId":2,
            "actualValue":this.accessCommissionForm['txtNoVoltage'].value
        },

    ],

    checkPointRequestList:[
      {
          "commissioningId":this.commissionId,
          "checkPointsListId":1,
          "remark":this.accessCommissionForm['txtCheckPoint1'].value
      },
       {
          "commissioningId":this.commissionId,
          "checkPointsListId":2,
          "remark":this.accessCommissionForm['txtCheckPoint2'].value
      },
       {
          "commissioningId":this.commissionId,
          "checkPointsListId":3,
          "remark":this.accessCommissionForm['txtCheckPoint3'].value
      },
       {
          "commissioningId":this.commissionId,
          "checkPointsListId":4,
          "remark":this.accessCommissionForm['txtCheckPoint4'].value
      },
       {
          "commissioningId":this.commissionId,
          "checkPointsListId":5,
          "remark":this.accessCommissionForm['txtCheckPoint5'].value
      }
  ],

      // mipNVoltage: this.accessCommissionForm['txtEBE'].value,
      // mipNeVoltWithLoad: this.accessCommissionForm['txtEBEWLoad'].value,
      // mipNeVoltNoLoad: this.accessCommissionForm['txtNoVoltage'].value,

      // checkPoint1: this.accessCommissionForm['txtCheckPoint1'].value,
      // checkPoint2: this.accessCommissionForm['txtCheckPoint2'].value,
      // checkPoint3: this.accessCommissionForm['txtCheckPoint3'].value,
      // checkPoint4: this.accessCommissionForm['txtCheckPoint4'].value,
      // checkPoint5: this.accessCommissionForm['txtCheckPoint5'].value,

      rfidKeyHolderName: this.accessCommissionForm['txtCustomerName'].value,
      rfidKeyHolderMobileNo: this.accessCommissionForm['txtMobileNo'].value,
     
      employeeCode: this.accessCommissionForm['txtEmpCode'].value,
      exicomRepresentativeName: this.accessCommissionForm['txtEngineer'].value,
      remark: this.accessCommissionForm['txtremarks'].value,
      customerRepresentativeName: this.accessCommissionForm['txtCustRepName'].value,
      // inputPowerImage: null,
      // earthingValueImage: null,
      // appActivationImage: null,
      // vehicleTestingImage: null,
      // softwareUpdImage: null,
      // commissioningReport: null,
      // saveStatus: "S",
      // saveStatus: this.isSaveDraftClicked ? 'D' : 'S',
      // status: "O",
      commissioningStatusId:this.isSaveDraftClicked ? 3 : 6,

    }
    return this.requestBodyToSend
  }
  get accessCommissionForm() {
    return this.commissionForm.controls
  }

  setValuesComissionForm(): void
  
  {
    
    
  
    this.commissionDateString=this.datePipe.transform(this.holdComissionDetails.commissioningDate, 'dd-MM-YYYY');
     this.fnVisualInspectionList();
     this.fnCheckPointList();
     this.fnMainInputParameterList();
   //  console.log('sss',this.holdComissionDetails);

    this.accessCommissionForm['txtIRF'].patchValue(this.holdComissionDetails.irfManualId);
    this.accessCommissionForm['txtServiceRNumber'].patchValue(this.holdComissionDetails.manualId);
    this.accessCommissionForm['txtClientName'].patchValue(this.holdComissionDetails.accountName);
    this.accessCommissionForm['txtClientCode'].patchValue(this.holdComissionDetails.sapCode);
    this.accessCommissionForm['txtAddress'].patchValue(this.holdComissionDetails.address);
    this.accessCommissionForm['txtPinCode'].patchValue(this.holdComissionDetails.pincode);

    this.accessCommissionForm['txtCity'].patchValue(this.holdComissionDetails.city);
    this.accessCommissionForm['txtCountry'].patchValue(this.holdComissionDetails.countryId);
    this.accessCommissionForm['txtState'].patchValue(this.holdComissionDetails.stateId);
    this.accessCommissionForm['txtPSNo'].patchValue(this.holdComissionDetails.assetSerialNo);
    this.accessCommissionForm['txtoriginalProSrNo'].patchValue(this.holdComissionDetails.assetSerialNo);
  
    
    this.accessCommissionForm['txtnameOfSite'].patchValue(this.holdComissionDetails.siteName);
    this.accessCommissionForm['txtSiteID'].patchValue(this.holdComissionDetails.siteId);

    this.accessCommissionForm['txtContactNoPersionSite'].patchValue(this.holdComissionDetails.contactPersonAtSite);
    this.accessCommissionForm['txtContactNo'].patchValue(this.holdComissionDetails.customerMobile);
    this.accessCommissionForm['txtAltContact'].patchValue(this.holdComissionDetails.alternateContactNumber);
    this.accessCommissionForm['txtEmailId'].patchValue(this.holdComissionDetails.customerEmail);

    // this.accessCommissionForm['txtPVInspect'].patchValue(this.holdComissionDetails.viChkPerformVi1);
    // this.accessCommissionForm['txtIndiDisplay'].patchValue(this.holdComissionDetails.viIndicatorDisplay);
    // this.accessCommissionForm['txtAccessibility'].patchValue(this.holdComissionDetails.viAccessibility);
    // this.accessCommissionForm['txtChgMPlate'].patchValue(this.holdComissionDetails.viChargerMarkPlate);

    // this.accessCommissionForm['txtEBE'].patchValue(this.holdComissionDetails.mipNVoltage);
    // this.accessCommissionForm['txtEBEWLoad'].patchValue(this.holdComissionDetails.mipNeVoltWithLoad);
    // this.accessCommissionForm['txtNoVoltage'].patchValue(this.holdComissionDetails.mipNeVoltNoLoad);

    // this.accessCommissionForm['txtCheckPoint1'].patchValue(this.holdComissionDetails.checkPoint1);
    // this.accessCommissionForm['txtCheckPoint2'].patchValue(this.holdComissionDetails.checkPoint2);
    // this.accessCommissionForm['txtCheckPoint3'].patchValue(this.holdComissionDetails.checkPoint3);
    // this.accessCommissionForm['txtCheckPoint4'].patchValue(this.holdComissionDetails.checkPoint4);
    // this.accessCommissionForm['txtCheckPoint5'].patchValue(this.holdComissionDetails.checkPoint5);

    this.accessCommissionForm['txtCustomerName'].patchValue(this.holdComissionDetails.rfidKeyHolderName);
    this.accessCommissionForm['txtMobileNo'].patchValue(this.holdComissionDetails.rfidKeyHolderMobile);
    this.accessCommissionForm['txtEngineer'].patchValue(this.holdComissionDetails.exicomRepresentativeName);
    this.accessCommissionForm['txtEmpCode'].patchValue(this.holdComissionDetails.employeeCode);
    this.accessCommissionForm['txtCustRepName'].patchValue(this.holdComissionDetails.customerRepresentativeName);
    this.accessCommissionForm['txtremarks'].patchValue(this.holdComissionDetails.remark);
  }

  fnVisualInspectionList(): void {
    for (let i = 0; i <this.holdComissionDetails.visualInspectionList.length ;i++)
    {
 
     if (this.holdComissionDetails.visualInspectionList[i].visualInspectionListId===1)
     {
      this.accessCommissionForm['txtPVInspect']?.patchValue(this.holdComissionDetails.visualInspectionList[i].remark);

     }
     else if(this.holdComissionDetails.visualInspectionList[i].visualInspectionListId===2)
     {
      this.accessCommissionForm['txtIndiDisplay']?.patchValue(this.holdComissionDetails.visualInspectionList[i].remark);
     }
     else if(this.holdComissionDetails.visualInspectionList[i].visualInspectionListId===3)
     {
      this.accessCommissionForm['txtAccessibility']?.patchValue(this.holdComissionDetails.visualInspectionList[i].remark);
     }
     else if(this.holdComissionDetails.visualInspectionList[i].visualInspectionListId===4)
     {
      this.accessCommissionForm['txtChgMPlate']?.patchValue(this.holdComissionDetails.visualInspectionList[i].remark);
     }
    }

  }

  fnCheckPointList(): void {
    for (let i = 0; i <this.holdComissionDetails.checkPointList.length ;i++)
    {
 
     if (this.holdComissionDetails.checkPointList[i].checkPointListId===1)
     {
      this.accessCommissionForm['txtCheckPoint1']?.patchValue(this.holdComissionDetails.checkPointList[i].remark);

     }
     else if(this.holdComissionDetails.checkPointList[i]?.checkPointListId===2)
     {
      this.accessCommissionForm['txtCheckPoint2']?.patchValue(this.holdComissionDetails.checkPointList[i].remark);
     }
     else if(this.holdComissionDetails.checkPointList[i].checkPointListId===3)
     {
      this.accessCommissionForm['txtCheckPoint3']?.patchValue(this.holdComissionDetails.checkPointList[i].remark);
     }
     else if(this.holdComissionDetails.checkPointList[i].checkPointListId===4)
     {
      this.accessCommissionForm['txtCheckPoint4']?.patchValue(this.holdComissionDetails.checkPointList[i].remark);
     }
    
     else if(this.holdComissionDetails.checkPointList[i].checkPointListId===5)
     {
      this.accessCommissionForm['txtCheckPoint5']?.patchValue(this.holdComissionDetails.checkPointList[i].remark);
     }
    
    
    }

  }

  fnMainInputParameterList(): void {
    for (let i = 0; i <this.holdComissionDetails.mainInputParameterList.length ;i++)
    {

     if (this.holdComissionDetails.mainInputParameterList[i].MainInputParameterListId===1)
     {
      this.accessCommissionForm['txtEBE']?.patchValue(this.holdComissionDetails.mainInputParameterList[i].actualValue);

     }
     else if(this.holdComissionDetails.mainInputParameterList[i].MainInputParameterListId===2)
     {
      this.accessCommissionForm['txtEBEWLoad']?.patchValue(this.holdComissionDetails.mainInputParameterList[i].actualValue);
     }
     else if(this.holdComissionDetails.mainInputParameterList[i].MainInputParameterListId===3)
     {
      this.accessCommissionForm['txtNoVoltage']?.patchValue(this.holdComissionDetails.mainInputParameterList[i].actualValue);
     }
     
    }

  }


  LoadDatacommissionForm() {
   
  
    this._Commissioning.getCommisioningDeatil(this.commissionId).subscribe(
      (res) => {
        this.holdComissionDetails = res;
        this.setValuesComissionForm();
      },
      error => {
        console.log('There was an error while retrieving Comments !!!' + error);
      });
  }
   onSubmit() {
   
    this.isSaveDraftClicked = true;
    if (this.isSaveDraftClicked = true) {
      this.commissionSubmitAPI(this.commissionId, this.FillDataToSendSave())
    }

    else if (this.isSaveDraftClicked != true) {
    //productSerialNo= this.accessCommissionForm['txtoriginalProSrNo'].value;
      // check for getCheckProductSerial api call
      this.commissionSubmitAPI(this.commissionId, this.FillDataToSendSave())

    }
  }


// commission submit post api hit
  commissionSubmitAPI (commissionId,sendData)
  {
   
    this.isLoading = true;
    this._Commissioning.PostCommisioningForm(commissionId, sendData).pipe(
      takeUntil(this.unsubscribe$))
      .subscribe(
        ()=>{
          this.isLoading = false;
        }
      );
  }

  // lable siteID value cahnges logic start here
   keyUpSiteIDSearch() {
   let result:any
  this.commissionForm.get('txtSiteID').valueChanges.pipe(
  
    filter(x=> x!== undefined && x!== null && x!== '' && x!== 0),
    // debounce input for 400 milliseconds
    debounceTime(3000),
    // only emit if emission is different from previous emission
    distinctUntilChanged(),
    
    // switch map api call. This will cause previous api call to be ignored if it is still running when new emission comes along
    switchMap(res => this._Commissioning.getSiteIDSearch(res)))
  .subscribe(res => {
   // console.log('result', res.sites.siteId);

    result = res;
   
    
     // console.log('result', res);
      this.setValueForSiteId(result) 
      this.isShowSiteID=false;
    
   

    //  this.isShowSiteID=true;
    //  this.SiteIDMSG=result.Message;
    //  return;

    
})   
  }
  setValueForSiteId(result:any)
  {
    
    let stateId=this.serachSate(result[0].state)
    let countrtyId=this.serachCountry(result[0].country)
   // this.accessCommissionForm['txtClientName'].patchValue(result.sites.customerName);
    this.accessCommissionForm['txtContactNoPersionSite'].patchValue(result[0].customerName);
    
    this.accessCommissionForm['txtContactNo'].patchValue(result[0].contactNumber);
    this.accessCommissionForm['txtEmailId'].patchValue(result[0].emailId);
    this.accessCommissionForm['txtnameOfSite'].patchValue(result[0].siteName);
    this.accessCommissionForm['txtAddress'].patchValue(result[0].address);
    this.accessCommissionForm['txtPinCode'].patchValue(result[0].pincode);
    this.accessCommissionForm['txtCity'].patchValue(result[0].city);
    this.accessCommissionForm['txtCountry'].patchValue(countrtyId);
   // this.accessCommissionForm['txtState'].patchValue(result[0].state);
   this.accessCommissionForm['txtState'].patchValue(stateId);

    this.accessCommissionForm['txtAltContact'].patchValue(result[0].alternateContactNumber);
  }
 serachSate(stateName:any):string 
 {
  
 let getData =this.stateData.filter(x=>x.stateName.toLowerCase()===stateName.toLowerCase());
 let stateId=getData[0]?.stateId
 return stateId;

 }

 serachCountry(cName:any):string 
 {
  debugger
 let getData =this.countryData.filter(x=>x.countryName.toLowerCase()===cName.toLowerCase());
 let CId=getData[0]?.countryId;
 return CId;

 }
  // lable siteID value cahnges logic end here
  disableFields(): void {
 
  this.accessCommissionForm['txtPSNo'].disable();
  this.accessCommissionForm['txtIRF'].disable();
  this.accessCommissionForm['txtServiceRNumber'].disable();
  this.accessCommissionForm['txtClientName'].disable();
    this.accessCommissionForm['txtClientCode'].disable();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    
   
  }

  keyUpActualSrSearch() {
 
    let result:any
    
   //  return this.commissionForm.get('txtSiteID') as FormControl;
   this.commissionForm.get('txtoriginalProSrNo').valueChanges.pipe(
  
     filter(x=> x!== undefined && x!== null && x!== '' && x!== 0),
    
     debounceTime(3000),
  
     distinctUntilChanged(),

     switchMap(res =>  this._Commissioning.getCheckProductSerial(res)))
   .subscribe(res => {
    // console.log('result', res.sites.siteId);

     result = res;
     if (result.statusCode === "601") {
      this.isMsgProsr= true;

    this.msgCheckProductSerial = 'Actual seriel no.' + '('+result.productSerialNo.assetSerialNumber+')' + 'already exists';
     return ;
    }

    else if(result.statusCode === "603")
    {
      this.isMsgProsr= true;
      // this.msgCheckProductSerial = getResponse.Message;
      this.msgCheckProductSerial = 'Actual seriel no. not found';
       return ;
    }

 })   
   }
   
   onChangeSate(value) {
    debugger
     if(value === null || value === undefined)
     {
      this.selectedStateId=this.holdComissionDetails.stateId;
     }
     else
     {
     this.selectedStateId=value;
     }
  
    }
  
    onChangeCountry(value:any) {
      
      if(value === null || value === undefined)
      {
       this.selectedCountryId=this.holdComissionDetails.countryId;
      }
      else
      {
      this.selectedCountryId=value;
      }
   
     }
     onChangeInputPower(e) {
      //console.log (e.target.files);
      for (var i = 0; i < e.target.files.length; i++) { 
        this.myInpuPowerFiles.push(e.target.files[i]);
      }
      console.log(this.myInpuPowerFiles)
    }
    // ngAfterViewInit() {
      
    // }
  
}
