import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanUserComponent } from './comman-user.component';

describe('CommanUserComponent', () => {
  let component: CommanUserComponent;
  let fixture: ComponentFixture<CommanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
