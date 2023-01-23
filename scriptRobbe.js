document.getElementById("football").addEventListener("click", callFootballAPI);

document.getElementById("travel").addEventListener("click", callTravelAPI);

document.getElementById("testAPIs").addEventListener("click", testAPIs);


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
function testAPIs() {
    console.log("hello world");
    fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-01-02/2023-01-02?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5")
    .then(response => response.json())
    .then(data => {
        const coordinates = data.data[0].weather_report.coordinates;
        console.log(coordinates);
        const geoapifyUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${coordinates.lat},${coordinates.lon},5000&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`;
        return fetch(geoapifyUrl);
    })
    .then(response => response.json())
  .then(data => {
    // extract the data you need from the response
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}