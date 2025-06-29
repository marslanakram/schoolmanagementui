import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service'; // Import your LoaderService
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient, private loaderService: LoaderService) { }  // Inject LoaderService




  postRequest<T>(uri: string, payload: any): Observable<HttpResponse<T>> {
    this.loaderService.show();
    return this.http.post<T>(`${this.BASE_URL}/${uri}`, payload, { observe: 'response' })
      .pipe(finalize(() => this.loaderService.hide()));
  }





  getRequest<T>(uri: string, params?: any, autoHideLoader: boolean = true): Observable<HttpResponse<T>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    this.loaderService.show();

    return this.http.get<T>(`${this.BASE_URL}/${uri}`, { observe: 'response', params: httpParams })
      .pipe(
        finalize(() => {
          if (autoHideLoader) this.loaderService.hide();
        })
      );
  }

  updateRequest<T>(uri: string, data: any): Observable<HttpResponse<T>> {
    this.loaderService.show();
    return this.http.put<T>(`${this.BASE_URL}/${uri}`, data, { observe: 'response' })
      .pipe(finalize(() => this.loaderService.hide()));
  }

  patchRequest<T>(uri: string, data: any): Observable<HttpResponse<T>> {
    this.loaderService.show();
    return this.http.patch<T>(`${this.BASE_URL}/${uri}`, data, { observe: 'response' })
      .pipe(finalize(() => this.loaderService.hide()));
  }






  deleteRequest<T>(uri: string, data = {}): Observable<HttpResponse<T>> {
    this.loaderService.show();
    return this.http.delete<T>(`${this.BASE_URL}/${uri}`, { observe: 'response', body: data })
      .pipe(finalize(() => this.loaderService.hide()));
  }

}
