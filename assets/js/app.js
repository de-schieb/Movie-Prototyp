const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const moviePopup = document.querySelector('#movie-popup');
const reservationPopup = document.querySelector('#reservation-popup')
const bodyContainer = document.querySelector('#body-container');

const btnIds = ["first-time-btn","second-time-btn","third-time-btn","fourth-time-btn"];


searchButton.onclick = function (event) {
    event.preventDefault();
    // const value = searchInput.value

//    if (value) {
//     // searchMovie(value);
//    }
//     resetInput();
   closeSearchPopup();
}

function createMovieImgElement(movieId, path){
    var img = document.createElement("img");
    img.setAttribute("class", "movie_img");
    img.setAttribute("id", "movie_img_" + movieId);
    img.setAttribute("src", path);
    img.setAttribute("onClick", "openMoviePopup(this)")
    document.getElementById("body-container").appendChild(img);
}

function changeMovieDetails(details){
    var {title, fsk, length, releaseDate, description, trailerUrl} = details;
    console.log("title: " + title);
    setElementInnerHtml("movie-title", title);
    console.log("fsk: " + fsk);
    setElementInnerHtml("movie-age-restriction", fsk)
    console.log("length: " + length);
    setElementInnerHtml("movie-length", length + " min");
    console.log("releaseDate: " + releaseDate);
    setElementInnerHtml("movie-release-date", releaseDate);
    console.log("description: " + description);
    setElementInnerHtml("movie-desc", description);
    console.log("trailerUrl: " + trailerUrl);
    setElementAttr("movie-trailer","src", trailerUrl);
}

function openSearchPopup(){
    document.getElementById("search_popup").style.display = "block";
    document.getElementById("body-container").style.opacity = 0.5;
}

function closeSearchPopup() {
    document.getElementById("search_popup").style.display = "none";
    document.getElementById("body-container").style.opacity = 1;
}

async function openMoviePopup(div) {
    var movie_id = div.id.substring(10);
    console.log("movie_id: " + movie_id);
    var picture_path = div.src.substring(55);
    console.log("picture_path: " + picture_path);
    setElementAttr("movie_img_big","src", picture_path);
    await getMovieDetailsByMovieID(movie_id);
    moviePopup.style.display = "grid";
    bodyContainer.style.display = "none";
}

function closeMoviePopup() {
    changeMovieDetails({
        "ticket": "",
        "fsk": "",
        "length": "",
        "releaseDate": "",
        "description": "",
        "trailerUrl": ""
    })
    moviePopup.style.display = "none";
    bodyContainer.style.display = "grid";
}

function openReservationPopup() {
    moviePopup.style.display = "none";
    reservationPopup.style.display = "grid"
}

function closeReservationPopup() {
    moviePopup.style.display = "grid";
    reservationPopup.style.display = "none"
    for(let i = 0;i<btnIds.length;i++){
        setBtnClicked(btnIds[i],false);
    } 
    document.getElementById("continue-btn").style.display("none");
}

function setContinueBtnVisible(div) {
    for(let i = 0;i<btnIds.length;i++){
        if(div.id === btnIds[i]){
            setBtnClicked(div.id, true);
            continue;
        }
        setBtnClicked(btnIds[i], false);
    }
    document.getElementById("continue-btn").style.display("block");
}