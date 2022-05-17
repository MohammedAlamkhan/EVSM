import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvReportPdfComponent } from './ev-report-pdf.component';

describe('EvReportPdfComponent', () => {
  let component: EvReportPdfComponent;
  let fixture: ComponentFixture<EvReportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvReportPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvReportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
