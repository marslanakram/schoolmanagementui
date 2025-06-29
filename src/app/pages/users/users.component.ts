import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserDTO } from 'src/app/interfaces/user.model';
declare var bootstrap: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserDTO[] = [];
  selectedUserId: number | null = null;
  deleteModal: any;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiRequestService.getRequest<UserDTO[]>('Users').subscribe({
      next: (response: HttpResponse<UserDTO[]>) => {
        this.users = response.body || [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  deleteUser(userId: number): void {
    this.selectedUserId = userId;
    const modalElement = document.getElementById('deleteUserModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedUserId) {
      this.apiRequestService.deleteRequest<any>(`Users/${this.selectedUserId}`)
        .subscribe({
          next: () => {
            this.loadUsers(); // Refresh the list after deletion
            if (this.deleteModal) {
              this.deleteModal.hide();
            }
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            if (this.deleteModal) {
              this.deleteModal.hide();
            }
          }
        });
    }
  }


}