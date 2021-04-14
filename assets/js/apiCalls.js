
const API_URL = 'http://cinema-68.germanywestcentral.cloudapp.azure.com:8090'
const movieIDs = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1010] 

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

async function doFetch(url,format){
    var resp = await fetch(url)
    .then((res)=>res.format)
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
    shuffle(movieIDs)
    for(var i = 0; i < movieIDs.length; i++){
        var url = generateUrl(`picturePathByMovieID/` + movieIDs[i]);
        console.log("url: " + url);
        var picturePath = (await doFetch(url, "text()"));
        console.log("picturePath: " + picturePath);
        var img = document.createElement("img");
        img.setAttribute("class", "movie_img");
        img.setAttribute("id", "movie_img_" + movieIDs[i]);
        img.setAttribute("src", picturePath);
        img.setAttribute("onClick", "openMoviePopup(this)")
        document.getElementById("body-container").appendChild(img);
        // document.getElementById("movie_img" + movieIDs[i]).src = data;
    }
}    

// async function getMovieDetailsByMovieID(movie_id){
//     var url = generateUrl(`movie/` + movie_id);
//     console.log("url: " + url);
//     var detailsJson = (await doFetch(url));
//     doFetchUrl()
// }

getPicturePathByMovieID();