import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanAccountsComponent } from './comman-accounts.component';

describe('CommanAccountsComponent', () => {
  let component: CommanAccountsComponent;
  let fixture: ComponentFixture<CommanAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
