import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-menu-item',
  imports: [MenuModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit{
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Service Requests', icon: 'pi pi-briefcase' },
      { label: 'User Management', icon: 'pi pi-users' },
      { label: 'Feedback', icon: 'pi pi-comment' },
      { label: 'Invoice', icon: 'pi pi-file' },
      { label: 'Notice', icon: 'pi pi-bell' },
      { label: 'Profile', icon: 'pi pi-user' }
    ];
  }
}
