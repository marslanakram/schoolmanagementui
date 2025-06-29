import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from '../../services/api-request.service';
import { TeacherDto } from 'src/app/interfaces/teacher.model';
declare var bootstrap: any;

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachers: TeacherDto[] = [];
  selectedTeacherId: number | null = null;
  deleteModal: any;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.apiRequestService.getRequest<TeacherDto[]>('Teacher')
      .subscribe({
        next: (response: HttpResponse<TeacherDto[]>) => {
          this.teachers = response.body || [];
        },
        error: (error) => {
          console.error('Error fetching teachers:', error);
        }
      });
  }

  deleteTeacher(id: number): void {
    this.selectedTeacherId = id;
    const modalElement = document.getElementById('deleteTeacherModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedTeacherId) {
      this.apiRequestService.deleteRequest(`Teachers/${this.selectedTeacherId}`)
        .subscribe({
          next: () => {
            this.loadTeachers();
            this.deleteModal?.hide();
          },
          error: (error) => {
            console.error('Error deleting teacher:', error);
            this.deleteModal?.hide();
          }
        });
    }
  }
}
