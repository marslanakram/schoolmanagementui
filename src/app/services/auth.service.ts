import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.BASE_URL}/Auth/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password });
  }

    getCurrentUser(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
