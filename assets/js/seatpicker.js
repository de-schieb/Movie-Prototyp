const container = document.querySelector('#seatplan-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll(".row .seat");
const total = document.getElementById('total-price-seatplan');

let ticketPrice = 8;

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seat into an array 
  // Map through the array
  // Return a new array indexes

  const seatsIndex = [...selectedSeats].map((seat) =>{
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  total.innerText = (selectedSeatsCount * ticketPrice) + "€";
}

function populateFrontEndSeatPlanPattern(){
    let seatPlanPatternFrontend = [];
    for(let i = 0;i<allSeats.length;i++){
        seatPlanPatternFrontend[i] = {
            seatID: allSeats[i].id,
            seatFree: true
        }
    }
    return seatPlanPatternFrontend;
}

function populateDatabaseSeatPlanPattern(fetchedSeatPlanPattern){
    let seatPlanPatternDatabase = [];
    for(let i = 0;i<fetchedSeatPlanPattern.length;i++){
        seatPlanPatternDatabase[i] = {
            seatID: fetchedSeatPlanPattern[i].substring(0,4),
            seatFree: fetchedSeatPlanPattern[i].substring(5)
        }
    }
    return seatPlanPatternDatabase;
}

function populateMixedSeatPlanPattern(seatPlanPatternFE,seatPlanPatternDB){
    let seatPlanPatternMixed = [];
    if(seatPlanPatternFE.length == seatPlanPatternDB.length){
        for(let i = 0;i<seatPlanPatternDB.length;i++){
            seatPlanPatternMixed[i] = {
                seatIDFE: seatPlanPatternFE[i].seatID,
                seatIDDB: seatPlanPatternDB[i].seatID,
                seatFree: seatPlanPatternDB[i].seatFree
            }
            console.log("seatMix: " + seatPlanPatternMixed[i].seatIDFE + ", " + seatPlanPatternMixed[i].seatIDDB +  ", " + seatPlanPatternMixed[i].seatFree);
        }
    }
    return seatPlanPatternMixed;
}

// Get data from localstorage and populate the UI
function populateUI(fetchedSeatPlanPattern) {
    let seatPlanPatternFrontend = populateFrontEndSeatPlanPattern();
    let seatPlanPatternDatabase = populateDatabaseSeatPlanPattern(fetchedSeatPlanPattern);
    let seatPlanPatternMixed = populateMixedSeatPlanPattern(seatPlanPatternFrontend,seatPlanPatternDatabase);

    console.log("seatPlanPatternMixed.length: ", seatPlanPatternMixed.length)
    for(let i = 0;i<seatPlanPatternMixed.length;i++){
        if(seatPlanPatternMixed[i].seatFree == "false"){
            document.getElementById(seatPlanPatternMixed[i].seatIDFE).classList.toggle('occupied');
        }
    }
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
            }});
  }
}

function cleanUI(){
    let seatPlanPatternFrontend = populateFrontEndSeatPlanPattern();

    for(let i = 0;i<seatPlanPatternFrontend.length;i++){
        let seat = document.getElementById(seatPlanPatternFrontend[i].seatID);
        if(seat.classList.contains('occupied') || seat.classList.contains('selected')){
            seat.classList.toggle('');
        }
    }
}


// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount()
  }
})

// Initial count and total set 

updateSelectedCount();