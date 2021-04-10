var starterCoordinates = [38.0998, -86.1586]; // Default latitude and longitude on start
var mapZoomLevel = 4;// Between 1 and 18; decrease to zoom out, increase to zoom in

var map = L.map("map", {
    center: starterCoordinates,
    zoom: mapZoomLevel,
    scrollWheelZoom: true
    //layers: [lightmap, earthquake]
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);

// L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
//     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
// }).addTo(map);
var data = "Independents100.csv"
d3.json('http://localhost:5000/api/v1.0/restaurantes').then(function(data){
    console.log(data)
    for (var i in data) {
        var row = data[i]
        //Object.entries(row).forEach(([key, value]) => {
        console.log(row)
        var location = [row.Lat, row.Long]
        console.log(location)
        if (location[0] !== undefined && location[1] !== undefined){
            L.marker(location, {
                fillOpacity: 0.75,
                color: "pink",
                fillColor: "red",
            }).bindPopup("<h1>" + row.Restaurant + "</h1> <hr><h2>" + row.Rank + "</h2>").addTo(map);
        }
        
        //})
           

    }

})
