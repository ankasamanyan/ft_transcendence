import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToFriendsNotificationComponent } from './added-to-friends-notification.component';

describe('AddedToFriendsNotificationComponent', () => {
  let component: AddedToFriendsNotificationComponent;
  let fixture: ComponentFixture<AddedToFriendsNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedToFriendsNotificationComponent]
    });
    fixture = TestBed.createComponent(AddedToFriendsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
