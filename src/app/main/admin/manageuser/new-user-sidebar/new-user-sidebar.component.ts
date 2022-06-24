import { Component, OnInit,OnDestroy } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ManageUserService as UserService} from '../manage-user.service';
// import {NotificationService as Notify} from '../../../../shared/services/notification.service';
// import { NotificationType } from 'app/Models/NotificationMessage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit, OnDestroy{

    unsubscribe$ = new Subject<void>()
    userForm: FormGroup;
  circles: any;
  contacts: any;
  accounts: any;
  selectedAccountId: any;
  selectedContactId: any;
  roles: any;
  managers: any;
  selectedManagerId: any;
  profiles: any;
  selectedProfileId: any;
    constructor(private _coreSidebarService: CoreSidebarService,
    private fb : FormBuilder,
    private httpClient: HttpClient,
    private userService : UserService,
    // private notify:Notify,
    private router:Router) {}

  
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {
    this.createForm();
    this.getCircles();
   

  }


  getRoles($event){
    if($event.keyCode !== 8 && $event.keyCode !== 46 ){
      this.userService.getRoles($event.target.value).subscribe(
        (data) => {
          this.roles = data;
        }
      )
    } 
   }

 

  getAccounts($event){
    if($event.keyCode !== 8 && $event.keyCode !== 46 ){
      this.userService.getAccounts($event.target.value).subscribe(
        (data) => {
          this.accounts = data;
        }
      )
    } 
   }

  getCircles(){
    this.userService.getCircles().subscribe(
       (data) => {
         this.circles = data;
       }
     )
   }
  

   getAccountId($event){
    const name = $event.target.value;
    for(let i=0;i<this.accounts.length;i++){
      if(this.accounts[i].name===name){
        this.selectedAccountId=this.accounts[i].id;
      }
    }
    console.log(this.selectedAccountId)
   }

   getContactId($event){
    const name = $event.target.value;
    for(let i=0;i<this.contacts.length;i++){
      if(this.contacts[i].fullName===name){
        this.selectedContactId=this.contacts[i].contactId;
      }
    }
    console.log(this.selectedContactId)
   }


   getManagerId($event){
    const name = $event.target.value;
    for(let i=0;i<this.contacts.length;i++){
      if(this.managers[i].name===name){
        this.selectedManagerId=this.managers[i].phone;
      }
    }
    console.log(this.selectedManagerId)
   }


   getProfileId($event){
    const name = $event.target.value;
    for(let i=0;i<this.profiles.length;i++){
      if(this.profiles[i].name===name){
        this.selectedProfileId=this.profiles[i].id;
      }
    }
    console.log(this.selectedProfileId)
   }



   getContacts($event){
    if($event.keyCode !== 8 && $event.keyCode !== 46 ){
      this.userService.getContacts($event.target.value,this.selectedAccountId).subscribe(
        (data) => {
          this.contacts = data;
        }
      )
    }  
   }

   getManagers($event){
    if($event.keyCode !== 8 && $event.keyCode !== 46 ){
      this.userService.getManagers($event.target.value).subscribe(
        (data) => {
          this.managers = data;
        }
      )
    }  
   }

   getProfiles($event){
    if($event.keyCode !== 8 && $event.keyCode !== 46 ){
      this.userService.getProfiles($event.target.value).subscribe(
        (data) => {
          this.profiles = data;
        }
      )
    }  
   }

  submit() {

    if (this.userForm.valid) {
      let context = {
        circleId: this.userForm.value.circleId,
        // account: this.userForm.value.account,
        contactId: this.selectedContactId,
        role: this.userForm.value.role,
        manager: this.selectedManagerId,
        profile: this.selectedProfileId,
        password: this.userForm.value.password,
        confirmPassword: this.userForm.value.repassword
      }
      this.userService.postUser(context)
        .pipe(
          takeUntil(this.unsubscribe$)

        ).subscribe();

    }

  }

  createForm()
  {
    this.userForm = this.fb.group({
      account: ['',[Validators.required]], 
      contact: ['',[Validators.required]],
      role: ['',[Validators.required]],
      manager: [''],
      profile: ['',[Validators.required]],
      circleId: [''],
      password: ['',[Validators.required]],
      repassword: ['',[Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
}
