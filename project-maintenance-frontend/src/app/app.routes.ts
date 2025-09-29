import { Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { ProfileResolver } from './resolvers/profile.resolver';


export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./login-signup/login-signup.component').then(c => c.LoginSignupComponent) },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout/layout.component').then(c => c.LayoutComponent),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
            import('./dashboard/views/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'request',
        loadComponent: () =>
          import('./dashboard/views/service-requests/service-requests.component')
            .then(c => c.ServiceRequestsComponent)
      },
      {
        path: 'user-management',
        loadComponent: () =>
          import('./dashboard/views/user-management/user-management.component')
            .then(c => c.UserManagementComponent)
      },
      {
        path: 'feedback',
        loadComponent: () =>
            import('./dashboard/views/feedback/feedback.component')
             .then(c => c.FeedbackComponent)
      },
      {
        path: 'invoice',
        loadComponent:  () =>
            import('./dashboard/views/invoice/invoice.component')
              .then(c => c.InvoiceComponent)
      },
      {
        path: 'notice',
        loadComponent: () =>
            import('./dashboard/views/notice/notice.component')
              .then(c => c.NoticeComponent)
      },
      {
        path: 'profile',
        loadComponent: () => 
            import('./dashboard/views/profile/profile.component')
              .then(c => c.ProfileComponent),
            resolve: {
                userData: ProfileResolver
            }
      }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];