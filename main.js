//get reference to container element 
const container = document.querySelector('.container');

//get refer to the unoccupied seats in the row
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

//get reference to count of seats
const count = document.getElementById('count');

//get reference to total cost of seats
const total = document.getElementById('total');

//get reference to movie selected throught drop-down list
const movieSelect = document.getElementById('movie');

populateUI();

//selecting the value of the movie select
let ticketPrice = parseInt(movieSelect.value);

//function for storing movie data in local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//function for updated the no. of seats and the total cost
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //created an array of selected seats with a spread operator then loop through the array and return the index of the  iteration in the new array
  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat)

  });

  //setting the seats in localstorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //taking the length of number of seats selected
  const selectedSeatsCount = selectedSeats.length;

  //changing it with number of seats selected
  count.innerText = selectedSeatsCount;

  //updating the total price
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  //if the local storage is not empty and it doesn't have an empty array then
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  //fetching from local storage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//event for movie selection
movieSelect.addEventListener('change', function(event) {
  //change in ticket price value
  ticketPrice = parseInt(event.target.value);

  //calling the function setMovieData.First value gives index of the selected item inthe drop down while the second value gives the value of the selected movie
  setMovieData(event.target.selectedIndex, event.target.value);

  //recalling the updateSelectedCount functon  
  updateSelectedCount();
});

//add event to the container
container.addEventListener('click', function(event) {

  //if the container has class of seat as well as it is not occupied then
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    //then the seats are selected
    event.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();