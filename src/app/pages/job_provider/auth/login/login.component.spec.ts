import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: ProviderLoginComponent;
  let fixture: ComponentFixture<ProviderLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
