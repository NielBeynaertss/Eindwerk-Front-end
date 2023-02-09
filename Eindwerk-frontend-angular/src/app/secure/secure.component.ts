import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent{


  userId: any;
  username: any;
  email:any;
  leagues: any[] = [];



  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService, private http: HttpClient) {
    this.userId = window.localStorage.getItem('userId');
    this.username = window.localStorage.getItem('username');
    this.email = window.localStorage.getItem('email');

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  url: string = 'http://127.0.0.1:8000/api';
  ngOnInit() {
    fetch(this.url + '/favourite_leagues/' + window.localStorage.getItem('userId'))
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.leagues = data.league_names.map((league: {league_name: string}) => league.league_name);
        console.log(data.league_names);
        this.leagues = data.league_names;
        console.log(this.leagues);
      });
      
      
      
  }
/*
  ngOnInit(){
    console.log(window.localStorage.getItem('userId'));
    this.profileService.getFavourites();
  }
*/
}
