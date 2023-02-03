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

checkboxToURL = (coordinates: [number, number]) => {
  let checkboxes = document.querySelectorAll<HTMLInputElement>('.firstFilter input[type="checkbox"]');
  let filtersWith = '';
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      filtersWith += `${checkbox.value},`;
    }
  });

  let checkboxes2 = document.querySelectorAll<HTMLInputElement>('.secondFilter input[type="checkbox"]');
  let filters2With = '';
  checkboxes2.forEach((checkbox) => {
    if (checkbox.checked) {
      filters2With += `${checkbox.value},`;
    }
  });


  let checkbox3 = document.querySelector<HTMLInputElement>('.optFilter input[type="checkbox"]');
  let opt = 'no';
  if (checkbox3 && checkbox3.checked) {
    opt = "yes";
  }

  let filters = filtersWith.substring(0, filtersWith.length - 1);
  let filters2 = filters2With.substring(0, filters2With.length - 1);
  let radiusElement = document.getElementById('radius') as HTMLInputElement;
  let radius = '';
  if (radiusElement) {
    radius = radiusElement.value;
  }
  let geoapifyURL = `https://api.geoapify.com/v2/places?categories=${filters}&filter=circle:${coordinates},${radius}&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`;
  fetch(geoapifyURL)
    .then((response) => response.json())
  .then((data) => {
      let results = data.features;
      let div = document.getElementById("results");
      if (div) {
        div.innerHTML = '';
      }
      if (results.length == 0) {
        div.innerHTML = `<div>
                            <p>There are no results! Maybe increasing your radius will help getting a result</p>
                         </div>`;
      } else {
        data.features.forEach((item, index) => {
          let place_id = item.properties.place_id;
          let checkURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=b952ab1bdc9e4852942f8752e2155d9b`;
          detailsCheck(checkURL, filters2, opt)
            .then((filterCheck) => {
              if (filterCheck == true) {
let distance = getDistance(coordinates, item.properties.lat, item.properties.lon);
                let conditions = item.properties.categories;
                let detailURL = `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=51d3185c0772406c92f1907efa83798e`;
                
                div.innerHTML += `<div>
                  <h2>${item.properties.name}</h2>
                  <p>Adress: ${item.properties.address_line2}</p>
                  <p>Distance to stadium: ${distance}</p>
                                    <button id="button-details-${index}" onclick="fetchPlaceDetails('${detailURL}', ${index}, '${conditions}')">Details</button>
                                    <button class="invis" id="hide-details-${index}" onclick="hideDetails(${index})">Hide details</button>
                                    <div class="box invis" id="place-details-${index}"></div>
                                    </div>`;
                    div.innerHTML += template;
}
                if (div.innerHTML == '') {
                    let template = `<div>
                                    <p>There are no results matching your requirements. Please increase the radius or remove some filters to get a result!</p>
                                    </div>`;
                    div.innerHTML += template;
                }
            });
        })
    }
    })
    .catch(error => {
        const input = document.getElementById('rad');
        if (!input || !input.value) {
            alert("Please fill in the radius")
            return;
          }
        console.error(error);
    });
}
