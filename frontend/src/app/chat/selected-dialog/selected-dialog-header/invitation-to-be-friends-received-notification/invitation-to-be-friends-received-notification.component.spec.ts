import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationToBeFriendsReceivedNotificationComponent } from './invitation-to-be-friends-received-notification.component';

describe('AddedToFriendsNotificationComponent', () => {
  let component: InvitationToBeFriendsReceivedNotificationComponent;
  let fixture: ComponentFixture<InvitationToBeFriendsReceivedNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationToBeFriendsReceivedNotificationComponent]
    });
    fixture = TestBed.createComponent(InvitationToBeFriendsReceivedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
