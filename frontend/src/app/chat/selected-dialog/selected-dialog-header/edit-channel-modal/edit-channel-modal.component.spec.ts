import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChannelModalComponent } from './edit-channel-modal.component';

describe('EditChannelModalComponent', () => {
  let component: EditChannelModalComponent;
  let fixture: ComponentFixture<EditChannelModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChannelModalComponent]
    });
    fixture = TestBed.createComponent(EditChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
