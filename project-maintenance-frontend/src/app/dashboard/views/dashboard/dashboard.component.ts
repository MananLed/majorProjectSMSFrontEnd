import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../../service/auth.service';


@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ButtonModule, CommonModule, RouterModule, AvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  residentCount: any;
  officerCount: any;
  pendingRequestCount: any;
  approvedRequestCount: any;
  allRequestCount: any;
  userRole: string | null = null;
  isAdmin: boolean = false;
  isOfficer: boolean = false;
  isResident: boolean = false;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(){
    const dashboardData = this.route.snapshot.data['dashboardData'];
    this.residentCount = dashboardData.residentCount;
    this.officerCount = dashboardData.officerCount;
    this.allRequestCount = dashboardData.requestCount;
    this.pendingRequestCount = dashboardData.requestCount.data.Pending === null ? 0 : dashboardData.requestCount.data.Pending.length;
    this.approvedRequestCount = dashboardData.requestCount.data.Approved === null ?  0 :  dashboardData.requestCount.data.Approved.length;

    console.log('Resident Count: ', this.residentCount);
    console.log('Officer Count: ', this.officerCount);
    console.log('Request Count:', this.allRequestCount);
    console.log(this.pendingRequestCount)
    console.log(this.approvedRequestCount)


    if (this.auth.isLoggedIn()) {
      this.userRole = this.auth.getRole();
      this.isAdmin = this.auth.isAdmin();
      this.isOfficer = this.auth.isOfficer();
      this.isResident = this.auth.isResident();
    }
  }
}
