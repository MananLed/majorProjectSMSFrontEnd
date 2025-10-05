import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
// import { NgIf } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../service/auth.service';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { ApisService } from '../../../service/apis.service';

@Component({
  selector: 'app-feedback',
  imports: [
    TableModule,
    ButtonModule,
    NgIf,
    NgFor,
    Tooltip,
    DialogModule,
    AutoCompleteModule,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent implements OnInit {
  userFeedback: any;
  userRole: string | null = null;
  isAdmin: boolean = false;
  isOfficer: boolean = false;
  isResident: boolean = false;
  isFetching = signal(false);
  content!: string;
  rating!: number;
  filteredRatings!: any[];

  constructor(private route: ActivatedRoute, private auth: AuthService, private api:ApisService) {}

  private allRatings = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
  ];

  ngOnInit(): void {
    this.userFeedback = this.route.snapshot.data['userFeedback'];
    console.log(this.userFeedback);
    this.userRole = this.auth.getRole();
    this.isAdmin = this.auth.isAdmin();
    this.isOfficer = this.auth.isOfficer();
    this.isResident = this.auth.isResident();
    this.filteredRatings = this.allRatings;
  }

  filterRating(event: any) {
    const query = event.query;
    this.filteredRatings = this.allRatings.filter((rating) =>
      rating.label.toString().includes(query)
    );
  }

  fetchFeedbacks(): void{
    this.api.getFeedbacks().subscribe({
      next: (res) => {
        this.userFeedback = res;
      },
      error: (err) => {
        console.error('Error fetching feedbacks:', err);
      },
    });
  }

  addFeedback(): void{
    this.isFetching.set(true);

    if(this.rating < 1 || this.rating > 5) return;

    this.api.putFeedback({rating: this.rating, content: this.content}).subscribe({
      next: (res) => {
        this.fetchFeedbacks();
        this.content = '';
        this.rating = 5;
        this.isFetching.set(false);
      },
      error: (err) => {
        this.isFetching.set(false);
        console.error('Error adding feedback:', err);
      },
    });
  }
}
