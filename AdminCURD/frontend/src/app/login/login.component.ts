import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs';



interface LoginInfo {
  email: string;
  password: string;
  ip_address?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formbulider = inject(FormBuilder)
  myform!: FormGroup;
  loginginfo?: LoginInfo
  isvalid = false
  userIp!: string;

  router = inject(Router)

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) {
    this.myform = this.formbulider.group({
      email: [''],
      password: ['']
    });
    this.getUserIp();
    this.getUserIp();
  }



  getUserIp() {
    this.http.get('https://jsonip.com/').subscribe(
      (res: any) => {
        this.userIp = res.ip;
        // console.log('User IP:', this.userIp);
      },
      (error) => {
        console.error('Error fetching IP:', error);
      }
    );

  }

  login(user: any) {
    this.loginService.login(user).subscribe((res: any) => {
      this.loginginfo = res

      localStorage.setItem("token", res.token)
      localStorage.setItem("id", res.id)
      localStorage.setItem("email", res.email)
      localStorage.setItem("name", res.name)
      // localStorage.setItem("ip", this.userIp)



      this.router.navigate(['/users']);

    }, (error: any) => {
      this.isvalid = true
    })
  }

  signin() {

    // this.getUserIp();
    


    console.log(this.userIp)
    this.loginginfo = {
      email: this.myform.value.email,
      password: this.myform.value.password,
      ip_address: this.userIp
    }
    const jsonString = JSON.stringify(this.loginginfo);
    const encodedData = btoa(jsonString);
    this.login({ encodedData })
  }
}
