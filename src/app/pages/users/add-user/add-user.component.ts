import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDTO } from 'src/app/interfaces/user.model';
import { HttpResponse } from '@angular/common/http';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: UserDTO = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    password: '',
    role: ''
  };

  isEditMode = false;
  userId: number | null = null;
  isLoading = false;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(userId: number): void {
    this.isLoading = true;
    this.apiRequestService.getRequest<UserDTO>(`Users/${userId}`).subscribe({
      next: (response: HttpResponse<UserDTO>) => {
        if (response.body) {
          this.user = response.body;
          // Format date for the input field
          if (this.user.dateOfBirth) {
            this.user.dateOfBirth = this.formatDateForInput(this.user.dateOfBirth);
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
        this.router.navigate(['/users']);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.userId) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    this.isLoading = true;
    const userToCreate = { ...this.user };
    
    this.apiRequestService.postRequest<UserDTO>('Users', userToCreate).subscribe({
      next: (response: HttpResponse<UserDTO>) => {
        this.isLoading = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.isLoading = false;
        alert('Error creating user. Please try again.');
      }
    });
  }

  updateUser(): void {
    if (!this.userId) return;
    
    this.isLoading = true;
    const userToUpdate = { ...this.user };
    
    this.apiRequestService.updateRequest<UserDTO>(`Users/${this.userId}`, userToUpdate).subscribe({
      next: (response: HttpResponse<UserDTO>) => {
        this.isLoading = false;
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.isLoading = false;
        alert('Error updating user. Please try again.');
      }
    });
  }

  private formatDateForInput(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      return date.toISOString().split('T')[0];
    } catch (e) {
      console.error('Error formatting date:', e);
      return '';
    }
  }
}