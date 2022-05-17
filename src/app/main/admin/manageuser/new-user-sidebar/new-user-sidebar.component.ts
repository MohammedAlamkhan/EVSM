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
  }
  
  submit() {

          if(this.userForm.valid)
          {
            let context = {
              roles: {
                roleId: +this.userForm.value.userRoleId
              },
                fullName: this.userForm.value.fullName
              , emailId: this.userForm.value.email
              , mobileNo: this.userForm.value.mobileNo.toString()
              , userType: this.userForm.value.userTypeId
              , designation: 'X'
              , username: this.userForm.value.email
              , password: this.userForm.value.password
              , enabled: true
              , status: this.userForm.value.isActive
              
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
      fullName: ['',[Validators.required]], 
      userRoleId: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      mobileNo: ['',[Validators.required]],
      userTypeId: ['',[Validators.required]],
      isActive : [true,Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
}
