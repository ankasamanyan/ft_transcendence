import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPasswordModalComponent } from './enter-password-modal.component';

describe('EnterPasswordModalComponent', () => {
  let component: EnterPasswordModalComponent;
  let fixture: ComponentFixture<EnterPasswordModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterPasswordModalComponent]
    });
    fixture = TestBed.createComponent(EnterPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
