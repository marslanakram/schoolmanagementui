import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from '../../services/api-request.service';
import { StudentDto } from 'src/app/interfaces/student.model';
import { ClassDto } from 'src/app/interfaces/class.model';
declare var bootstrap: any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: StudentDto[] = [];
  selectedStudentId: number | null = null;
  classes: ClassDto [] = [];
  deleteModal: any;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadClasses();
  }

  loadStudents(): void {
    this.apiRequestService.getRequest<StudentDto[]>('Students')
      .subscribe({
        next: (response: HttpResponse<StudentDto[]>) => {
          this.students = response.body || [];
        },
        error: (error) => {
          console.error('Error fetching students:', error);
        }
      });
  }

  deleteStudent(studentId: number): void {
    this.selectedStudentId = studentId;
    const modalElement = document.getElementById('deleteStudentModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedStudentId) {
      this.apiRequestService.deleteRequest<any>(`Students/${this.selectedStudentId}`)
        .subscribe({
          next: () => {
            this.loadStudents();
            if (this.deleteModal) {
              this.deleteModal.hide();
            }
          },
          error: (error) => {
            console.error('Error deleting student:', error);
            if (this.deleteModal) {
              this.deleteModal.hide();
            }
          }
        });
    }
  }


loadClasses(): void {
  this.apiRequestService.getRequest<ClassDto[]>('Classes').subscribe({
    next: (res) => {
      this.classes = res.body || [];
    },
    error: (err) => console.error('Error loading classes:', err)
  });
}

getClassNameById(classId: number): string {
  const found = this.classes.find(cls => cls.id === classId);
  return found ? found.name : 'Unknown';
}
}
