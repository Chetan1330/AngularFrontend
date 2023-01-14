import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://137.184.119.178:8000/api/user';
const solutionUrl = 'http://137.184.119.178:8000/api/solution';
const analyzeUrl = 'http://137.184.119.178:8000/api/analyze';
const compareUrl = 'http://137.184.119.178:8000/api/compare';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  uploadsolution(data): Observable<any> {
    return this.http.post(solutionUrl, data);
  }

  getsolution(id): Observable<any> {
    return this.http.get(`${solutionUrl}/${id}`);
  }

  analyzesolution(data): Observable<any> {
    return this.http.post(analyzeUrl, data);
  }

  comparesolution(data): Observable<any> {
    return this.http.post(compareUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  
}
