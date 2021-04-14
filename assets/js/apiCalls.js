
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1010] 

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
    var {title, fsk, length, releaseDate, descriptioh, trailerUrl} = details;
    console.log("title: " + title);
    console.log("title: " + fsk);
    console.log("title: " + length);
    console.log("title: " + releaseDate);
    console.log("title: " + descriptioh);
    console.log("title: " + trailerUrl);
}

getPicturePathByMovieID();