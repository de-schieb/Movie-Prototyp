const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'

async function getMovieIds(){
    let url = generateUrl(`movieIDs`)
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getPicturePathByMovieID(movieID){
    let url = generateUrl(`picturePathByMovieID/` + movieID);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.text());
}

async function getMovieDetailsByMovieID(movie_id){
    let url = generateUrl(`movieByID/` + movie_id);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getMoviePlayTimesByMovieID(movie_id){
    let url = generateUrl(`showsByMovieID/` + movie_id);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getTicketDetails(ticketID){
    let url = generateUrl(`/ticketDetailsByID/` + ticketID);
    log("url: " + url);
    return await doFetch(url).then((res) => res.json());
}

function sendEmailToCustomer(params){
    emailjs.send("service_mailjet","template_cinema68_pro", params)
                .then(function(){
                    console.log('SUCCESS!')
                }, function(error){
                    console.log('FAILED... ', error);
                });
}
