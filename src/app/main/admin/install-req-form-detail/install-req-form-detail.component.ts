import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-install-req-form-detail',
  templateUrl: './install-req-form-detail.component.html',
  styleUrls: ['./install-req-form-detail.component.scss']
})
export class InstallReqFormDetailComponent implements OnInit {
  public contentHeader: object
  constructor(private modalService: NgbModal) { }
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
  }

}
