import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

  userId: any;
  username: any;


  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) {
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
