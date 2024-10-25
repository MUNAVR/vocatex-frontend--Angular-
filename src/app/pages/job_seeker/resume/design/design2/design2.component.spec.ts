import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Design2Component } from './design2.component';

describe('Design2Component', () => {
  let component: Design2Component;
  let fixture: ComponentFixture<Design2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Design2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Design2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
