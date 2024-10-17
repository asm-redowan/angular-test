import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    JsonPipe,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userIp?: string
  constructor(
    private http: HttpClient
  ){
    this.getUserIp()
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
}
