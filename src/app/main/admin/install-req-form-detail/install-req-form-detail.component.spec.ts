import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallReqFormDetailComponent } from './install-req-form-detail.component';

describe('InstallReqFormDetailComponent', () => {
  let component: InstallReqFormDetailComponent;
  let fixture: ComponentFixture<InstallReqFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallReqFormDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallReqFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
