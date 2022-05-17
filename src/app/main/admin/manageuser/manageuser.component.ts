
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { UserDetails } from 'app/Models/User';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { ManageUserService as UserService } from '../manageuser/manage-user.service'

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageuserComponent implements OnInit {
  public sidebarToggleRef = false;
  private _unsubscribeAll: Subject<any>;

  noOfRows: number = 9;
  users: UserDetails[];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private userService: UserService
  ) {
    this._unsubscribeAll = new Subject();
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  ngOnInit(): void {

    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.loading = true;
    });
  }

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    this.userService.getAllUsers({ lazyEvent: JSON.stringify(event) }).subscribe(
      (data) => {
        this.users = data.users;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }
    )

  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
