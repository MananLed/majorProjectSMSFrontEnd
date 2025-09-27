import { Component, computed, Input, Signal, signal, WritableSignal } from '@angular/core';
import { TaskComponent } from "./task/task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  // @Input( {required: true}) name!: string;
  @Input() name?:string;
  // @Input() name: string | undefined;

}
