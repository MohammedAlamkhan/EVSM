import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPdfComponent } from './survey-pdf.component';

describe('SurveyPdfComponent', () => {
  let component: SurveyPdfComponent;
  let fixture: ComponentFixture<SurveyPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
