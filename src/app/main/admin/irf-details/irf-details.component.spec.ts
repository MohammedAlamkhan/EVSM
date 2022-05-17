import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrfDetailsComponent } from './irf-details.component';

describe('IrfDetailsComponent', () => {
  let component: IrfDetailsComponent;
  let fixture: ComponentFixture<IrfDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrfDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
