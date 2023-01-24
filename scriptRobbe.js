document.getElementById("football").addEventListener("click", callFootballAPI);

document.getElementById("travel").addEventListener("click", callTravelAPI);

document.getElementById("testAPIs").addEventListener("click", testAPIs);

document.getElementById("testBoxes").addEventListener("click", checkboxToURL);

document.getElementById("finalAPI").addEventListener("click", fixtureToMenu);


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
    let team_id = document.getElementById("teams").value
    console.log(`https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-02-01/2023-02-28/${team_id}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5`)
    fetch(`https://soccer.sportmonks.com/api/v2.0/fixtures/between/2023-02-01/2023-02-28/${team_id}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5`)
    .then(response => response.json())
    .then(data => {
        if (data.data[0].weather_report == null) {
            venue_id = data.data[0].venue_id;
            console.log(venue_id);
            return fetch(`https://soccer.sportmonks.com/api/v2.0/venues/${venue_id}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5`)
            .then(response => response.json())
            .then(data => {
                coordinates = data.data.coordinates
                console.log(coordinates)
                let [lat, lon] = coordinates.split(',');
                console.log(lon, lat);
                let geoapifyUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${lon},${lat},5000&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`
                console.log(geoapifyUrl)
                return fetch(geoapifyUrl)
            }
    )
    }
        else {
            console.log("DONT GO HERE")
            const coordinates = data.data[0].weather_report.coordinates;
        const geoapifyUrl = `https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.cafe&filter=circle:${coordinates.lon},${coordinates.lat},5000&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`;
        return fetch(geoapifyUrl);
    }
    })
    .then(response => response.json())
    .then(data => {
        console.log("this: " + data)
    // extract the data you need from the response
        let div = document.getElementById("results");
        div.innerHTML = '';
        data.features.forEach((item, index) => {
            let place_id = item.properties.place_id
            let detailURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=51d3185c0772406c92f1907efa83798e`
            let template = `<div>
                            <h2>${item.properties.name}</h2>
                            <p>Adress: ${item.properties.address_line2}</p>
                            <button onclick="fetchPlaceDetails('${detailURL}', ${index})">Details</button>
                            <div id="place-details-${index}"></div>
                            </div>`;
            div.innerHTML += template;
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function fetchPlaceDetails(url, index) {
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // extract the data you need from the response
        let placeDetails = data.features[0].properties;
        console.log(placeDetails.contact.phone + " & " + placeDetails.website)

        let detailsTemplate = `<p> Phone: ${placeDetails.contact.phone}</p>
                                <p> Website: <a href="${placeDetails.website}" target="_blank">${placeDetails.website}</a></p>
                                <p> Opening hours: ${placeDetails.opening_hours}</p>
                                `
        let detailsDiv = document.getElementById(`place-details-${index}`);
        detailsDiv.innerHTML = detailsTemplate;
    })
    .catch(error => {
        console.error(error);
    });
}

function checkboxToURL(coordinates) {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let filtersWith = '';
    for (let i = 0; i <checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // If it is, add its value to the values array
            filtersWith += checkboxes[i].value + ','
        }
    }
    let filters = filtersWith.substring(0, filtersWith.length - 1);
    let radius = document.getElementById('radius').value;
    console.log(`filters: ${filters} & coordinates: ${coordinates} & radius ${radius}`);
    let geoapifyURL = `https://api.geoapify.com/v2/places?categories=${filters}&filter=circle:${coordinates},${radius}&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`
    console.log(geoapifyURL);
    fetch(geoapifyURL)
    .then(response => response.json())
    .then(data => {
        console.log("this: " + data)
    // extract the data you need from the response
        let div = document.getElementById("results");
        div.innerHTML = '';
        data.features.forEach((item, index) => {
            let place_id = item.properties.place_id
            let detailURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=51d3185c0772406c92f1907efa83798e`
            let template = `<div>
                            <h2>${item.properties.name}</h2>
                            <p>Adress: ${item.properties.address_line2}</p>
                            <button onclick="fetchPlaceDetails('${detailURL}', ${index})">Details</button>
                            <div id="place-details-${index}"></div>
                            </div>`;
            div.innerHTML += template;
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function showDropdown() {
    let options = document.getElementById("opt").value;
    let acc = document.getElementById("acc");
    let cat = document.getElementById("cat");
    let hea = document.getElementById("hea");
    let par = document.getElementById("par");
    let ren = document.getElementById("ren");
    let tra = document.getElementById("tra");
    let rad = document.getElementById("rad");
    let res = document.getElementById("res")

    res.style.display = "block"
    rad.style.display = "block"
    if (options === "acco") {
        acc.style.display = "block";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "cate") {
        acc.style.display = "none";
        cat.style.display = "block";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "heal") {
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "block";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "park") {
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "block";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "rent") {
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "block";
        tra.style.display = "none";
    } else if (options === "tran") {
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "block";
    }
    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
};

function fetchFootballAPI() {
    return fetch('https://soccer.sportmonks.com/api/v2.0/fixtures/18531230?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5')
    .then(response => response.json())
    .then(data => {
        venue_id = data.data.venue_id;
        return fetch(`https://soccer.sportmonks.com/api/v2.0/venues/${venue_id}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5`)
            .then(response => response.json())
            .then(data => {
                let wrongCoordinates = data.data.coordinates
                let [lat, lon] = wrongCoordinates.split(',');
                let coordinates = `${lon},${lat}`
                return coordinates
                })
    })
    .catch(error => {
        console.error(error);
    });
}

function fixtureToMenu() {
    fetchFootballAPI()
    .then(coordinates => {
        finalCoordinates = coordinates;

        let button = document.getElementById('showDropdown')
        let opt = document.getElementById('mainMenu')
        let resultsButton = document.getElementById('res')

        opt.style.display = "block"
        button.style.display = "block"

        button.addEventListener('click', function(){
            showDropdown();
        })
        //dit kan eventueel terug naar boven
        resultsButton.addEventListener('click', function(){
            checkboxToURL(finalCoordinates);
        })
    })
    .catch(error => {
        console.error(error);
    });
}

//first add the checkboxes
//then find a way to deselect all non-useful checkboxes


//Categories it needs to check:
//Accomodation
//Catering
//Healthcare
//Parking
//Rental
//Airport
//Public Transport

//Eventueel later:
//Sport
//Services?
//Commercial?
//Entertainment?
//Tourism?