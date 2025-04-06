document.getElementById('scheduleButton').addEventListener('click', function () {
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const passengers = document.getElementById('passengers').value;

  if (pickup && dropoff && date && time && passengers) {
    document.getElementById('displayPickup').textContent = pickup;
    document.getElementById('displayDropoff').textContent = dropoff;
    document.getElementById('displayDate').textContent = date;
    document.getElementById('displayTime').textContent = time;
    document.getElementById('displayPassengers').textContent = passengers;

    document.getElementById('rideDetails').classList.remove('hidden');
  } else {
    alert('Please fill out all fields.');
  }
});

document.getElementById('reset-button').addEventListener('click', function () {
  document.getElementById('pickup').value = '';
  document.getElementById('dropoff').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
  document.getElementById('passengers').value = '';

  document.getElementById('rideDetails').classList.add('hidden');
});