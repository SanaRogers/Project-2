var starterCoordinates = [38.0998, -86.1586]; // Default latitude and longitude on start
var mapZoomLevel = 4;// Between 1 and 18; decrease to zoom out, increase to zoom in
var map = L.map("map", {
    center: starterCoordinates,
    zoom: mapZoomLevel,
    scrollWheelZoom: true
    //layers: [lightmap, earthquake]
});
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(map);
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);
// Put route here instead of CSV
var data = "Data/Independents100.csv"
d3.csv(data, function (csvData) {
    console.log(csvData)
    for (var i in csvData) {
        var row = csvData[i]
        var location = [row.latitude, row.longitude]
        var rad_size = row.Total_Cases
        console.log(rad_size)
        L.circleMarker(location, {
            radius: rad_size / 90000,
            stroke: true,
            color: 'black',
            opacity: 1,
            weight: 1,
            // fill: false,
            fillColor: "red",
            fillOpacity: 0.5
        })
            .bindPopup("<h1>" + row.States + "</h1> <hr> <h3>Total Cases " + row.Total_Cases + "</h3> <h3>Total Deaths " + row.Total_Deaths + "</h3><h4>Impact per million " + row.Case_Rate_per_100000 + "</h4>")
            .addTo(map);
    }
})
