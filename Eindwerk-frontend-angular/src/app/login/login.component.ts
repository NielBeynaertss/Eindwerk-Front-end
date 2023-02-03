import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private chatService: ChatService, private router: Router)  { 
    this.username = '';
    this.password = '';
  }

  login() {
   this.chatService.getUsersFromApi(this.username, this.password);
  }


  ngOnInit(): void {
  }
}
