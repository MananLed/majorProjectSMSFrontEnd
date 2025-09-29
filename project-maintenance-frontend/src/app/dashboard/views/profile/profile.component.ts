import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Button } from "primeng/button";

@Component({
  selector: 'app-profile',
  imports: [Button],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
   userDetails: any;

   constructor(private route: ActivatedRoute) {}

   ngOnInit(): void{
      this.userDetails = this.route.snapshot.data['userData'];
      console.log(this.userDetails);
   }
}
