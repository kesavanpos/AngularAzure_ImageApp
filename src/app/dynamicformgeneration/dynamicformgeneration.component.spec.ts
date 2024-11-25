import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformgenerationComponent } from './dynamicformgeneration.component';

describe('DynamicformgenerationComponent', () => {
  let component: DynamicformgenerationComponent;
  let fixture: ComponentFixture<DynamicformgenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicformgenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicformgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
