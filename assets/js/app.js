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

async function showTicketDetails(event,div){
    if(event.key === 'Enter'){
        let ticketID = div.value;
        let {ticketId, price, movieByMovieId, showByShowId, hallByHallId, seatBySeatId} = (await getTicketDetails(ticketID))
        let title = movieByMovieId.title;
        let startTime = showByShowId.startTime.substring(0,16);
        let hallId = hallByHallId.hallId;
        let seatId = seatBySeatId.seatId;
        swal({
            title: "Ticketdetails",
            text: "TicketID: " + ticketId + "\n" + 
                    "Film: " + title + "\n" + 
                    "Show: " + startTime + " Uhr \n" +
                    "Sitz: " + seatId + "\n" + 
                    "Halle: " + hallId + "\n" + 
                    "Preis: " + price + "€" ,
            button: false
        });
    } 
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

function aboutUs(){
    let corporateEmail = "cinema68@web.de";
    Swal.fire({
        title: 'Über uns',
        html: '<div class="align-left">Wir bei cineMA68 sind ein kleiner Betrieb deren 2 Gründer eine Vision haben. Unsere Vision ist es ein etwas anderes Kinoerlebnis zu schaffen. <br><br> Du fragst dich jetzt bestimmt was wir damit meinen, richtig? Naja, bei uns laufen immer genau die 10 Filme die unsere Kunden gerade sehen wollen. Ja richtig gehört, nicht wir bestimmen welche Filme laufen, sondern unsere Kunden. Wir bekommen regelmäßig Vorschläge zugesendet und die meist genannten 10 Filme nehmen wir dann in unser Programm für die nächsten 10 Tage auf. Unser Alleinstellungsmerkmal ist somit das wir die Filme zeigen die unsere Community sehen will und dazu dann das gewohnte Kinoambiente bieten. <br><br> Wenn auch du mitbestimmen willst welche Filme bei uns laufen dann schreib uns doch gerne eine E-Mail an die folgende Adresse: <br><br>' + corporateEmail + '<br><br><br>' + 'Dein cineMA68 Team!</div>',
        type: 'info',
        icon: 'info',
        iconColor: "#000000",
        confirmButtonText: "Alles klar",
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

async function setMovieDetails(movieID){
    let details = (await getMovieDetailsByMovieID(movieID));
    changeMovieDetails(details);
}

async function setMoviePlayTimes(movieID){
    let moviePlayTimes = (await getMoviePlayTimesByMovieID(movieID));
    changeMoviePlayTimes(moviePlayTimes);
}

async function openMoviePopup(div) {
    let movieID = div.id.substring(10);
    console.log("movie_id: " + movieID);
    let picturePath = div.src.substring(55);
    console.log("picture_path: " + picturePath);
    setElementAttr("movie_img_big","src", picturePath);
    await setMovieDetails(movieID);
    await setMoviePlayTimes(movieID);
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

function setTicketDetailsForReservationPopup(div) {
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
    let pickedMovieTitle = document.getElementById("movie-title").innerHTML;
    console.log("picked movie title: ", pickedMovieTitle);
    let pickedShowPlayTime = clickedBtn.innerHTML;
    let pickedShowPlayDate = document.getElementById("movie-play-time-date").innerHTML;
    let pickedShow = pickedShowPlayDate + " - " + pickedShowPlayTime + " Uhr";
    console.log("picked show play time: " + pickedShow);
    setElementInnerHtml("movie-title-seatplan", pickedMovieTitle);
    setElementInnerHtml("show-seatplan", pickedShow);
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
            button: false
        }).then(
            function(isConfirm){
                $("#your-data-form").submit();
            }
        )
    }
}

function init() {
    var visit = visitCount();
    var output = document.getElementById('cookie');
    output.innerHTML = visit;
}

function getCount(){
    var count = "";
    if (document.cookie){

        var countStart = document.cookie.indexOf("=") + 1;
        var countEnd = document.cookie.indexOf(";");
        if(countEnd == -1){
            countEnd = document.cookie.length;
        }
    count = document.cookie.substring(countStart, countEnd);
    }
    return count;
}

function visitCount(){
    var expire = 1000 * 60 * 60 * 24 * 365;
    var count = getCount();
    var number = 0;
    console.log("Vorher " + number)
    if (count != ""){
        number = parseInt(count) || 0; 
    }

    console.log("Nachher " + number)
    number = number + 1;
    setCount("Counter", number, expire);
    return(number);
}

function setCount(name, number, expire){
    var timeNow = new Date();
    var timeStop = new Date(timeNow.getTime() + expire);
    document.cookie = name + "=" + number + "; expires=" + timeStop.toGMTString() + ";";
}

window.addEventListener('DOMContentLoaded', init);
