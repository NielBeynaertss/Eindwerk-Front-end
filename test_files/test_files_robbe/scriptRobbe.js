//Adds events to the buttons so they call up the right function when clicked
document.getElementById("finalAPI").addEventListener("click", fixtureToMenu);
document.getElementById('showDropdown').addEventListener("click", showDropdown)

//This function fetches the football api for a certain fixture, takes the venue id from it
//then it fetches the api again so it can get the coordinates from it and return it
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

//This function shows the right menu with checkboxes when the first search gets completed
//Some checkboxes would still be ticked after they get hidden again, so it clears all checkboxes at the end of this function
//It will also clear the results div
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
    let div = document.getElementById("results");
        div.innerHTML = '';
};

//The first part of this function checks all checkboxes and puts the values of all ticked boxes in the variable called 'filtersWith'
//It also adds a comma to all values because that's important for the syntax for the next api call
//After all boxes are checked, it removes the last character (the final comma) of the string, otherwise the api call won't work
//It creates a new URL with all the variable inputs given by the user and fetches an api from that
//Then, it takes the elements it needs to create the template we can use as the result
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
    // extract the data you need from the response
        let div = document.getElementById("results");
        div.innerHTML = '';
        data.features.forEach((item, index) => {
            let place_id = item.properties.place_id
            let detailURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=51d3185c0772406c92f1907efa83798e`
            console.log(detailURL)
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

//This function fetches the url of an api to get more information of a specific place
//This API call costs a lot of resources in terms of requests/credits per month
//This is why it's not part of the main fetch, because calling the api for all results would make it hit the request cap very fast
//It creates a new template containing some important information if you're more interested in the place
function fetchPlaceDetails(url, index) {
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let placeDetails = data.features[0].properties;
        if ("contact" in placeDetails) {
            console.log("IT WORKS")
            phoneTemplate = `<p> Phone: ${placeDetails.contact.phone}</p>`
        }
        else {
            phoneTemplate = `<p> No phone given</p>`
        }

        if ("website" in placeDetails) {
            console.log("IT WORKS TOO")
            websiteTemplate = `<p> Website: <a href="${placeDetails.website}" target="_blank">${placeDetails.website}</a></p>`
        }
        else {
            websiteTemplate = `<p> No website given</p>`
        }
        if ("opening_hours" in placeDetails) {
            console.log("IT WORKS 3")
            hoursTemplate = `<p> Opening hours: ${placeDetails.opening_hours}</p>`
        }
        else {
            hoursTemplate = `<p> No opening hours given</p>`
        }

        let detailsTemplate = `${phoneTemplate}
                                ${websiteTemplate}
                                ${hoursTemplate}
                                `
        let detailsDiv = document.getElementById(`place-details-${index}`);
        detailsDiv.innerHTML = detailsTemplate;
    })
    .catch(error => {
        console.error(error);
    });
}

//This function calles up the football api-function, then changes the display state of the search function
//It also links a function with the coordinates to a function
function fixtureToMenu() {
    fetchFootballAPI()
    .then(coordinates => {
        finalCoordinates = coordinates;

        let button = document.getElementById('showDropdown')
        let opt = document.getElementById('mainMenu')
        let resultsButton = document.getElementById('res')

        opt.style.display = "block"
        button.style.display = "block"

        //dit kan eventueel terug naar boven
        resultsButton.addEventListener('click', function(){
            checkboxToURL(finalCoordinates);
        })
    })
    .catch(error => {
        console.error(error);
    });
}

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

//Options need to come with the final result

//Distance?

//Expand the results (all pizza results when looking for pizza)

//More information in details?