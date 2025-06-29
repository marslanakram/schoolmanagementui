import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { TeacherDto } from 'src/app/interfaces/teacher.model'; // adjust path if needed
import { UserDTO } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  teacher: TeacherDto = {
    id: 0,
    userId: 0,
    teacherId: '',
    firstName: '',
    lastName: '',
    hireDate: '',
    specialization: '',
    phoneNumber: '',
    email: '',
    address: '',
    qualifications: '',
    bio: '',
    gender: '',
    photoUrl: '',
    isActive: true,
    endDate: ''
  };

  isEditMode = false;
  teacherId: number | null = null;
   users: UserDTO[] = [];
  isLoading = false;

  constructor(
    private apiRequestService: ApiRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.teacherId = +params['id'];
        this.loadTeacherData(this.teacherId);
      }
    });
  }

    loadUsers(): void {
    this.apiRequestService.getRequest<UserDTO[]>('Users').subscribe({
      next: (response: HttpResponse<UserDTO[]>) => {
        this.users = response.body || [];
      },
      error: err => console.error('Failed to load users', err)
    });
  }

  loadTeacherData(id: number): void {
    this.isLoading = true;
    this.apiRequestService.getRequest<TeacherDto>(`Teacher/${id}`).subscribe({
      next: (response: HttpResponse<TeacherDto>) => {
        if (response.body) {
          this.teacher = response.body;

          // Format ISO dates for <input type="date">
          if (this.teacher.hireDate) {
            this.teacher.hireDate = this.formatDateForInput(this.teacher.hireDate);
          }
          if (this.teacher.endDate) {
            this.teacher.endDate = this.formatDateForInput(this.teacher.endDate);
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading teacher:', err);
        this.isLoading = false;
        this.router.navigate(['/teachers']);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.teacherId) {
      this.updateTeacher();
    } else {
      this.createTeacher();
    }
  }

  createTeacher(): void {
    this.isLoading = true;
    const teacherToCreate = { 
      ...this.teacher,
      endDate: this.teacher.endDate === '' ? null : this.teacher.endDate
     };

    this.apiRequestService.postRequest<TeacherDto>('Teacher', teacherToCreate).subscribe({
      next: (response: HttpResponse<TeacherDto>) => {
        this.isLoading = false;
        this.router.navigate(['/teachers']);
      },
      error: (err) => {
        console.error('Error creating teacher:', err);
        this.isLoading = false;
        alert('Error creating teacher. Please try again.');
      }
    });
  }

  updateTeacher(): void {
    if (!this.teacherId) return;

    this.isLoading = true;
    const teacherToUpdate = { ...this.teacher,
      endDate: this.teacher.endDate === '' ? null : this.teacher.endDate
     };

    this.apiRequestService.updateRequest<TeacherDto>(`Teacher/${this.teacherId}`, teacherToUpdate).subscribe({
      next: (response: HttpResponse<TeacherDto>) => {
        this.isLoading = false;
        this.router.navigate(['/teachers']);
      },
      error: (err) => {
        console.error('Error updating teacher:', err);
        this.isLoading = false;
        alert('Error updating teacher. Please try again.');
      }
    });
  }

  private formatDateForInput(dateStr: string): string {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }
}
