import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from '../../services/api-request.service';
import { ClassDto } from 'src/app/interfaces/class.model';
import { TeacherDto } from 'src/app/interfaces/teacher.model';
declare var bootstrap: any;

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes: ClassDto[] = [];
  selectedClassId: number | null = null;
  teachers: TeacherDto[] = [];
  deleteModal: any;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadteachers()
  }

  loadClasses(): void {
    this.apiRequestService.getRequest<ClassDto[]>('Classes')
      .subscribe({
        next: (response: HttpResponse<ClassDto[]>) => {
          this.classes = response.body || [];
        },
        error: (error) => {
          console.error('Error fetching classes:', error);
        }
      });
  }

  deleteClass(classId: number): void {
    this.selectedClassId = classId;
    const modalElement = document.getElementById('deleteClassModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedClassId) {
      this.apiRequestService.deleteRequest(`Classes/${this.selectedClassId}`)
        .subscribe({
          next: () => {
            this.loadClasses();
            this.deleteModal?.hide();
          },
          error: (error) => {
            console.error('Error deleting class:', error);
            this.deleteModal?.hide();
          }
        });
    }
  }

  loadteachers(): void {
    this.apiRequestService.getRequest<TeacherDto[]>('Teacher').subscribe({
    next: (res) => {
      this.teachers = res.body || [];
    },
    error: (err) => console.error('Error loading tracher:', err)
  });
}


getTeacherNameById(teacherId: number): string {
  const found = this.teachers.find(cls => cls.id === teacherId);
  return found ? found.firstName +' '+ found.lastName : 'Unknown';
}
}
