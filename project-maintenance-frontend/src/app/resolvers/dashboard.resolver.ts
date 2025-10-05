import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ApisService } from "../service/apis.service";
import { catchError, forkJoin, Observable, of } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable({
    providedIn: 'root',
})
export class DashboardResolver implements Resolve<any> {
    constructor(private api: ApisService, private auth: AuthService) {}

    resolve(): Observable<any> {

        const methodName = this.auth.isResident() ? 'getAllRequestsOfResident' : 'getAllRequests';
        return forkJoin({
            residentCount: this.api.getResidentCount().pipe(
                catchError((error) => {
                    console.error('Error fetching the number of residents', error);
                    return of(null);
                })
            ),
            officerCount: this.api.getOfficerCount().pipe(
                catchError((error) => {
                    console.error('Error fetching the number of officers', error);
                    return of(null);
                })
            ),
            requestCount: this.api[methodName]().pipe(
                catchError((error) => {
                    console.error('Error fetching all the requests', error);
                    return of(null);
                })
            )
        });
    }
}