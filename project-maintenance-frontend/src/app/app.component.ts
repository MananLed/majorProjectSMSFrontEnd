import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceRequestsComponent } from "./dashboard/views/service-requests/service-requests.component";
import { UserManagementComponent } from "./dashboard/views/user-management/user-management.component";
import { FeedbackComponent } from "./dashboard/views/feedback/feedback.component";
import { InvoiceComponent } from "./dashboard/views/invoice/invoice.component";
import { NoticeComponent } from "./dashboard/views/notice/notice.component";
import { ProfileComponent } from "./dashboard/views/profile/profile.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginSignupComponent, NavbarComponent, MenuItemComponent, DashboardComponent, ServiceRequestsComponent, UserManagementComponent, FeedbackComponent, InvoiceComponent, NoticeComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project-maintenance-frontend';
}
