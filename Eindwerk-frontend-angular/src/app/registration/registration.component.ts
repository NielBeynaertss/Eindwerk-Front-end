import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string;
  password: string;
  email: string;
  
  constructor(private profileService: ProfileService) {
    this.name = '';
    this.password = '';
    this.email = '';
  }

  //Register function
  register() {
    console.log('name: ' + this.name);
    this.profileService.register(this.name, this.email, this.password)
  }

  ngOnInit(): void {
  }

}
