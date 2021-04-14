
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1010] 

async function doFetch(url){
    return await fetch(url)
    .then((res) => res.text())
    .then((data) => console.log(data))
    .catch(handleGeneralError);
}

function generateUrl(path){
    const url = `${API_URL}/${path}`;
    return url;
}

function handleGeneralError(error) {
    log('Error: ', error.message);
    alert(error.message || 'Internal Server');
}

function setPicturePath(data, i){
    console.log("picturePath: " + data);
    document.getElementById("movie_img_" + movieIDs[i]).src = data;
}

function getPicturePathByMovieID(){
    for(var i = 0; i < movieIDs.length; i++){
        var url = generateUrl(`picturePathByMovieID/` + movieIDs[i]);
        console.log("url: " + url);
        var picturePath = doFetch(url);
        setPicturePath(picturePath, i);
    }
}

getPicturePathByMovieID();