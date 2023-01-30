import { Component } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  button: any;
  opt: any;
  resultsButton: any;
  fnlAPI: any;
  finalCoordinates: string | void = '';

  ngOnInit() {
    this.fetchFootballAPI()
      .then(coordinates => {
        this.finalCoordinates = coordinates;
  
        this.button = document.getElementById('showDropdown');
        this.opt = document.getElementById('mainMenu');
        this.resultsButton = document.getElementById('res');
        this.fnlAPI = document.getElementById("finalAPI");
          
        this.opt.style.display = "block";
        this.button.style.display = "block";
        this.fnlAPI.style.display = "none";
          
        this.resultsButton.addEventListener('click', () => {
          this.checkboxToURL(this.finalCoordinates);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchFootballAPI() {
    return fetch('https://soccer.sportmonks.com/api/v2.0/fixtures/18531230?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5')
    .then(response => response.json())
    .then(data => {
        let venueId: number = data.data.venue_id;
        return fetch(`https://soccer.sportmonks.com/api/v2.0/venues/${venueId}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5`)
            .then(response => response.json())
            .then(data => {
                let wrongCoordinates = data.data.coordinates;
                let [lat, lon] = wrongCoordinates.split(',');
                let coordinates = `${lon},${lat}`;
                return coordinates;
                });
    })
    .catch(error => {
        console.error(error);
    });
}

}
