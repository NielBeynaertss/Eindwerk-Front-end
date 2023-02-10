import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  url: string = 'http://127.0.0.1:8000/api';
  leagues: any[] = [];


  constructor(private router: Router, private hhtp: HttpClient) { 

  }

  //Add a league to your favourite leagues  
  addFavourites(id: number) {
    let userId = window.localStorage.getItem('userId'); // code to get the current logged-in user ID
    console.log(userId);
    console.log(JSON.stringify({
      league_id: id,
      user_id: userId
    }));
    fetch(this.url + '/favourite_leagues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        league_id: id,
        user_id: userId
      })
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 201) {
          alert('Yay , You have selected a favorite');
        } else {
          alert('already selected this league');
        }
      });
  }

  //Register a user
  register(name: string, email: string, password: string) {

    console.log(JSON.stringify({
      name: name,
      email: email,
      password: password,
    }));
    fetch(this.url + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
      .then(response => {
        console.log(response.status);
        if (response.status == 201) {
          alert('Yay, you have been registered');
          this.router.navigate(['/']);
        } else {
          alert('Whoops, something went wrong');
        }
      })
  }


  getUsersFromApi(username: string, password: string) {
    console.log(username, password);
    fetch(this.url + '/users/' + username)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(data => {
        if (!data[0]) throw new Error("User not found");
        console.log(data[0].password);
        bcrypt.compare(password, data[0].password, (err, res) => {
          if (res) {
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('userId', data[0].id);
            if (data[0].profile) { window.localStorage.setItem('profile', data[0].profile) };
            this.router.navigate(['/secure']);
          } else {
            alert('Whoops, Something went wrong');
          }
        });
      })
      .catch(error => {
        if (error.message === "User not found") alert('User not found unable to login');
        else alert('Error, an error occured');
      });
  }



}