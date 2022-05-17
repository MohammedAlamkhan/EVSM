import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallReqFormComponent } from './install-req-form.component';

describe('InstallReqFormComponent', () => {
  let component: InstallReqFormComponent;
  let fixture: ComponentFixture<InstallReqFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallReqFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallReqFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
