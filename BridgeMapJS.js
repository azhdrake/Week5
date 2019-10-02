let countryCenter = [37,-95]
let zoomLevel = 4

let map = L.map("bridge-map").setView(countryCenter,zoomLevel)

var bridgeIcon = L.icon({
	iconUrl: 'bridgeIcon.png',

	iconSize:     [50, 50], // size of the icon
	shadowSize:   [25, 25], // size of the shadow
	iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
	shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

bridges = [{"name" : "Verrazano-Narrows Bridge", "location" : "New York, NY", "length" : "1298.4", "coordinates" : [40.6066, -74.0447]},
			{"name" : "Golden Gate Bridge", "location" : "San Francisco and Marin, CA", "length" : "1280.2", "coordinates" : [37.8199, -122.4783]},
			{"name" : "Mackinac Bridge", "location" : "Mackinaw and St Ignace, MI", "length" : "1158.0", "coordinates" : [45.8174, -84.7278]},
			{"name" : "George Washington Bridge", "location" : "New York and New Jersey, NY", "length" : "1067.0", "coordinates" : [40.8517, -73.9527]},
			{"name" : "Tacoma Narrows Bridge", "location" : "Tacoma and Kitsap, WA", "length" : "853.44", "coordinates" : [47.2690, -122.5517]}]

bridges.forEach(function(bridge){ // for every bridge in bridges, place a marker at the bridges coordinates.
	L.marker(bridge.coordinates, {icon: bridgeIcon}).addTo(map)
})

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',id:'mapbox.streets',accessToken: 'pk.eyJ1IjoiYXpoZHJha2UiLCJhIjoiY2sweThta2ZzMGRlYzNjbWl6a3NtOWZiOSJ9.3Uf0fpWgUzCmSZxHaVIu2w'}).addTo(map)

let canvas = document.getElementById("bridge-chart")
let ctx = canvas.getContext('2d')

bridgeChart = new Chart(ctx, { //the basic structure of the chart. Data is empty because it's added via the statement below.
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: "Length of bridge",
            data: [],
        }]
    }, options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
		}]
        }
    }
})

bridges.forEach(function(bridge){ // adds data to the chart. and updates it so the data is shown. 
	bridgeChart.data.labels.push(bridge.name)
	bridgeChart.data.datasets[0].data.push(bridge.length)
	bridgeChart.update()
})
