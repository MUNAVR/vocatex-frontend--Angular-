import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedAppliedJobsComponent } from './accepted-applied-jobs.component';

describe('AcceptedAppliedJobsComponent', () => {
  let component: AcceptedAppliedJobsComponent;
  let fixture: ComponentFixture<AcceptedAppliedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedAppliedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedAppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
