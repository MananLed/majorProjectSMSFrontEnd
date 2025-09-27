import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-user-management',
  imports: [CardModule, TabsModule, TableModule, ButtonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {

}
