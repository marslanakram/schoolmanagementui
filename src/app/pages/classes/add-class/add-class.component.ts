import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { ClassDto } from 'src/app/interfaces/class.model';
import { TeacherDto } from 'src/app/interfaces/teacher.model';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  classData: ClassDto = {
    id: 0,
    name: '',
    description: '',
    academicYear: new Date().getFullYear(),
    gradeLevel: 0,
    section: 0,
    startDate: '',
    endDate: '',
    homeroomTeacherId: 0,
    isActive: true
  };

  isEditMode = false;
  classId: number | null = null;
  isLoading = false;

  gradeLevels = [
    { value: 0, label: 'Play Group' },
    { value: 1, label: 'Nursery' },
    { value: 2, label: 'Prep / KG' },
    { value: 3, label: '1st' },
    { value: 4, label: '2nd' },
    { value: 5, label: '3rd' },
    { value: 6, label: '4th' },
    { value: 7, label: '5th' },
    { value: 8, label: '6th' },
    { value: 9, label: '7th' },
    { value: 10, label: '8th' },
    { value: 11, label: '9th' },
    { value: 12, label: '10th' },
    { value: 13, label: '11th (First Year)' },
    { value: 14, label: '12th (Second Year)' }
  ];

  sections = [
    { value: 0, label: 'A' },
    { value: 1, label: 'B' },
    { value: 2, label: 'C' },
    { value: 3, label: 'D' }
  ];

  teachers: TeacherDto[] = [];

  constructor(
    private apiRequestService: ApiRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTeachers();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.classId = +params['id'];
        this.loadClassData(this.classId);
      }
    });
  }

  loadClassData(id: number): void {
    this.isLoading = true;
    this.apiRequestService.getRequest<ClassDto>(`Classes/${id}`).subscribe({
      next: (response: HttpResponse<ClassDto>) => {
        if (response.body) {
          this.classData = response.body;
          this.classData.startDate = this.formatDateForInput(this.classData.startDate);
          this.classData.endDate = this.formatDateForInput(this.classData.endDate);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading class:', err);
        this.isLoading = false;
        this.router.navigate(['/classes']);
      }
    });
  }

  loadTeachers(): void {
    this.apiRequestService.getRequest<TeacherDto[]>(`Teacher`).subscribe({
      next: (response: HttpResponse<TeacherDto[]>) => {
        this.teachers = response.body || [];
      },
      error: (err) => {
        console.error('Error loading teachers:', err);
      }
    });
  }

  onSubmit(): void {
    this.isEditMode && this.classId ? this.updateClass() : this.createClass();
  }

  createClass(): void {
    this.isLoading = true;
    debugger
    this.apiRequestService.postRequest<ClassDto>('Classes', this.classData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/classes']);
      },
      error: (err) => {
        console.error('Error creating class:', err);
        this.isLoading = false;
        alert('Error creating class. Please try again.');
      }
    });
  }

  updateClass(): void {
    if (!this.classId) return;
    this.isLoading = true;
    this.apiRequestService.updateRequest<ClassDto>(`Classes/${this.classId}`, this.classData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/classes']);
      },
      error: (err) => {
        console.error('Error updating class:', err);
        this.isLoading = false;
        alert('Error updating class. Please try again.');
      }
    });
  }

  private formatDateForInput(dateStr: string): string {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  }
}
