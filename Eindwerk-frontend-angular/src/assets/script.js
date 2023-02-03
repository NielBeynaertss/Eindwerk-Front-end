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
    let res = document.getElementById("res");
    let filt2Acc = document.getElementById("filter2Acc");
    let filt2Cat =  document.getElementById("filter2Cat");
    let filtOpt = document.getElementById("filterOpt");
    let filt2Whe = document.getElementById("filter2Whe");
    
    res.style.display = "block"
    rad.style.display = "block"
    if (options === "acco") {
        filt2Acc.style.display = "block";
        filt2Cat.style.display = "none";
        filtOpt.style.display = "block";
        filt2Whe.style.display = "none";
        acc.style.display = "block";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "cate") {
        filt2Acc.style.display = "none";
        filt2Cat.style.display = "block";
        filtOpt.style.display = "block";
        filt2Whe.style.display = "none";
        acc.style.display = "none";
        cat.style.display = "block";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "heal") {
        filt2Acc.style.display = "none";
        filt2Cat.style.display = "none";
        filtOpt.style.display = "none";
        filt2Whe.style.display = "none";
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "block";
        par.style.display = "none";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "park") {
        filt2Acc.style.display = "none";
        filt2Cat.style.display = "none";
        filtOpt.style.display = "none";
        filt2Whe.style.display = "block";
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "block";
        ren.style.display = "none";
        tra.style.display = "none";
    } else if (options === "rent") {
        filt2Acc.style.display = "none";
        filt2Cat.style.display = "none";
        filtOpt.style.display = "none";
        filt2Whe.style.display = "none";
        acc.style.display = "none";
        cat.style.display = "none";
        hea.style.display = "none";
        par.style.display = "none";
        ren.style.display = "block";
        tra.style.display = "none";
    } else if (options === "tran") {
        filt2Acc.style.display = "none";
        filt2Cat.style.display = "none";
        filtOpt.style.display = "none";
        filt2Whe.style.display = "block";
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
    let checkboxes = document.querySelectorAll('.firstFilter input[type="checkbox"]');
    let filtersWith = '';
    for (let i = 0; i <checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            // If it is, add its value to the values array
            filtersWith += checkboxes[i].value + ','
        }
    }

    let checkboxes2 = document.querySelectorAll('.secondFilter input[type="checkbox"]');
    let filters2With = '';
    for (let i = 0; i <checkboxes2.length; i++) {
        if (checkboxes2[i].checked) {
            // If it is, add its value to the values array
            filters2With += checkboxes2[i].value + ','
        }
    }

    let checkbox3 = document.querySelector('.optFilter input[type="checkbox"]');
    let opt = 'no';
    if (checkbox3.checked) {
        opt = "yes"
    }

    
    let filters = filtersWith.substring(0, filtersWith.length - 1);
    let filters2 = filters2With.substring(0, filters2With.length - 1);
    let radius = document.getElementById('radius').value;
    //console.log(`filters: ${filters} & coordinates: ${coordinates} & radius ${radius}`);
    let geoapifyURL = `https://api.geoapify.com/v2/places?categories=${filters}&filter=circle:${coordinates},${radius}&limit=20&apiKey=2e37c02459684f11b9472b5ec244d1e3`
    //console.log(geoapifyURL);
    fetch(geoapifyURL)
    .then(response => response.json())
    .then(data => {
    // extract the data you need from the response
        let results = data.features
        //console.log(results);
        let div = document.getElementById("results");
        div.innerHTML = '';
        if (results.length == 0) {
            let template = `<div>
                                    <p>There are no results! Maybe increasing your radius will help getting a result</p>
                                    </div>`;
                    div.innerHTML += template;
        }
        else {
            
            data.features.forEach((item, index) => {
                let place_id = item.properties.place_id
                let checkURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=b952ab1bdc9e4852942f8752e2155d9b`
                detailsCheck(checkURL, filters2, opt)
                .then(filterCheck => {
                if (filterCheck == true) {
                    let distance = getDistance(coordinates, item.properties.lat, item.properties.lon)
                    let conditions = item.properties.categories
                    //console.log(conditions)
                    //console.log(distance)
                    let detailURL = `https://api.geoapify.com/v2/place-details?id=${place_id}&apiKey=51d3185c0772406c92f1907efa83798e`
                    console.log(detailURL)
                    let template = `<div>
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

function detailsCheck(url, filters, opt) {
    //console.log(url)
    //console.log(opt)
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        let check = data.features[0].properties
        let filterArray = filters.split(",");
        if (opt == "yes") {
            if ("facilities" in check) {
                //console.log(check.facilities)
                let facilities = check.facilities;
                let allTrue = filterArray.every(item => item in facilities && facilities[item]);
                if (allTrue) {
                    return true
                }
                else {
                    return false
                }
            } else {
                return false;
            }
        } else {
            if ("facilities" in check) {
                let facilities = check.facilities;
                console.log(facilities)
                for (let key in facilities) {
                  //console.log(facilities[key]);
                  if (filterArray.includes(key) && facilities[key] === false) {
                    return false;
                  }
                }
                return true;
              } else {
                return true;
              }
        }
    })
}

//This function calculates the direct distance between the stadium and the place of interest
function getDistance(coordinates1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }
    let [lon1, lat1] = coordinates1.split(',');
    //console.log(`1: ${lon1}, 2: ${lat1}, 3: ${lon2}, 4: ${lat2}`);

    var R = 6371; // radius of Earth in km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = Math.round(d * 1000) / 1000;
    if (d < 1) {
        d *= 1000
        d += 'm'

    }
    else {
        d += 'km'
    }
    return d;
}

function checkConditions(info) {
    let noInfo = "No information about"
    let noInfoFood = "No information about"
    let noInfoAll = "No information about"

//General information
    let int = ''
    if (info.includes("internet_access")) {
        if (info.includes("internet_access.free")) {
            
            int = `<p> <i class="fa-solid fa-globe"></i> Free internet! </p>`
        }
        else {
            int = `<p><i class="fa-solid fa-globe"></i> Internet for customers! </p>`
        }
    }
    else {
        noInfo += " internet,"
    }

    let whe = ``
    if (info.includes("wheelchair")) {
        if (info.includes("wheelchair.yes")) {
            whe = `<p> <i class="fa-solid fa-wheelchair"></i> Wheelchair accessible! </p>`
        }
        else {
            whe = `<p> <i class="fa-solid fa-wheelchair"></i> Wheelchair accessibility Limited! </p>`
        }
    }
    else {
        noInfo += " wheelchair accessibility,"
    }

    let dog = ``
    if (info.includes("dogs")) {
        if ("dogs.yes" in info) {
            dog = `<p><i class="fa-solid fa-dog"></i> Dogs allowed! </p>`
        }
        else if (info.includes("dogs.leashed")) {
            dog = `<p><i class="fa-solid fa-dog"></i> Dogs need to be leashed! </p>`
        }
        else {
            dog = `<p><i class="fa-solid fa-dog"></i> No dogs allowed! </p>`
            
        }
    }
    else {
        noInfo += " dogs allowed or not,"
    }

    
    
// Food options
    let veget = ``
    if (info.includes("vegetarian.only")) {
        veget = `<p><i class="fa-solid fa-leaf"></i> Serves only vegetarian food! </p>`
    }
    else if (info.includes("vegetarian")) {
        veget = `<p><i class="fa-solid fa-leaf"></i> Serves vegetarian food! </p>`
    }
    else {
        noInfoFood += " vegetarian food,"
    }

    let vegan = ``
    if (info.includes("vegan.only")) {
        vegan = `<p><i class="fa-solid fa-v"></i> Serves only vegan food! </p>`
    }
    else if (info.includes("vegan")) {
        vegan = `<p><i class="fa-solid fa-v"></i> Serves vegan food! </p>`
    }
    else {
        noInfoFood += " vegan food,"
    }

    let halal = ``
    if (info.includes("halal.only")) {
        halal = `<p><i class="fa-solid fa-book-quran"></i> Serves only halal food! </p>`
    }
    else if (info.includes("halal")) {
        halal = `<p><i class="fa-solid fa-book-quran"></i> Serves halal food! </p>`
    }
    else {
        noInfoFood += " halal food,"
    }

    let koshe = ``
    if (info.includes("kosher.only")) {
        koshe = `<p><i class="fa-solid fa-scroll-torah"></i> Serves only kosher food! </p>`
    }
    else if (info.includes("kosher")) {
        koshe = `<p><i class="fa-solid fa-scroll-torah"></i> Serves kosher food! </p>`
    }
    else {
        noInfoFood += " kosher food,"
    }

    let organ = ``
    if (info.includes("organic.only")) {
        organ = `<p><i class="fa-solid fa-seedling"></i> Serves only organic food! </p>`
    }
    else if (info.includes("organic")) {
        organ = `<p><i class="fa-solid fa-seedling"></i> Serves organic food! </p>`
    }
    else {
        noInfoFood += " organic food,"
    }




//Allergies
    let glu = ``
    if (info.includes("gluten_free")) {
        glu = `<p><i class="fa-solid fa-wheat-awn"></i> Serves gluten free food! </p>`
    }
    else {
        noInfoAll += " gluten free food,"
    }

    let sug = ``
    if (info.includes("sugar_free")) {
        sug = `<p><i class="fa-solid fa-cubes-stacked"></i> Serves sugar free food! </p>`
    }
    else {
        noInfoAll += " sugar free food,"
    }

    let egg = ``
    if (info.includes("egg_free")) {
        egg = `<p><i class="fa-solid fa-egg"></i> Serves egg free food! </p>`
    }
    else {
        noInfoAll += " egg free food,"
    }

    let soy = ``
    if (info.includes("soy_free")) {
        soy = `<p><i class="fa-brands fa-nutritionix"></i> Serves soy free food! </p>`
    }
    else {
        noInfoAll += " soy free food,"
    }

    let infoCheck = [noInfo, noInfoFood, noInfoAll]
    for (let i = 0; i < 3; i++) {
        if (infoCheck[i] == "No information about") {
            infoCheck[i] = ``
        }
        else {
            infoCheck[i] = infoCheck[i].substring(0, infoCheck[i].length-1);
        }
    }

    let moreDetails = `<h3> Other information </h3>
                        ${int}
                        ${whe}
                        ${dog}
                        ${noInfo}
                        <h3> Food information </h3>
                        ${veget}
                        ${vegan}
                        ${halal}
                        ${koshe}
                        ${organ}
                        ${noInfoFood}
                        <h3> Food allergies! </h3>
                        ${glu}
                        ${sug}
                        ${egg}
                        ${soy}
                        ${noInfoAll}
                        `
    return moreDetails
}

//This function fetches the url of an api to get more information of a specific place
//This API call costs a lot of resources in terms of requests/credits per month
//This is why it's not part of the main fetch, because calling the api for all results would make it hit the request cap very fast
//It creates a new template containing some important information if you're more interested in the place
function fetchPlaceDetails(url, index, conditions) {
    console.log(url)
    //console.log(conditions)
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let placeDetails = data.features[0].properties;
        let info = conditions.split(",")
        //console.log(info)
        let moreDetails = checkConditions(info);
        //console.log(moreDetails)
        if ("contact" in placeDetails) {
            //console.log("IT WORKS")
            phoneTemplate = `<p> Phone: ${placeDetails.contact.phone}</p>`
        }
        else {
            phoneTemplate = `<p> No phone given</p>`
        }

        if ("website" in placeDetails) {
            //console.log("IT WORKS TOO")
            websiteTemplate = `<p> Website: <a href="${placeDetails.website}" target="_blank">${placeDetails.website}</a></p>`
        }
        else {
            websiteTemplate = `<p> No website given</p>`
        }
        if ("opening_hours" in placeDetails) {
            //console.log("IT WORKS 3")
            hoursTemplate = `<p> Opening hours: ${placeDetails.opening_hours}</p>`
        }
        else {
            hoursTemplate = `<p> No opening hours given</p>`
        }
        let detailsDiv = document.getElementById(`place-details-${index}`);
        let detailsBut = document.getElementById(`button-details-${index}`);
        let detailsHid = document.getElementById(`hide-details-${index}`);

        detailsDiv.style.display = "block"
        detailsBut.style.display = "none"
        detailsHid.style.display = "block"

        detailsDiv.innerHTML = `<h3> General information </h3>
                                ${phoneTemplate}
                                ${websiteTemplate}
                                ${hoursTemplate}
                                ${moreDetails}`
    })
    .catch(error => {
        console.error(error);
    });
}

function hideDetails(index) {
    document.getElementById(`place-details-${index}`).style.display = "none";
    document.getElementById(`hide-details-${index}`).style.display = "none";
    document.getElementById(`button-details-${index}`).style.display = "block";
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
        let fnlAPI = document.getElementById("finalAPI")
        
        opt.style.display = "block"
        button.style.display = "block"
        fnlAPI.style.display = "none"
        

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



//to do:
//Title needs to tell what the result is
//More information in details?
//make details customizable OR add a new button where you can look at the filters you've set
//Turn to typescript

function getFixtures(id) {
    
    let date1 = document.getElementById("start-date").value;
    let date2 = document.getElementById("end-date").value;
    console.log(date1 + ' and ' + date2)
    let leagueID = ``
    if (id != NaN) {
        leagueID = `&league_id=${id}`
    }
    let urlFixtures = `https://soccer.sportmonks.com/api/v2.0/fixtures/between/${date1}/${date2}?api_token=1GoW5Zal0tKjHcvovZTHNVty1B35cuZHol8sz9TPNgwIyl22350MGOEOGdn5${leagueID}`
    console.log(urlFixtures);
    fetch(urlFixtures)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      //console.log(data)
      let fixturecontainer = document.getElementById("fixtures-container");
      fixturecontainer.innerHTML = "";
      data.data.forEach(fixture => {
        let fixtureLeagueID = fixture.league_id
        if (fixtureLeagueID == id) {
        let fixture_hometeam_id = fixture.localteam_id;
        let urlHomeTeam = `https://soccer.sportmonks.com/api/v2.0/teams/${fixture_hometeam_id}?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;
        let urlAwayTeam = `https://soccer.sportmonks.com/api/v2.0/teams/${fixture.visitorteam_id}?api_token=XknJJDTtdX0z1nFtbPxt1C29IestIRI7izPt9gtzTFZP7JDZufu6nAmW8F70`;
        //Promise all
        Promise.all([fetch(urlHomeTeam),fetch(urlAwayTeam)])
          .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
          .then(([data1, data2]) => {
            //console.log(data1, data2);
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
    }});
    })
}

