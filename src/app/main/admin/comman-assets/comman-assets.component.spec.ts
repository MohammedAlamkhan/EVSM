import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanAssetsComponent } from './comman-assets.component';

describe('CommanAssetsComponent', () => {
  let component: CommanAssetsComponent;
  let fixture: ComponentFixture<CommanAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommanAssetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
