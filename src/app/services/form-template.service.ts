import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {
  private apiUrl = 'https://127.0.0.1:8000/form-templates';

  constructor(private http: HttpClient) {}

  getFormTemplates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createFormTemplate(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  updateFormTemplate(template: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${template.id}`, template).pipe(
      catchError(this.handleError)
    );
  }

  deleteFormTemplate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addField(templateId: number, field: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${templateId}/fields`, field).pipe(
      catchError(this.handleError)
    );
  }

  updateField(templateId: number, fieldId: number, field: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${templateId}/fields/${fieldId}`, field).pipe(
      catchError(this.handleError)
    );
  }

  deleteField(templateId: number, fieldId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${templateId}/fields/${fieldId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
