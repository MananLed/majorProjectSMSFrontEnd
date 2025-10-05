import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './dashboard/views/loader/loader.component';
import { LayoutComponent } from "./layout/layout.component";
import { AccessDeniedComponent } from "./dashboard/views/access-denied/access-denied.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, LayoutComponent, AccessDeniedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project-maintenance-frontend';
}
