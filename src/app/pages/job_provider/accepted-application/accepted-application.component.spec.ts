import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedApplicationComponent } from './accepted-application.component';

describe('AcceptedApplicationComponent', () => {
  let component: AcceptedApplicationComponent;
  let fixture: ComponentFixture<AcceptedApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
