
const apiUrl = 'cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000,1001,1002,1003,1004,1005,1006,1007,1008,1010]

function doFetch(url){
    var data = fetch(url)
    .then(response => response.text)
    .catch(error => console.error(error));
    return data;
}

function getPicturePathByMovieID(){
    for(var i = 0;i<movieIDs.length;i++){
        var picturePath = doFetch(apiUrl + "/picturePathByMovieID/" + movieIDs[i]);
        console.log(picturePath);
        document.getElementById("movie_img_" + movieIDs[i]).src=picturePath;
    }
}

getPicturePathByMovieID();