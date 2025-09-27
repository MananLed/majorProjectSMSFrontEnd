import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { ApisService } from '../service/apis.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-signup',
  imports: [
    InputTextModule,
    FloatLabel,
    FormsModule,
    TabsModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
  ],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
})
export class LoginSignupComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  mobile: string = '';
  flat: string = '';
  confirmPassword: string = '';

  constructor(private api: ApisService) {}

  onLogin() {
    console.log(this.email);
    console.log(this.password);

    this.api.login({
      email: this.email,
      password: this.password,
    }).subscribe((res :any) => {
      console.log(res);
    });
  }

  onRegister() {
    console.log('Registering:', {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      mobile: this.mobile,
      flatNumber: this.flat,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });

    this.api
      .signUp({
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        flat: this.flat,
        password: this.password,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
