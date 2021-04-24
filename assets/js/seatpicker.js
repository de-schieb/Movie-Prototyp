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
        const index = selectedSeatIDs.indexOf(div.id);
        if(index>-1){
            selectedSeatIDs.splice(index,1);
        }
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

async function getSeatIDForTarget(seatID,target,showID){
    let fetchedSeatPlanPattern = (await getSeatplanByShowID(showID));
    let seatPlanPatternFrontend = populateFrontEndSeatPlanPattern();
    let seatPlanPatternDatabase = populateDatabaseSeatPlanPattern(fetchedSeatPlanPattern);
    let seatPlanPatternMixed = populateMixedSeatPlanPattern(seatPlanPatternFrontend,seatPlanPatternDatabase);

    switch(target){
        case FRONTEND:
            for(let i = 0;i<seatPlanPatternMixed.length;i++){
                if(seatPlanPatternMixed[i].seatIDDB === seatID){
                    return seatPlanPatternMixed[i].seatIDFE;
                }
            }
        case DB:
            for(let i = 0;i<seatPlanPatternMixed.length;i++){
                if(seatPlanPatternMixed[i].seatIDFE === seatID){
                    return seatPlanPatternMixed[i].seatIDDB;
                }
            }
            break;
    }
}

async function setTicketDetailsInDBAndReturnTicketIDs(movieID,showID,firstName,lastName){
    let fetchedSeatIDs = [];
    for(let i = 0;i<selectedSeatIDs.length;i++){
        let seatID = await getSeatIDForTarget(selectedSeatIDs[i], DB, showID);
        console.log("ticketDetails: " + ticketPrice + ", " + movieID + ", " + showID + ", " + 2000 + ", " + seatID + ", " + firstName + ", " + lastName);
        await postTicketDetails(ticketPrice,movieID,showID,2000,seatID,firstName,lastName);
        await setSeatBlocked(seatID);
        fetchedSeatIDs.push(await getTicketIDs(movieID,showID,seatID));
    }
    return fetchedSeatIDs.join(", ");
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