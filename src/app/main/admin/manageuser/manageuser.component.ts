
import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ManageUserService as UserService } from '../manageuser/manage-user.service';
import { AuthenticationService } from '@core/core/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ManageuserComponent implements OnInit {
  public sidebarToggleRef = false;
  public contentHeader: object
  // private _unsubscribeAll: Subject<any>;
  creds = this.authService.getCredentials;


  allUsers: any;
  loading: boolean = false;
  noOfRows: number=20;
  totalRecords: number;
  first: any;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private router: Router,
    // private _coreConfigService: CoreConfigService,
    public authService: AuthenticationService,
    private userService: UserService
  ) {
    // this._unsubscribeAll = new Subject();
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Manage User',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/sales'
          }
        ]
      }
    };

    // this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
    //   this.loading = true;
    // });
  }

  enableDisbaleUser(id, op){
    let req = {
      "userId": id,
      "enableFlag":op
    }
    this.userService.enableDisbaleUser(req)
    .pipe(
     

    ).subscribe();
}

  
passUserData(id){
  this.userService.getUser(id).subscribe(
    (data) => {
    this.userService.selectedUser=data;
    this.go_next('\detail-user');

    }
  )
}

go_next(route){
  setTimeout(() => {
      this.loading = false;
      this.router.navigate([route])
    }
    , 1000);
}

loadData($event) {
  this.first = $event.first;
  const req={
    "page":$event.first/this.noOfRows,
    "size":$event.rows
  }
  this.loading = true;
  this.allUsers =   this.userService.getAllUsers(req).subscribe(
    (data) => {

      this.allUsers = data.content;
      this.totalRecords = data.totalElements;
      this.loading = false;
    }
  )
}


  ngOnDestroy(): void {
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }
}
