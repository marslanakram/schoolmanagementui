import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  username?: string;
constructor(private router: Router,private translate: TranslateService) {}

  logout(): void {
    // Remove the JWT token or any session data
    localStorage.removeItem('token');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }

    switchLang(lang: string) {
    this.translate.use(lang);
  }
  
}
