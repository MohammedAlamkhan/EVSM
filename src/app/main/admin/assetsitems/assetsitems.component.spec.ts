import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsitemsComponent } from './assetsitems.component';

describe('AssetsitemsComponent', () => {
  let component: AssetsitemsComponent;
  let fixture: ComponentFixture<AssetsitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
