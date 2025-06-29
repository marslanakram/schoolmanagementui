import { Component, OnInit } from '@angular/core';
import { EnrollmentDto } from 'src/app/interfaces/enrollment.model';
import { StudentDto } from 'src/app/interfaces/student.model';
import { ClassDto } from 'src/app/interfaces/class.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { HttpResponse } from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
  enrollments: EnrollmentDto[] = [];
  students: StudentDto[] = [];
  classes: ClassDto[] = [];
  enrollment: EnrollmentDto = this.getEmptyEnrollment();
  isEditMode = false;
  modal: any;

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.loadEnrollments();
    this.loadStudents();
    this.loadClasses();
  }

  getEmptyEnrollment(): EnrollmentDto {
    return {
      id: 0,
      studentId: 0,
      classId: 0,
      enrollmentDate: '',
      isActive: true
    };
  }

  loadEnrollments(): void {
    this.api.getRequest<EnrollmentDto[]>('Enrollment').subscribe({
      next: (res) => (this.enrollments = res.body || []),
      error: (err) => console.error('Error loading enrollments:', err)
    });
  }

  loadStudents(): void {
    this.api.getRequest<StudentDto[]>('Students').subscribe({
      next: (res) => (this.students = res.body || []),
      error: (err) => console.error('Error loading students:', err)
    });
  }

  loadClasses(): void {
    this.api.getRequest<ClassDto[]>('Classes').subscribe({
      next: (res) => (this.classes = res.body || []),
      error: (err) => console.error('Error loading classes:', err)
    });
  }

  getStudentNameById(id: number): string {
    const s = this.students.find(x => x.id === id);
    return s ? `${s.firstName} ${s.lastName}` : 'Unknown';
  }

  getClassNameById(id: number): string {
    const c = this.classes.find(x => x.id === id);
    return c ? c.name : 'Unknown';
  }

  openAddModal(): void {
    this.enrollment = this.getEmptyEnrollment();
    this.isEditMode = false;
    this.showModal();
  }

  openEditModal(item: EnrollmentDto): void {
    this.enrollment = { ...item };
    this.isEditMode = true;
    this.showModal();
  }

  showModal(): void {
    const modalEl = document.getElementById('enrollmentModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }

  submitEnrollment(): void {
    if (this.isEditMode) {
      this.api.updateRequest(`Enrollment/${this.enrollment.id}`, this.enrollment).subscribe({
        next: () => {
          this.loadEnrollments();
          this.modal.hide();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.api.postRequest('Enrollment', this.enrollment).subscribe({
        next: () => {
          this.loadEnrollments();
          this.modal.hide();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      this.api.deleteRequest(`Enrollment/${id}`).subscribe({
        next: () => this.loadEnrollments(),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}
