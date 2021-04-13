
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1010]

function doFetch(url){
    return fetch(url)
    .then(data => console.log("data: " + data))
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

function getPicturePathByMovieID(){
    for(var i = 0;i<movieIDs.length;i++){
        var picturePath = doFetch(generateUrl("picturePathByMovieID/" + movieIDs[i]));
        console.log(picturePath);
        document.getElementById("movie_img_" + movieIDs[i]).src=picturePath;
    }
}

getPicturePathByMovieID();