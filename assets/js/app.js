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


// async function showTicketDetails(ticket_id){

// }

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

function aboutUs(){
    let corporate_email = "cinema68@web.de";
    swal({
        title: "Über uns",
        text: "Wir bei cineMA68 sind ein kleiner Betrieb deren 2 Gründer eine Vision haben. Unsere Vision ist es ein etwas anderes Kinoerlebnis zu schaffen. \n\n Du fragst dich jetzt bestimmt was wir damit meinen, richtig? Naja, bei uns laufen immer genau die 10 Filme die unsere Kunden gerade sehen wollen. Ja richtig gehört, nicht wir bestimmen welche Filme laufen, sondern unsere Kunden. Wir bekommen regelmäßig Vorschläge zugesendet und die meist genannten 10 Filme nehmen wir dann in unser Programm für die nächsten 10 Tage auf. Unser Alleinstellungsmerkmal ist somit das wir die Filme zeigen die unsere Community sehen will und dazu dann das gewohnte Kinoambiente bieten. \n\n Wenn auch du mitbestimmen willst welche Filme bei uns laufen dann schreib uns doch gerne eine E-Mail an die folgende Adresse: \n\n" + corporate_email + "\n\n\n" + "Dein cineMA68 Team!",
        type: "info",
        icon: "info",
        button: false,
        timer: 35000
    })
}

async function setPicturePathsOnStartUp(){
    let movieIDs = (await getMovieIds());
    shuffle(movieIDs);
    for(let i = 0; i < movieIDs.length; i++){
        let picturePath = (await getPicturePathByMovieID(movieIDs[i]));
        console.log("picturePath: " + picturePath);
        createMovieImgElement(movieIDs[i], picturePath);
    }
}

setPicturePathsOnStartUp();

async function setMovieDetails(movie_id){
    let details = (await getMovieDetailsByMovieID(movie_id));
    changeMovieDetails(details);
}

async function setMoviePlayTimes(movie_id){
    let moviePlayTimes = (await getMoviePlayTimesByMovieID(movie_id));
    changeMoviePlayTimes(moviePlayTimes);
}

async function openMoviePopup(div) {
    let movie_id = div.id.substring(10);
    console.log("movie_id: " + movie_id);
    let picture_path = div.src.substring(55);
    console.log("picture_path: " + picture_path);
    setElementAttr("movie_img_big","src", picture_path);
    await setMovieDetails(movie_id);
    await setMoviePlayTimes(movie_id);
    moviePopup.style.display = "grid";
    bodyContainer.style.display = "none";
}

function closeMoviePopup() {
    changeMovieDetails({
        "title": "",
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

function setShowBtnClicked(div) {
    setContinueBtnVisible(div);
    setTicketDetails();
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

function setTicketDetails(){
    let picked_movie_title = document.getElementById("movie-title").innerHTML;
    console.log("picked movie title: ", picked_movie_title);
    let picked_show_play_time = clickedBtn.innerHTML;
    let picked_show_play_date = document.getElementById("movie-play-time-date").innerHTML;
    let picked_show = picked_show_play_date + " - " + picked_show_play_time;
    console.log("picked show play time: " + picked_show);
    setElementInnerHtml("movie-title-seatplan", picked_movie_title);
    setElementInnerHtml("show-seatplan", picked_show);
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
    let params = {
            email: document.querySelector("#your-email").value,
            firstname: document.querySelector("#your-firstname").value,
            lastname: document.querySelector("#your-lastname").value,
            movie: document.querySelector("#movie-title-seatplan").innerHTML,
            show: document.querySelector("#show-seatplan").innerHTML,
            price: document.querySelector("#total-price-seatplan").innerHTML
    };
    if(reservationForm.reportValidity()){
        sendEmailToCustomer(params);
        swal({
            title: "Ticketreservierung erfolgreich!",
            text: "Eine Mail mit den Reservierungsdetails wurde an die folgendene Mail-Adresse gesendet: " + params.email + "",
            type: "success",
            icon: "success",
            confirmButtonText: "Okay!",
        }).then(
            function(isConfirm){
                $("#your-data-form").submit();
            }
        )
    }
}
