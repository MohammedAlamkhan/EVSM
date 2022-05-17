import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent';
import { ServicesService as Admin } from '../../../admin/services.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  public contentHeader: object

  noOfRows: number = 9;
  installationList : [];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;

  constructor(private modalService: NgbModal,
    private admin: Admin) { }
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  modalOpenSM2(modalSM2) {
    this.modalService.open(modalSM2, {
      centered: true,
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  ngOnInit(): void {
    debugger;
    // content header
    this.contentHeader = {
      headerTitle: 'Inbox',
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
    this.loading = true;
  }

  loadData(event: LazyLoadEvent) {
    debugger;
    this.loading = true;
    this.admin.getInstallationListInApproval({ lazyEvent: JSON.stringify(event) }).subscribe(
      (data) => {
        debugger;
        this.installationList = data.installations;
        this.totalRecords = data.totalRecords;
        this.loading = false;
      }
    )

  }

}
