document.getElementById("football").addEventListener("click", callFootballAPI);

document.getElementById("travel").addEventListener("click", callTravelAPI);

document.getElementById("testAPIs").addEventListener("click", testAPIs);

document.getElementById("testOptions").addEventListener("click", testOptions);


function callFootballAPI() {
    console.log("FOOTBALL");
    fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-01-02/2023-01-02?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5")
    .then(response => response.json())
    .then(data => {
    console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function callTravelAPI() {
    console.log("TRAVEL");
    var requestOptions = {
        method: 'GET',
      };
      
    fetch("https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:11.573106549898483,48.13898913611139,5000&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    .catch(error => console.log('error', error));
}

//Make a list of the basic filters for sportmonks api
//Countries & leagues
//


function testAPIs() {
    console.log("hello world");
    fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-01-02/2023-01-02?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5")
    .then(response => response.json())
    .then(data => {
        const coordinates = data.data[0].weather_report.coordinates;
        console.log(coordinates);
        const geoapifyUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${coordinates.lon},${coordinates.lat},5000&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`;
        return fetch(geoapifyUrl);
    })
    .then(response => response.json())
    .then(data => {
    // extract the data you need from the response
        console.log(data);
        let div = document.getElementById("results");
        data.features.forEach(item => {
            let template = `<div>
                            <h2>${item.properties.name}</h2>
                            </div>`;
            div.innerHTML += template;
        });
    })
    .catch(error => {
        console.error(error);
    });
}



function testOptions() {
    let accOptions = "accommodation." + document.getElementById("accOptions").value;
    let catOptions = "catering." + document.getElementById("catOptions").value;
    let parkOptions = "parking." + document.getElementById("parkOptions").value;
    let TraOptions = "public_transport." + document.getElementById("TraOptions").value;
    let radius = document.getElementById("radius").value;
    let testURL = `https://api.geoapify.com/v2/places?categories=${accOptions},${catOptions},${parkOptions},${TraOptions}&filter=circle:lon,lat,${radius}`
    console.log(testURL);
    
}