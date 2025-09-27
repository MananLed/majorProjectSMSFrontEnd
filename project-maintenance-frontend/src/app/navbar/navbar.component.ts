import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent{}
