const log = console.log;

// Selecting elements from the DOM
const searchButton = document.querySelector('#search');
const moviePopup = document.querySelector('#movie-popup');
const reservationPopup = document.querySelector('#reservation-popup')
const bodyContainer = document.querySelector('#body-container');
const reservationForm = document.querySelector("#your-data-form");

const btnIds = ["first-time-btn","second-time-btn","third-time-btn","fourth-time-btn"];

var clickedBtn;

window.onload = function() { setInterval( updateTimeStamp, 100); }

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

function updateTimeStamp(){
    let timestamp, day, month, year, hour, minute, track;
    track = 0;

    timestamp = new Date();
    track += 1;
    day = String(timestamp.getDate()).padStart(2, "0");
    month = String(timestamp.getMonth() + 1).padStart(2, "0");
    year = timestamp.getFullYear();
    hour = String(timestamp.getHours()).padStart(2, "0");
    minute = String(timestamp.getMinutes()).padStart(2, "0");
    document.getElementById("header_timestamp").innerHTML = day + "." + month + "." + year +" - " + hour + ':' + minute;
}

function changeMoviePlayTimes(moviePlayTimes){
    let moviePlayTimeFields = ["first-time-btn", "second-time-btn", "third-time-btn", "fourth-time-btn"];
    let unformattedMoviePlayTimeDate = moviePlayTimes[0].substring(0,10);
    let moviePlayTimeYear = unformattedMoviePlayTimeDate.substring(0,4);
    let moviePlayTimeMonth = unformattedMoviePlayTimeDate.substring(5,7);
    let moviePlayTimeDay = unformattedMoviePlayTimeDate.substring(8,10);
    let formattedMoviePlayTimeDate = moviePlayTimeDay + "." + moviePlayTimeMonth + "." + moviePlayTimeYear;
    setElementInnerHtml("movie-play-time-date",formattedMoviePlayTimeDate);
    for(let i = 0; i<moviePlayTimes.length; i++){
        setElementInnerHtml(moviePlayTimeFields[i],moviePlayTimes[i].substring(10,16));
    }
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
    await getMoviePlayTimesByMovieID(movie_id);
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
    document.getElementById("continue-btn").style.display = "none";
    for(let i = 0;i<btnIds.length;i++){
        setBtnClicked(btnIds[i], false);
    }
}

function setTicketDetails(){
    let picked_movie_title = document.getElementById("movie-title").innerHTML;
    console.log("picked movie title: ", picked_movie_title);
    let picked_show_play_time = clickedBtn.innerHTML;
    console.log("picked show play time: " + picked_show_play_time);
    setElementInnerHtml("movie-title-seatplan", picked_movie_title);
    setElementInnerHtml("show-seatplan", picked_show_play_time);
}

function setShowBtnClicked(div) {
    setContinueBtnVisible(div);
    setTicketDetails;
}

function setContinueBtnVisible(div) {
    for(let i = 0;i<btnIds.length;i++){
        if(div.id === btnIds[i]){
            setBtnClicked(div.id, true);
            clickedBtn = div;
            continue;
        }
        setBtnClicked(btnIds[i], false);
    }
    document.getElementById("continue-btn").style.display= "block";
}

function openReservationPopup() {
    moviePopup.style.display = "none";
    reservationPopup.style.display = "grid"
}

function closeReservationPopup() {
    moviePopup.style.display = "grid";
    reservationPopup.style.display = "none"
}

function giveResponseToTicketReservation(){
    let templateParams = {
            email: document.querySelector("#your-email").value,
            firstname: document.querySelector("#your-firstname").value
    };
    if(reservationForm.reportValidity()){
        emailjs.send("service_mailjet","template_cineMA68",templateParams)
                .then(function(){
                    console.log('SUCCESS!')
                }, function(error){
                    console.log('FAILED... ', error);
                });
        swal({
            title: "Ticketreservierung erfolgreich!",
            text: "Eine Mail mit den Reservierungsdetails wurde an die folgendene Mail-Adresse gesendet: " + templateParams.email + "",
            type: "success",
            icon: "success",
            confirmButtonText: "Okay!",
            confirmButtonColor: "#000000"
        }).then(
            function(isConfirm){
                $("#your-data-form").submit();
            }
        )
    }
}
