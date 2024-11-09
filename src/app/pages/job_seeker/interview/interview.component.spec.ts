import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewComponentSeeker } from './interview.component';

describe('InterviewComponent', () => {
  let component: InterviewComponentSeeker;
  let fixture: ComponentFixture<InterviewComponentSeeker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewComponentSeeker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewComponentSeeker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
