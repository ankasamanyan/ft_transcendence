import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationReceivedNotificationComponent } from './invitation-received-notification.component';

describe('InvitationReceivedNotificationComponent', () => {
  let component: InvitationReceivedNotificationComponent;
  let fixture: ComponentFixture<InvitationReceivedNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationReceivedNotificationComponent]
    });
    fixture = TestBed.createComponent(InvitationReceivedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
