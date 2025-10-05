import { HttpClient, HttpParams } from '@angular/common/http';
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

  getFeedbacks(): Observable<any>{
    return this.http.get(`${this.baseUrl}/feedbacks`);
  }

  getNotices(): Observable<any>{
    return this.http.get(`${this.baseUrl}/notices`);
  }

  getResidents(): Observable<any>{
    return this.http.get(`${this.baseUrl}/society/residents`);
  }

  getOfficers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/society/officers`);
  }

  getInvoices(): Observable<any>{
    const params = new HttpParams().set('year', '0');
    return this.http.get(`${this.baseUrl}/invoices/month-year`, {params});
  }

  putInvoice(invoice: {amount: number}): Observable<any>{
    return this.http.post(`${this.baseUrl}/invoices/issue`, invoice);
  }

  putNotice(notice: {content: string}): Observable<any>{
    return this.http.post(`${this.baseUrl}/notices/issue`, notice);
  }

  putOfficer(officer: {email: string, password: string}): Observable<any>{
    return this.http.post(`${this.baseUrl}/officers`, officer);
  }

  updateProfile(profile: {firstname: string, middlename: string, lastname: string, email: string, mobilenumber: string}): Observable<any>{
    return this.http.patch(`${this.baseUrl}/profile/update`, profile);
  }

  putFeedback(feedback: {rating: number, content: string}): Observable<any>{
    return this.http.post(`${this.baseUrl}/feedbacks`, feedback);
  }

  getResidentCount(): Observable<any>{
    return this.http.get(`${this.baseUrl}/society/residents/count`);
  }

  getOfficerCount(): Observable<any>{
    return this.http.get(`${this.baseUrl}/society/officers/count`);
  }

  getAllRequests(): Observable<any>{
    return this.http.get(`${this.baseUrl}/service/all`);
  }

  getAllRequestsOfResident(): Observable<any>{
    return this.http.get(`${this.baseUrl}/service/resident/all`);
  }

  updatePassword(passwordDetails: {oldPassword: string, newPassword: string}): Observable<any>{
    return this.http.patch(`${this.baseUrl}/profile/password`, passwordDetails);
  }

  getAvailableTimeSlots(serviceType: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/service/time-slots`, {
      params: {serviceType}
    });
  }

  deleteRequest(id: any): Observable<any>{
    const url = `${this.baseUrl}/service/cancel/${id}`;
    return this.http.delete(url);
  }
}
