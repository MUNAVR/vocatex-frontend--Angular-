import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stpe4Component } from './stpe4.component';

describe('Stpe4Component', () => {
  let component: Stpe4Component;
  let fixture: ComponentFixture<Stpe4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stpe4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stpe4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
