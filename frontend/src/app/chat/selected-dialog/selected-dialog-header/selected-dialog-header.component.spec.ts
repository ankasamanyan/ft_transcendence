import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDialogHeaderComponent } from './selected-dialog-header.component';

describe('SelectedDialogHeaderComponent', () => {
  let component: SelectedDialogHeaderComponent;
  let fixture: ComponentFixture<SelectedDialogHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedDialogHeaderComponent]
    });
    fixture = TestBed.createComponent(SelectedDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
