
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
        // document.getElementById("movie_img" + movieIDs[i]).src = data;
    }
}    

async function getMovieDetailsByMovieID(movie_id){
    var url = generateUrl(`movie/` + movie_id);
    console.log("url: " + url);
    var details = (await doFetch(url).then((res)=>res.json()));
    var title = details.title;
    console.log("title: " + title);
}

getPicturePathByMovieID();