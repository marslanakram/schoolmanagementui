import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentComponent } from './teacher-assignment.component';

describe('TeacherAssignmentComponent', () => {
  let component: TeacherAssignmentComponent;
  let fixture: ComponentFixture<TeacherAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAssignmentComponent]
    });
    fixture = TestBed.createComponent(TeacherAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
