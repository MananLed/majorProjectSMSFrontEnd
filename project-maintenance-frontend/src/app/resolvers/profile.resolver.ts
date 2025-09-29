import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ApisService } from "../service/apis.service";
import { catchError, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
  constructor(private api: ApisService){}

  resolve(): Observable<any> {
    return this.api.profile().pipe(
      catchError(error => {
        console.error('Error fetching profile data', error);
        return of(null);
      })
    );
  }
}
