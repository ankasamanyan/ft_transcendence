import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUnblockedNotificationComponent } from './user-unblocked-notification.component';

describe('UserUnblockedNotificationComponent', () => {
  let component: UserUnblockedNotificationComponent;
  let fixture: ComponentFixture<UserUnblockedNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUnblockedNotificationComponent]
    });
    fixture = TestBed.createComponent(UserUnblockedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
