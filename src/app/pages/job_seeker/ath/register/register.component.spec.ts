import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerRegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: SeekerRegisterComponent;
  let fixture: ComponentFixture<SeekerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
