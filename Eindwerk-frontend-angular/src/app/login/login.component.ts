import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private profileService: ProfileService, private router: Router)  { 
    this.username = '';
    this.password = '';
  }

  login() {
   this.profileService.getUsersFromApi(this.username, this.password);
  }


  ngOnInit(): void {
  }
}
