import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient) {

  }

  signUp(userData :User): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  login(userData :LoginUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  profile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`);
  }
}
