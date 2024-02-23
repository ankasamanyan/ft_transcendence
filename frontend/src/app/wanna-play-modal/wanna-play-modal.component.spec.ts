import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WannaPlayModalComponent } from './wanna-play-modal.component';

describe('WannaPlayModalComponent', () => {
  let component: WannaPlayModalComponent;
  let fixture: ComponentFixture<WannaPlayModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WannaPlayModalComponent]
    });
    fixture = TestBed.createComponent(WannaPlayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
