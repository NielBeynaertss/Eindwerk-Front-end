
//Fetch available leagues and display them --------------------------------------------------------------------------------------
let url = `https://soccer.sportmonks.com/api/v2.0/leagues?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;

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
          <a href="fixturesNiel.html" class="btn btn-primary">Get fixtures</a>
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

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function(){
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let urlFixtures = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/${startDate}/${endDate}?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;

    fetch(urlFixtures)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      let fixturecontainer = document.getElementById("fixtures-container");
      data.data.forEach(fixture => {
        let fixture_hometeam_id = fixture.localteam_id;
        let urlHomeTeam = `https://soccer.sportmonks.com/api/v2.0/teams/${fixture_hometeam_id}?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;
        let urlAwayTeam = `https://soccer.sportmonks.com/api/v2.0/teams/${fixture.visitorteam_id}?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;
        //Promise all
        Promise.all([fetch(urlHomeTeam),fetch(urlAwayTeam)])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => {
            console.log(data1, data2);
            let homeTeamName = data1.data.name;
            let awayTeamName = data2.data.name;
            let homeTeamLogo = data1.data.logo_path;
            let awayTeamLogo = data2.data.logo_path;
            let fixtureElement = 
            ` 
                <div class="row fixtures_card">
                  <div class="col fixtures_cards_col">
                    <img src="${homeTeamLogo}" class="fixtures_cards_img"></img><br>
                    <h2 class="text-dark">${homeTeamName}</h2>
                  </div>
                  <div class="col fixtures_cards_vs">
                    <h2 class="text-dark">vs</h2>
                  </div>
                  <div class="col fixtures_cards_col">
                    <img src="${awayTeamLogo}" class="fixtures_cards_img"></img><br>
                    <h2 class="text-dark">${awayTeamName}</h2>
                  </div>
                </div>
            `;
            fixturecontainer.innerHTML += fixtureElement;
          })
          .catch(error => console.log(error));
      });
    })
});
