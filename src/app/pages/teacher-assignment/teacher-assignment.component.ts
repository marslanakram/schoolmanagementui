import { Component, OnInit } from '@angular/core';
import { TeacherAssignmentDto } from 'src/app/interfaces/teacher-assignment.model';
import { TeacherDto } from 'src/app/interfaces/teacher.model';
import { SubjectDto } from 'src/app/interfaces/subject.model';
import { ClassDto } from 'src/app/interfaces/class.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
declare var bootstrap: any;

@Component({
  selector: 'app-teacher-assignment',
  templateUrl: './teacher-assignment.component.html',
  styleUrls: ['./teacher-assignment.component.scss']
})
export class TeacherAssignmentComponent  implements OnInit {
  assignments: TeacherAssignmentDto[] = [];
  teachers: TeacherDto[] = [];
  subjects: SubjectDto[] = [];
  classes: ClassDto[] = [];

  assignment: TeacherAssignmentDto = this.getEmptyAssignment();
  isEditMode = false;
  modal: any;

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  getEmptyAssignment(): TeacherAssignmentDto {
    return {
      id: 0,
      teacherId: 0,
      subjectId: 0,
      classId: 0,
      assignmentDate: '',
      schedule: ''
    };
  }

  loadAll(): void {
    this.api.getRequest<TeacherAssignmentDto[]>('TeacherAssignment').subscribe({
      next: res => this.assignments = res.body || [],
      error: err => console.error('Error loading assignments', err)
    });

    this.api.getRequest<TeacherDto[]>('Teacher').subscribe({
      next: res => this.teachers = res.body || [],
      error: err => console.error('Error loading teachers', err)
    });

    this.api.getRequest<SubjectDto[]>('Subject').subscribe({
      next: res => this.subjects = res.body || [],
      error: err => console.error('Error loading subjects', err)
    });

    this.api.getRequest<ClassDto[]>('Classes').subscribe({
      next: res => this.classes = res.body || [],
      error: err => console.error('Error loading classes', err)
    });
  }

  openAddModal(): void {
    this.assignment = this.getEmptyAssignment();
    this.isEditMode = false;
    this.showModal();
  }

  openEditModal(data: TeacherAssignmentDto): void {
    this.assignment = { ...data };
    this.isEditMode = true;
    this.showModal();
  }

  showModal(): void {
    const el = document.getElementById('assignmentModal');
    if (el) {
      this.modal = new bootstrap.Modal(el);
      this.modal.show();
    }
  }

  submitAssignment(): void {
    if (this.isEditMode) {
      this.api.updateRequest(`TeacherAssignment/${this.assignment.id}`, this.assignment).subscribe({
        next: () => {
          this.loadAll();
          this.modal.hide();
        },
        error: err => console.error('Error updating assignment', err)
      });
    } else {
      this.api.postRequest('TeacherAssignment', this.assignment).subscribe({
        next: () => {
          this.loadAll();
          this.modal.hide();
        },
        error: err => console.error('Error creating assignment', err)
      });
    }
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.api.deleteRequest(`TeacherAssignment/${id}`).subscribe({
        next: () => this.loadAll(),
        error: err => console.error('Error deleting assignment', err)
      });
    }
  }

  getTeacherName(id: number): string {
    const t = this.teachers.find(x => x.id === id);
    return t ? `${t.firstName} ${t.lastName}` : 'Unknown';
  }

  getSubjectName(id: number): string {
    const s = this.subjects.find(x => x.id === id);
    return s ? s.name : 'Unknown';
  }

  getClassName(id: number): string {
    const c = this.classes.find(x => x.id === id);
    return c ? c.name : 'Unknown';
  }
}
