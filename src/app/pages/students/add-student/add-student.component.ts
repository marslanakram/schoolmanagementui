import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { StudentDto } from 'src/app/interfaces/student.model';



@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  student: StudentDto = {
    id: 0,
    rollNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    guardianName: '',
    guardianContact: '',
    enrollmentDate: '',
    isActive: true,
    photoUrl: '',
    currentClassId: 0
  };

  isEditMode = false;
  studentId: number | null = null;
  isLoading = false;
  classes: any[] = [];

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        this.loadStudentData(this.studentId);
      }
    });

    this.loadClasses();
  }

  loadStudentData(studentId: number): void {
    this.isLoading = true;
    this.apiRequestService.getRequest<StudentDto>(`Students/${studentId}`).subscribe({
      next: (response: HttpResponse<StudentDto>) => {
        if (response.body) {
          this.student = response.body;
          this.student.dateOfBirth = this.formatDateForInput(this.student.dateOfBirth);
          this.student.enrollmentDate = this.formatDateForInput(this.student.enrollmentDate);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/students']);
      }
    });
  }

  loadClasses(): void {
    this.apiRequestService.getRequest<any[]>('Classes').subscribe({
      next: (response) => {
        this.classes = response.body || [];
      },
      error: (error) => {
        console.error('Error loading classes:', error);
      }
    });
  }

  onSubmit(): void {
    this.isEditMode ? this.updateStudent() : this.createStudent();
  }

  createStudent(): void {
    this.isLoading = true;
    this.apiRequestService.postRequest<StudentDto>('Students', this.student).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/students']);
      },
      error: () => {
        this.isLoading = false;
        alert('Error creating student.');
      }
    });
  }

  updateStudent(): void {
    if (!this.studentId) return;
    this.isLoading = true;
    this.apiRequestService.updateRequest<StudentDto>(`Students/${this.studentId}`, this.student).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/students']);
      },
      error: () => {
        this.isLoading = false;
        alert('Error updating student.');
      }
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
  }
}
