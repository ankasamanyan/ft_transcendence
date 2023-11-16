import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDialogComponent } from './selected-dialog.component';

describe('SelectedDialogComponent', () => {
  let component: SelectedDialogComponent;
  let fixture: ComponentFixture<SelectedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedDialogComponent]
    });
    fixture = TestBed.createComponent(SelectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
