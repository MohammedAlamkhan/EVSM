import { Component, OnInit,OnDestroy } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ManageUserService as UserService} from '../../../../main/admin/manageuser/manage-user.service';
// import {NotificationService as Notify} from '../../../../shared/services/notification.service';
// import { NotificationType } from 'app/Models/NotificationMessage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthenticationService } from '@core/core/authentication.service';

@Component({
  selector: 'change-password-sidebar',
  templateUrl: './change-password-sidebar.component.html'
})
export class ChangePasswordComponent implements OnInit, OnDestroy{
  creds = this.authService.getCredentials;
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
    public authService: AuthenticationService,
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

    if (this.userForm.valid) {
      let context = {
        // userId: this.creds.phone,
        oldPassword: this.userForm.value.oldpassword,
        newPassword: this.userForm.value.password,
        confirmPassword: this.userForm.value.repassword
      }
      this.userService.changePassword(context)
        .pipe(
          takeUntil(this.unsubscribe$)

        ).subscribe();

    }

  }

  createForm()
  {
    this.userForm = this.fb.group({
      oldpassword: ['',[Validators.required]],
      password: ['',[Validators.required]],
      repassword: ['',[Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
}
