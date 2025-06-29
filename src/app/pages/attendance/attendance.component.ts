import { Component, OnInit } from '@angular/core';
import { AttendanceDto } from 'src/app/interfaces/attendance.model';
import { StudentDto } from 'src/app/interfaces/student.model';
import { ClassDto } from 'src/app/interfaces/class.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { HttpResponse } from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendances: AttendanceDto[] = [];
  attendance: AttendanceDto = this.getEmptyAttendance();
  isEditMode = false;
  students: StudentDto[] = [];
  classes: ClassDto[] = [];
  modal: any;

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.loadAttendances();
    this.loadStudents();
    this.loadClasses();
  }

  getEmptyAttendance(): AttendanceDto {
    return {
      id: 0,
      studentId: 0,
      classId: 0,
      date: '',
      isPresent: true,
      notes: ''
    };
  }

  loadAttendances(): void {
    this.api.getRequest<AttendanceDto[]>('Attendance').subscribe({
      next: (res) => (this.attendances = res.body || []),
      error: (err) => console.error('Error loading attendance:', err)
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

  getStudentNameById(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
  }

  getClassNameById(classId: number): string {
    const cls = this.classes.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown';
  }

  getGradeSection(grade: number, section: number): string {
    const gradeMap = [
      'Play Group', 'Nursery', 'Prep / KG', '1st', '2nd', '3rd', '4th', '5th',
      '6th', '7th', '8th', '9th', '10th', '11th (First Year)', '12th (Second Year)'
    ];
    const sectionMap = ['A', 'B', 'C', 'D'];
    return `${gradeMap[grade] || '?'}-${sectionMap[section] || '?'}`;
  }

  openAddModal(): void {
    this.attendance = this.getEmptyAttendance();
    this.isEditMode = false;
    this.showModal();
  }

  openEditModal(item: AttendanceDto): void {
    this.attendance = { ...item };
    this.isEditMode = true;
    this.showModal();
  }

  showModal(): void {
    const modalEl = document.getElementById('attendanceModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }

  submitAttendance(): void {
    if (this.isEditMode) {
      this.api.updateRequest(`Attendance/${this.attendance.id}`, this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          this.modal.hide();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.api.postRequest('Attendance', this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          this.modal.hide();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }
}
