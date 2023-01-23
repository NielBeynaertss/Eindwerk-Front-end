
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
    let container = document.getElementById("leagues-container");
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
      container.innerHTML += leagueElement;
    });
  })
  .catch(error => {
    console.error(error);
  });

