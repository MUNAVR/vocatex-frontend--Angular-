import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: SeekerLoginComponent;
  let fixture: ComponentFixture<SeekerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
