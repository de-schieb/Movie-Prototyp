const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const moviePopupMain = document.querySelector('#movie-popup');
const moviePopupDetails = document.querySelector('#movie-details');
const moviePopupButtons = document.querySelector('#movie-play-times-buttons')
const bodyContainer = document.querySelector('#body-container');

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

//    if (value) {
//     // searchMovie(value);
//    }
//     resetInput();
   closeSearchPopup();
}



function openSearchPopup(){
    document.getElementById("search_popup").style.display = "block";
    document.getElementById("body-container").style.opacity = 0.5;
}

function closeSearchPopup() {
    document.getElementById("search_popup").style.display = "none";
    document.getElementById("body-container").style.opacity = 1;
}

function openReservationPopup() {
    moviePopupMain.style.display = "grid";
    moviePopupDetails.style.display = "grid";
    moviePopupButtons.style.display = "grid";
    bodyContainer.style.display = "none";
}

function closeReservationPopup() {
    moviePopupMain.style.display = "none";
    moviePopupDetails.style.display = "none";
    moviePopupButtons.style.display = "none";
    bodyContainer.style.display = "grid";
}