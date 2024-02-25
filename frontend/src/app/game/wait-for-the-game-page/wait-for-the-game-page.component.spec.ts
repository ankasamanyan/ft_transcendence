import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitForTheGamePageComponent } from './wait-for-the-game-page.component';

describe('WaitForTheGamePageComponent', () => {
  let component: WaitForTheGamePageComponent;
  let fixture: ComponentFixture<WaitForTheGamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitForTheGamePageComponent]
    });
    fixture = TestBed.createComponent(WaitForTheGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
