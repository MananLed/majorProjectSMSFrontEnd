import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { LoaderComponent } from '../loader/loader.component';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ApisService } from '../../../service/apis.service';
import { InputTextModule } from 'primeng/inputtext';
import { Tooltip } from "primeng/tooltip";
import { Avatar } from "primeng/avatar";

@Component({
  selector: 'app-user-management',
  imports: [CardModule, TabsModule, TableModule, ButtonModule, NgIf, NgFor, DialogModule, LoaderComponent, FormsModule, FloatLabel, FloatLabelModule, InputTextModule, Tooltip, Avatar],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  visible: boolean = false;
  isFetching = signal(false);

  residentDetails: any;
  officerDetails: any;

  noOfResidents!: number;
  noOfOfficers!: number;

  officerEmail: string = '';
  officerPassword: string = '';

  constructor(private route: ActivatedRoute, private api: ApisService) {}

  ngOnInit(): void{
    const societyData = this.route.snapshot.data['societyData'];
    this.residentDetails = societyData.residentDetails;
    this.officerDetails = societyData.officerDetails;

    console.log('Resident details: ', this.residentDetails);
    console.log('Officer Details: ', this.officerDetails);

    this.noOfResidents = this.residentDetails.data.length;
    this.noOfOfficers = this.officerDetails.data.length;
  }

  showDialog() {
        this.visible = true;
    }

    hideDialog(){
      this.visible = false;
    }

    fetchOfficers(): void {
      this.api.getOfficers().subscribe({
        next: (res) => {
          this.officerDetails = res;
          this.noOfOfficers = res.data.length;
        },
        error: (err) => {
          console.error('Error fetching the details of officers:', err);
        }
      });
    }

    fetchResidents(): void{
      this.api.getResidents().subscribe({
        next: (res) => {
          this.residentDetails = res;
          this.noOfResidents = res.data.length;
        },
        error: (err) => {
          console.error('Error fetching the details of residents:', err);
        }
      });
    }

    addOfficer(): void{
      this.isFetching.set(true);

      if(this.officerEmail === '' || this.officerPassword === ''){
        this.isFetching.set(false);
        return;
      }
      
      this.api.putOfficer({email: this.officerEmail, password: this.officerPassword}).subscribe({
        next: (res) => {
          this.fetchOfficers();
          this.visible = false;
          this.officerEmail = '';
          this.officerPassword = '';
          this.isFetching.set(false);
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error adding officer to the system:', err);
        }
      });

    }

    deleteResident(residentID: any){
      this.isFetching.set(true);
        this.api.deleteResident(residentID).subscribe({
            next: (res) => {
              this.fetchResidents();
              this.isFetching.set(false);
            },
            error: (err) => {
              this.isFetching.set(false);
              console.error('Error deleting resident:', err);
            }
        });
    }

    deleteOfficer(officerID: any){
      this.isFetching.set(true);
      this.api.deleteOfficer(officerID).subscribe({
          next: (res) => {
            this.fetchOfficers();
            this.isFetching.set(false);
          },
          error: (err) => {
            this.isFetching.set(false);
            console.error('Error deleting officer:', err);
          }
      });
    }
}
