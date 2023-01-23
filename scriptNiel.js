//Fetch available leagues and display them --------------------------------------------------------------------------------------
let url = `https://soccer.sportmonks.com/api/v2.0/leagues?api_token=1duNg3kFH9BpL5Y01Zn4PZtQvEQSrU6FVEs5N5LtRduMLdYNFGVIbS1Wg8qA`;

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(data => {
    let leaguecontainer = document.getElementById("leagues-container");
    data.data.forEach(league => {
      let leagueName = league.name;
      let leagueLogo = league.logo_path;
      let leagueElement = `
      <div class="card" style="width: 18rem;">
        <img src="${leagueLogo}" class="card-img-top card_img_style" alt="${leagueName}">
        <div class="card-body text-center">
          <h5 class="card-title">${leagueName}</h5>
          <a href="#" class="btn btn-primary">Get fixtures</a>
        </div>
      </div>
      `;
      leaguecontainer.innerHTML += leagueElement;
    });
  })
  .catch(error => {
    console.error(error);
  });




//Fetch fixtures and display them -------------------------------------------------------------------------------------------------

  let fixedstartDate = "2022-01-01"
  let fixedendDate = "2022-01-31"
  let urlFixtures = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/2022-01-01/2022-01-31?api_token=gesuGMyeJBFXgInr0RYtC94maOJarwO8caWFzbiVEILbmysq6XgTeiEyoqvs`;

  fetch(urlFixtures)
  .then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    let fixturecontainer = document.getElementById("fixtures-container");
    data.data.forEach(fixture => {
      let fixture_hometeam_id = fixture.localteam_id;
      let fixture_awayteam_id = fixture.visitorteam_id;
      
      // Make an additional API call to retrieve the name of the home team
      let urlHomeTeam = `https://soccer.sportmonks.com/api/v2.0/teams/${fixture_hometeam_id}?api_token=StcCBMmkbqygydB9y6ryx0EZQWHxhqYy6qHizL0twlZwlRgdqgbDTgrfihim`;
      fetch(urlHomeTeam)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let homeTeamName = data.name;
          let fixtureElement = 
          `
          <b>${homeTeamName}</b>vs<b>${fixture_awayteam_id}</b><br>
          `;
          fixturecontainer.innerHTML += fixtureElement;
        })
        .catch(error => console.log(error));
    });
  })
  .catch(error => {
    console.log(error);
  });







  let team = 'https://soccer.sportmonks.com/api/v2.0/teams/{ID}?api_token=1duNg3kFH9BpL5Y01Zn4PZtQvEQSrU6FVEs5N5LtRduMLdYNFGVIbS1Wg8qA'