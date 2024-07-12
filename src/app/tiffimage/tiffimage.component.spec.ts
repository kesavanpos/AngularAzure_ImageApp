import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffimageComponent } from './tiffimage.component';

describe('TiffimageComponent', () => {
  let component: TiffimageComponent;
  let fixture: ComponentFixture<TiffimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiffimageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiffimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
