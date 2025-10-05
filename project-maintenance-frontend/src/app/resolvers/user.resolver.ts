import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApisService } from '../service/apis.service';
import { catchError, forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<any> {
  constructor(private api: ApisService) {}

  resolve(): Observable<any> {
    return forkJoin({
      residentDetails: this.api.getResidents().pipe(
        catchError((error) => {
          console.error('Error fetching resident details', error);
          return of(null);
        })
      ),
      officerDetails: this.api.getOfficers().pipe(
        catchError((error) => {
          console.error('Error fetching officer details', error);
          return of(null);
        })
      ),
    });
  }
}
