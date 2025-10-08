import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-parent',
  imports: [],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {
  @Input() name: string = '';
  @Output() messageEvent: EventEmitter<string> = new EventEmitter<string>();

  sendMessageToParent(){
    this.messageEvent.emit("Hello");
  }
}
