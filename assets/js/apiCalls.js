
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
var movieIDs = [];

async function doFetch(url){
    var resp = await fetch(url)
    .catch(handleGeneralError);
    return resp;
}

function generateUrl(path){
    const url = `${API_URL}/${path}`;
    return url;
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

async function getMovieIds(){
    var url = generateUrl(`movieIDs`)
    console.log("url: " + url);
    movieIDs = (await doFetch(url).then((res)=>res.json()));
}

async function getPicturePathByMovieID(){
    await getMovieIds();
    shuffle(movieIDs);
    for(var i = 0; i < movieIDs.length; i++){
        var url = generateUrl(`picturePathByMovieID/` + movieIDs[i]);
        console.log("url: " + url);
        var picturePath = (await doFetch(url).then((res)=>res.text()));
        console.log("picturePath: " + picturePath);
        createMovieImgElement(movieIDs[i], picturePath);
    }
}    

async function getMovieDetailsByMovieID(movie_id){
    var url = generateUrl(`movieByID/` + movie_id);
    console.log("url: " + url);
    var details = (await doFetch(url).then((res)=>res.json()));
    changeMovieDetails(details);
}
