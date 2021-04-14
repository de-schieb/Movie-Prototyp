
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009] 

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

async function getPicturePathByMovieID(){
    shuffle(movieIDs);
    for(var i = 0; i < movieIDs.length; i++){
        var url = generateUrl(`picturePathByMovieID/` + movieIDs[i]);
        console.log("url: " + url);
        var picturePath = (await doFetch(url).then((res)=>res.text()));
        console.log("picturePath: " + picturePath);
        createMovieImgElement(movieIDs[i],picturePath);
    }
}    

async function getMovieDetailsByMovieID(movie_id){
    var url = generateUrl(`movieByID/` + movie_id);
    console.log("url: " + url);
    var details = (await doFetch(url).then((res)=>res.json()));
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

getPicturePathByMovieID();