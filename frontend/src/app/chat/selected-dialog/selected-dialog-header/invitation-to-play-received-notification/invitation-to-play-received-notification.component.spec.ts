import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationToPlayReceivedNotificationComponent } from './invitation-to-play-received-notification.component';

describe('InvitationReceivedNotificationComponent', () => {
  let component: InvitationToPlayReceivedNotificationComponent;
  let fixture: ComponentFixture<InvitationToPlayReceivedNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationToPlayReceivedNotificationComponent]
    });
    fixture = TestBed.createComponent(InvitationToPlayReceivedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
