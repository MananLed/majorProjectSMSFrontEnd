// import {NgModule} from '@angular/core';
// import { AppComponent } from './app.component';
// import { BrowserModule } from '@angular/platform-browser';

// @NgModule({
//     declarations: [AppComponent],
//     bootstrap: [AppComponent],
//     imports: [BrowserModule]
// })
// export class AppModule {}

import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { PipeComponent } from "./pipe/pipe.component";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [BrowserModule, PipeComponent]
})
export class AppModule {}