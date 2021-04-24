const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'

async function getMovieIds(){
    let url = generateUrl(`movieIDs`);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getPicturePathByMovieID(movieID){
    let url = generateUrl(`picturePathByMovieID/` + movieID);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.text());
}

async function getMovieDetailsByMovieID(movieID){
    let url = generateUrl(`movieByID/` + movieID);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getMoviePlayTimesByMovieID(movieID){
    let url = generateUrl(`showsByMovieID/` + movieID);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getMovieIDByMovieTitle(movieTitle){
    let url  = generateUrl(`movieIDByTitle/` + movieTitle);
    console.log("url: " + url);
    return await doFetch(url).then((res) => res.text());
}

async function getShowIDByMovieIDAndStartTime(movieID, startTime){
    let url = generateUrl(`showIDByMovieIDAndStartTime/`+ movieID + `/` + startTime);
    console.log("url: " + url);
    return await doFetch(url).then((res) => res.text());
}

async function getTicketDetailsByTicketID(ticketID){
    let url = generateUrl(`ticketDetailsByID/` + ticketID);
    log("url: " + url);
    return await doFetch(url).then((res) => res.json());
}

async function getSeatplanByShowID(showID){
    let url = generateUrl(`seatPlanByShowID/`+ showID);
    log("url: " + url);
    return await doFetch(url).then((res) => res.json());
}

async function postTicketDetails(ticketPrice,movieID,showID,hallID,seatID,firstName,lastName){
    let url = generateUrl(`postTicket/` + price + `/` + movieID + `/` + showID + `/` + hallID + `/` + seatID + `/` + firstName + `/` + lastName );
    log("url: " + url);
    await doPost(url);
};

async function getTicketIDs(movieID,showID,seatID){
    let url = generateUrl(`getTicketIDByMovieIDAndShowIDAndSeatID/` + movieID + `/` + showID + `/` + seatID);
    log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

function sendEmailToCustomer(params){
    emailjs.send("service_mailjet","template_cinema68_pro", params)
                .then(function(){
                    console.log('SUCCESS!')
                }, function(error){
                    console.log('FAILED... ', error);
                });
}
