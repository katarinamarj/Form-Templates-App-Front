import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api/hello'; 

  constructor(private http: HttpClient) {}

  getHelloMessage(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(this.apiUrl);
  }
}
