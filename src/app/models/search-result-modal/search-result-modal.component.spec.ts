import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultModalComponent } from './search-result-modal.component';

describe('SearchResultModalComponent', () => {
  let component: SearchResultModalComponent;
  let fixture: ComponentFixture<SearchResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
