import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSearchbarComponent } from './books-searchbar.component';

describe('BooksSearchbarComponent', () => {
  let component: BooksSearchbarComponent;
  let fixture: ComponentFixture<BooksSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksSearchbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
