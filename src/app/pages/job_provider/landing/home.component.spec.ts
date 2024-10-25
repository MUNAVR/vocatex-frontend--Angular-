import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: ProviderHomeComponent;
  let fixture: ComponentFixture<ProviderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
