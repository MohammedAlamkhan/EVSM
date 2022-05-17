import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrfComponent } from './irf.component';

describe('IrfComponent', () => {
  let component: IrfComponent;
  let fixture: ComponentFixture<IrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
