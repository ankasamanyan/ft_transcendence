import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveChannelModalComponent } from './leave-channel-modal.component';

describe('LeaveChannelModalComponent', () => {
  let component: LeaveChannelModalComponent;
  let fixture: ComponentFixture<LeaveChannelModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveChannelModalComponent]
    });
    fixture = TestBed.createComponent(LeaveChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
