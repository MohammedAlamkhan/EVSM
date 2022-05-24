import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';

import { AuthenticationService as Auth } from '@core/core/authentication.service'
import { NotificationService } from 'app/shared/services/notification.service';
import { NotificationType } from 'app/Models/NotificationMessage';
import { AppConstants } from '../../../../shared/AppConstants'

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  userName: string;
  password: string;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: Auth,
    private notify: NotificationService
  ) {
    this._unsubscribeAll = new Subject();

    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };

  }

  get f() {
    return this.loginForm.controls;
  }


  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.status === 'INVALID') {
      this.loading = false;
      return;
    }


    let loginContext = {
      userId: this.loginForm.value.phone,
      password: this.loginForm.value.password
    }

    this.auth.login(loginContext).subscribe(
      (res) => {
        if (
          res.token != null
          && res.token !== undefined) {
          this._router.navigate(['home'], { replaceUrl: true })
        }
        else {
          this.notify.show("Login Failed, Please check your credentials !!", NotificationType.Error);
        }

        this.loading = false;
      },
      (err) => {
        if (err.status === AppConstants.HTTPSTATUS_INTERNAL_SERVER_ERROR)
          this.notify.show(AppConstants.ApiErrorMessage, NotificationType.Info)

        this.loading = false;
      }
    )

  }


  ngOnInit(): void {
    this.createForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  createForm(): void {
    this.loginForm = this._formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', Validators.required]
    });
  }
}
