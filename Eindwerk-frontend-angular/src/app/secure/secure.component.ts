import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

  newChat: string;
  _messages: any;
  userId: any;
  username: any;
  userQuote: string;
  profile: any;
  _emoticons: any;
  showEmoticons: boolean;

  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private chatService: ChatService) {
    this.newChat = '';
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
    this.profile = window.localStorage.getItem('profile') ? window.localStorage.getItem('profile') : 'assets/219988.png';
    this.userQuote = '';
    this.showEmoticons = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
