import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent } from '../../../../Models/lazyloadevent';
import { InstallationService } from '../../../admin/request/installation/installation.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {
  public contentHeader: object

  noOfRows: number = 20;
  installationList : [];
  totalRecords: number;
  cols: any[];
  loading: boolean = false;
  first: any;

  constructor(private modalService: NgbModal,
    private installationService: InstallationService) { }
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

  loadData($event) {
    this.first = $event.first;
    const req={
      "page":$event.first/this.noOfRows,
      "size":$event.rows
    }
    this.loading = true;
    this.installationService.getInstallationListToBeApproved(req).subscribe(
      (data) => {
        this.installationList = data.installations;
        this.totalRecords = data.totalElements;
        this.loading = false;
      }
    )

  }

}
