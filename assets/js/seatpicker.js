const container = document.querySelector('#seatplan-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const allSeats = document.querySelectorAll(".row .seat");
const total = document.getElementById('total-price-seatplan');

let ticketPrice = 8;
let selectedSeatIDs = [];

// Update total and count
function updateSelectedCount(div) {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  if(div){
    if(div.classList.contains('selected')){
        selectedSeatIDs.push(div.id);
    }else{
        selectedSeatIDs.pop();
    }
    setElementInnerHtml("seats-seatplan",selectedSeatIDs.join(", "));
  }
  setElementInnerHtml("total-price-seatplan", (selectedSeatsCount * ticketPrice) + "€");
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
}

function cleanUI(){
    let seatPlanPatternFrontend = populateFrontEndSeatPlanPattern();

    for(let i = 0;i<seatPlanPatternFrontend.length;i++){
        let seat = document.getElementById(seatPlanPatternFrontend[i].seatID);
        if(seat.classList.contains('occupied')){
            seat.classList.toggle('occupied');
        } else if(seat.classList.contains('selected')){
            seat.classList.toggle('selected');
        }
    }
    selectedSeatIDs = [];
    setElementInnerHtml("seats-seatplan",selectedSeatIDs.join(", "));
    setElementInnerHtml("total-price-seatplan", (0 * ticketPrice) + "€");

}


container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount(e.target);
  }
})

// Initial count and total set 
updateSelectedCount();