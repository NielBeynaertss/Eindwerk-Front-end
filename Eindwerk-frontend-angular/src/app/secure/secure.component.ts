import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

  userId: any;
  username: any;
  email:any;


  constructor(private authService: AuthService, private router: Router) {
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
    this.email = window.localStorage.getItem('email');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
