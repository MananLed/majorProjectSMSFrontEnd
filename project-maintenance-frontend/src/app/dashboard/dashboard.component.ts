import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Menu} from 'primeng/menu';
import { Menubar} from 'primeng/menubar';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ButtonModule, CommonModule, RouterModule, Menu, AvatarModule, Menubar, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  items: MenuItem[] = [];
  
    ngOnInit() {
      this.items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard']},
        { label: 'Service Requests', icon: 'pi pi-briefcase', routerLink: ['/dashboard/request'] },
        { label: 'User Management', icon: 'pi pi-users', routerLink: ['/dashboard/user-management'] },
        { label: 'Feedback', icon: 'pi pi-comment', routerLink: ['/dashboard/feedback'] },
        { label: 'Invoice', icon: 'pi pi-file', routerLink: ['/dashboard/invoice'] },
        { label: 'Notice', icon: 'pi pi-bell', routerLink: ['/dashboard/notice'] },
        { label: 'Profile', icon: 'pi pi-user', routerLink: ['/dashboard/profile'] }
      ];
    }
}
