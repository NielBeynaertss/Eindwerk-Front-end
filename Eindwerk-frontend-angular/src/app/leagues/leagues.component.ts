import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {

  constructor(private http: HttpClient) {}

  leagues: any;

  ngOnInit() {
    let url = `https://soccer.sportmonks.com/api/v2.0/leagues?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;
    this.http.get(url).subscribe(data => {
      this.leagues = data;
    });
  }

}

