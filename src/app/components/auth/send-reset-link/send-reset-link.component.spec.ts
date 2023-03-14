import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetLinkComponent } from './send-reset-link.component';

describe('SendResetLinkComponent', () => {
  let component: SendResetLinkComponent;
  let fixture: ComponentFixture<SendResetLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendResetLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendResetLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
