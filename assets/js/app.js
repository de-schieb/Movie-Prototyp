// Initial Values
const INITIAL_SEARCH_VALUE = 'spiderman';
const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const reservationPopupOuterGrid = document.querySelector('#reservation-popup');
const reservationPopupDetailsGrid = document.querySelector('#movie-details');
const reservationPopupButtonsGrid = document.querySelector('#movie-play-times-buttons')
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
    reservationPopupOuterGrid.style.display = "grid";
    reservationPopupDetailsGrid.style.display = "grid";
    reservationPopupButtonsGrid.style.display = "grid";
    bodyContainer.style.display = "none";
}

function closeReservationPopup() {
    reservationPopupOuterGrid.style.display = "none";
    reservationPopupDetailsGrid.style.display = "none";
    reservationPopupButtonsGrid.style.display = "none";
    bodyContainer.style.display = "grid";
}


// Click on any movies
// Event Delegation
document.onclick = function (event) {
    log('Event: ', event);
    const { tagName, id } = event.target;
    if (tagName.toLowerCase() === 'img') {
        const movieId = event.target.dataset.movieId;
        const section = event.target.parentElement.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
        getVideosByMovieId(movieId, content);
    }

    if (id === 'content-close') {
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }
}