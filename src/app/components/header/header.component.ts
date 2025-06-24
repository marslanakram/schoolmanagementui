import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username?: string;
constructor(private router: Router) {}

  logout(): void {
    // Remove the JWT token or any session data
    localStorage.removeItem('token');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  
}
