
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
var movieIDs = [];

async function getMovieIds(){
    var url = generateUrl(`movieIDs`)
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getPicturePathByMovieID(movieID){
    var url = generateUrl(`picturePathByMovieID/` + movieID);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.text());
}

async function getMovieDetailsByMovieID(movie_id){
    var url = generateUrl(`movieByID/` + movie_id);
    console.log("url: " + url);
    return await doFetch(url).then((res)=>res.json());
}

async function getMoviePlayTimesByMovieID(movie_id){
    var url = generateUrl(`showsByMovieID/` + movie_id);
    console.log("url: " + url);
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

// async function getTicketDetails(ticket_id){
//     let url = generateUrl(`/ticketDetailsByID/` + ticket_id);
//     log("url: " + url);
//     let ticketDetails = (await doFetch(url).then((res) => res.json()));
// }
