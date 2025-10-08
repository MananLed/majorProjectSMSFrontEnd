import { Component, signal } from '@angular/core';
import { LoaderComponent } from "./loader/loader.component";
import { catchError, delay, finalize, interval, of, retry, switchMap, take, tap, throwError } from 'rxjs';
import { Loader2Component } from './loader2/loader2.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, Loader2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // title = 'binding-practice';
  // userName = 'Ninja';

  // messageFromChild = '';

  // onMessageRecieved(message: string){
  //   this.messageFromChild = message;
  // }

  status: string = 'not connected';
  clickable: boolean = true;

  isFetching = signal<boolean>(false);
  isFetching2 = signal<boolean>(false);

  startFirstLoader(){
    this.isFetching.set(true);
    setTimeout(() => {this.isFetching.set(false); this.status = 'syncing'; this.tryConnecting()}, 5000);
  }



  tryConnecting(){
    interval(1000).pipe(
      take(6),
      tap(count => {
        this.isFetching2.set(true);
        console.log('Attempt', count + 1);
        setTimeout(() => this.isFetching2.set(false), 500);
      }),
      finalize(() => {
        this.isFetching2.set(false);
        this.clickable = false;
        this.status = 'Connected';
      })
    ).subscribe();
  }

}
