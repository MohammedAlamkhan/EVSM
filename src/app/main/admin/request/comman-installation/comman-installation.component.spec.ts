import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanInstallationsComponent } from './comman-installation.component';

describe('CommanInstallationsComponent', () => {
  let component: CommanInstallationsComponent;
  let fixture: ComponentFixture<CommanInstallationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanInstallationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanInstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
