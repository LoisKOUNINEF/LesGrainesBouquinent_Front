import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLinkSentComponent } from './reset-link-sent.component';

describe('ResetLinkSentComponent', () => {
  let component: ResetLinkSentComponent;
  let fixture: ComponentFixture<ResetLinkSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetLinkSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetLinkSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
