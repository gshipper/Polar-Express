// Initialize Google Maps Places Autocomplete
function initAutocomplete() {
  const pickupInput = document.getElementById('pickup');
  const dropoffInput = document.getElementById('dropoff');

  // Create autocomplete objects for pickup and dropoff inputs
  const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput);
  const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput);

  // Restrict the search to just the US
  pickupAutocomplete.setComponentRestrictions({ country: ['us'] });
  dropoffAutocomplete.setComponentRestrictions({ country: ['us'] });

  // Specify the fields to return
  pickupAutocomplete.setFields(['formatted_address']);
  dropoffAutocomplete.setFields(['formatted_address']);
}

// Creating the ride details section
document.getElementById("scheduleButton").addEventListener("click", function () {
  const pickupInput = document.getElementById("pickup").value.trim();
  const dropoffInput = document.getElementById("dropoff").value.trim();
  const dateInput = document.getElementById("date").value;
  const timeInput = document.getElementById("time").value;
  const passengersInput = document.getElementById("passengers").value;

  const pickupError = document.getElementById("pickupError");
  const dropoffError = document.getElementById("dropoffError");
  const dateError = document.getElementById("dateError");
  const passengersError = document.getElementById("passengersError");
  const timeError = document.getElementById("timeError");

  
  pickupError.textContent = "";
  dropoffError.textContent = "";
  dateError.textContent = "";
  passengersError.textContent = "";

  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  let isValid = true;

  // Validate pickup location
  if (!pickupInput) {
    pickupError.textContent = "Please enter a pickup location.";
    isValid = false;
  }

  // Validate dropoff location
  if (!dropoffInput) {
    dropoffError.textContent = "Please enter a dropoff location.";
    isValid = false;
  }

  // Validate date
  if (!dateInput || dateInput < todayString) {
    dateError.textContent =  "Please select a valid date.";
    isValid = false;
  }

  // Validate time
  if (!timeInput) {
    timeError.textContent = "Please select a time.";
    isValid = false;
  }

  // Validate number of passengers
  const passengers = parseInt(passengersInput, 10);
  if (!passengersInput || passengers <= 0 || passengers > 8) {
    passengersError.textContent = "The number of passengers must be between 1 and 8.";
    isValid = false;
  }

  // If validation passes, proceed with scheduling
  if (isValid) {
    document.getElementById("rideDetails").classList.remove("hidden");
    document.getElementById("displayPickup").textContent = pickupInput;
    document.getElementById("displayDropoff").textContent = dropoffInput;
    document.getElementById("displayDate").textContent = dateInput;
    document.getElementById("displayTime").textContent = timeInput;
    document.getElementById("displayPassengers").textContent = passengers;
  }
});

// Reset button functionality
document.getElementById('reset-button').addEventListener('click', () => {
  document.getElementById('rideForm').reset();
  document.getElementById('rideDetails').classList.add('hidden');
  document.getElementById("pickupError").textContent = "";
  document.getElementById("dropoffError").textContent = "";
  document.getElementById("dateError").textContent = "";
  document.getElementById("passengersError").textContent = "";
  document.getElementById("timeError").textContent = "";
});

window.onload = initAutocomplete;