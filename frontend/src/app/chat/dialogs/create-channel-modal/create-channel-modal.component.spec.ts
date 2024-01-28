import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelModalComponent } from './create-channel-modal.component';

describe('CreateChannelModalComponent', () => {
  let component: CreateChannelModalComponent;
  let fixture: ComponentFixture<CreateChannelModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChannelModalComponent]
    });
    fixture = TestBed.createComponent(CreateChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
