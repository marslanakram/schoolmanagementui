import { Component, OnInit } from '@angular/core';
import { SubjectDto } from 'src/app/interfaces/subject.model';
import { ApiRequestService } from 'src/app/services/api-request.service';
declare var bootstrap: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: SubjectDto[] = [];
  subject: SubjectDto = this.getEmptySubject();
  isEditMode = false;
  modal: any;

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  getEmptySubject(): SubjectDto {
    return {
      id: 0,
      name: '',
      code: '',
      description: ''
    };
  }

  loadSubjects(): void {
    this.api.getRequest<SubjectDto[]>('Subject').subscribe({
      next: (res) => (this.subjects = res.body || []),
      error: (err) => console.error('Error loading subjects:', err)
    });
  }

  openAddModal(): void {
    this.subject = this.getEmptySubject();
    this.isEditMode = false;
    this.showModal();
  }

  openEditModal(item: SubjectDto): void {
    this.subject = { ...item };
    this.isEditMode = true;
    this.showModal();
  }

  showModal(): void {
    const modalEl = document.getElementById('subjectModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
      this.modal.show();
    }
  }

  submitSubject(): void {
    if (this.isEditMode) {
      this.api.updateRequest(`Subject/${this.subject.id}`, this.subject).subscribe({
        next: () => {
          this.loadSubjects();
          this.modal.hide();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.api.postRequest('Subject', this.subject).subscribe({
        next: () => {
          this.loadSubjects();
          this.modal.hide();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.api.deleteRequest(`Subject/${id}`).subscribe({
        next: () => this.loadSubjects(),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}