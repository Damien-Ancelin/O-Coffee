const mapContainer = document.querySelector("#map");

const map = function () {
  var map = L.map("map").setView([48.84930648102616, 2.2911599288708913], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

var marker = L.marker([48.84930648102616, 2.2911599288708913]).addTo(map);

marker.bindPopup("<b>Votre boutique O'coffee</b><br>").openPopup();
};

export const init = function () {
  if(mapContainer){
    map();
  }
};
