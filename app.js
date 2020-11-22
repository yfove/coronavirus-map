import "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js";

// maptoken plugin

const mapbox_token =
  "pk.eyJ1IjoiY3VydGlzY2hhdCIsImEiOiJjazg2dHo2dTIwbG50M2RvOHU5aGU0a2Y1In0.ajuXbkqhdPXTqujBc7c_QQ";

mapboxgl.accessToken = mapbox_token;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 2.0,
  center: [120, 20]
});

const getColorFromCount = count => {
  if (count >= 7000) {
    return "maroon";
  }
  if (count >= 2000) {
    return "darkred";
  }
  if (count >= 1000) {
    return "firebrick";
  }
  if (count >= 500) {
    return "crimson";
  }
  if (count >= 10) {
    return "indianred";
  }
  return "pink";
};

// search query
const myForm = document.getElementById('myForm')
myForm.addEventListener('submit',function(e){
  e.preventDefault()
  let country = document.getElementById('country').value
  // alert(country);
  // alert("your submission is: " + country + ", this feature is currently in progress")
  console.log(country);
  const url2 = "https://covid19.p.rapidapi.com/data/confirmed/country/"+country
  
  fetch(url2, {
    method: "GET",
    withCredentials: true,
    headers: {
      "x-rapidapi-key": "395feb7c3emshb4a91900aa9f376p161dc0jsn52d04d06ce2e",
      "x-rapidapi-host": "covid1910.p.rapidapi.com",
      "useQueryString": true
    }
  })
  .then(res=>res.json())
  .then(res => {
    console.log(res)
  
    let totalCasesCountry = document.getElementById('country-name')
    let countryConfirmed = document.getElementById('country-confirmed')
    let updatedOn = document.getElementById('country-updated')
  
    totalCasesCountry.innerHTML = ''
    countryConfirmed.innerHTML = ''
    updatedOn.innerHTML = ''

    totalCasesCountry.append(res[0].country.toUpperCase())
    countryConfirmed.append(res[0].confirmed.toLocaleString('en'))
    updatedOn.append(res[0].date)
  
  })
})


// John Hopkins Coronavirus API
const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations"


fetch(url)
  .then(res => res.json()) // (generic response) getting the actual res we have to convert to .json
  .then(res => {
    const length = res.locations.length;
    const index = length - 1;
    // console.log(index)
    // console.log(res)


    // let totalCasesCountry = document.getElementById('country-name')
    // let totalDeathCountry = document.getElementById('country-confirmed')
    // let updatedOn = document.getElementById('country-updated')

    // totalCasesCountry.append(res[index].confirmed)
    // countryConfirmed.append(res[index].confirmed)
    // updatedOn.append(res[index].confirmed)

    // total cases global
    let totalCases = res.latest;
    let totalConfirmed = totalCases.confirmed;
    let totalDeaths = totalCases.deaths;
    let totalRecovered = totalCases.recovered;

    // simple display 
    document.getElementById('totalconfirmed').innerHTML = totalConfirmed.toLocaleString('en');
    document.getElementById('totaldeaths').innerHTML = totalDeaths.toLocaleString('en');
    document.getElementById('totalrecovered').innerHTML = totalRecovered.toLocaleString('en');

    // let population = res.location.country_population;
    // let update = res.location.last_update;
    // console.log(population)
    const reports = res.locations;

    // console.log(reports);

    reports.forEach(report => {
      const { latest, country, last_updated, coordinates } = report;
      // console.log(latest, coordinates);
      //create makers
      const marker = new mapboxgl.Marker({
        size: "large",
        color: getColorFromCount(latest.confirmed)
      })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .setPopup(
          new mapboxgl.Popup().setText(
            "Country: " +
              country +
              "\n" +
              "Confimed Cases: " +
              latest.confirmed +
              "\n" +
              "Deaths: " +
              latest.deaths +
              "\n" +
              "Updated: " +
              last_updated
          )
        )
        .addTo(map);
    });
  });







