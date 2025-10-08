import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoaderComponent } from '../loader/loader.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ApisService } from '../../../service/apis.service';
import { Tooltip } from 'primeng/tooltip';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    FormsModule,
    DialogModule,
    LoaderComponent,
    InputTextModule,
    FloatLabelModule,
    Tooltip,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userDetails!: any;
  isFetching = signal(false);
  visible: boolean = false;
  visibleChangePassword: boolean = false;
  visibleDeleteProfile: boolean = false;

  firstname: any = '';
  middlename: any = '';
  lastname: any = '';
  mobile: any = '';
  email: any = '';

  oldpassword: any = '';
  newpassword: any = '';
  confirmpassword: any = '';

  constructor(private route: ActivatedRoute, private api: ApisService, private routes: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.userDetails = this.route.snapshot.data['userData'];
    console.log(this.userDetails);
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  showDialogChangePassword() {
    this.visibleChangePassword = true;
  }

  hideDialogChangePassword() {
    this.visibleChangePassword = false;
  }

  showDialogDeleteProfile(){
    this.visibleDeleteProfile = true;
  }

  hideDialogDeleteProfile(){
    this.visibleDeleteProfile = false;
  }

  fetchProfile(): void {
    this.api.profile().subscribe({
      next: (res) => {
        this.userDetails = res;
      },
      error: (err) => {
        console.error('Error fetching the profile details:', err);
      },
    });
  }

  updateProfile(): void {
    this.isFetching.set(true);

    if (
      this.firstname === '' &&
      this.middlename === '' &&
      this.lastname === '' &&
      this.mobile === '' &&
      this.email === ''
    ) {
      this.isFetching.set(false);
      return;
    }

    this.api
      .updateProfile({
        firstname: String(this.firstname),
        middlename: String(this.middlename),
        lastname: String(this.lastname),
        email: String(this.email),
        mobilenumber: String(this.mobile),
      })
      .subscribe({
        next: (res) => {
          this.fetchProfile();
          this.visible = false;
          this.firstname = '';
          this.middlename = '';
          this.lastname = '';
          this.mobile = '';
          this.email = '';
          this.isFetching.set(false);
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error updating the profile: ', err);
        },
      });
  }

  updatePassword() {

    if(this.newpassword !== this.confirmpassword){
      return;
    }

    this.isFetching.set(true);

    if (this.oldpassword === '' || this.newpassword === '') {
      this.isFetching.set(false);
      return;
    }

    this.api
      .updatePassword({
        oldPassword: String(this.oldpassword),
        newPassword: String(this.newpassword),
      })
      .subscribe({
        next: (res) => {
          this.visibleChangePassword = false;
          this.oldpassword = '';
          this.newpassword = '';
          this.isFetching.set(false);
          this.auth.logoutUser();
          this.routes.navigate(['/login']);
        },
        error: (err) => {
          this.isFetching.set(false);
          console.error('Error updating the password: ', err);
        },
      });
  }

  deleteProfile():void{
    this.isFetching.set(true);
    this.api.deleteProfile().subscribe({
      next: (res) => {
        this.isFetching.set(false);
        this.auth.logoutUser();
        this.routes.navigate(['/login']);
      },
      error: (err) => {
        this.isFetching.set(false);
        console.error('Error deleting profile:', err);
      }
    });
  }
}
