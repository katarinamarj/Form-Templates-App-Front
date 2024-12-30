import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {
  private apiUrl = 'https://127.0.0.1:8000/form-templates'; 

  constructor(private http: HttpClient) { }

  getFormTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching templates:', error);
        return throwError(() => new Error('Failed to fetch templates'));
      })
    );
  }
  
  createFormTemplate(data: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateFormTemplate(template: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${template.id}`, template);
  }
  
  deleteFormTemplate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error fetching templates:', error);
    return throwError(() => new Error('Failed to fetch templates'));
  }

  
}
