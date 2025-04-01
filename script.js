let map;
let pickupAutocomplete;
let dropoffAutocomplete;

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  // Initialize Autocomplete for pickup location
  const pickupInput = document.createElement("input");
  pickupInput.setAttribute("placeholder", "Enter pickup location");
  pickupInput.setAttribute("id", "pickupInput");
  document.getElementById("pickupContainer").appendChild(pickupInput);

  pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  pickupAutocomplete.addListener("place_changed", () => {
    const place = pickupAutocomplete.getPlace();
    console.log("Pickup location:", place);
  });

  // Initialize Autocomplete for dropoff location
  const dropoffInput = document.createElement("input");
  dropoffInput.setAttribute("placeholder", "Enter dropoff location");
  dropoffInput.setAttribute("id", "dropoffInput");
  document.getElementById("dropoffContainer").appendChild(dropoffInput);

  dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);
  dropoffAutocomplete.addListener("place_changed", () => {
    const place = dropoffAutocomplete.getPlace();
    console.log("Dropoff location:", place);
  });
}