
//Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  
   while (0 !== currentIndex) {
  
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
  
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
  }
  
  return array;
}

function setElementInnerHtml(elementId,value){
     document.getElementById(elementId).innerHTML = value;
 }

function setElementAttr(elementId,attr,value){
    document.getElementById(elementId).setAttribute(attr,value);
}

function setBtnClicked(id,clicked){
  if(clicked){
    document.getElementById(id).style.borderColor = "var(--first-main-color)";
    document.getElementById(id).style.color = "var(--accent-color)";
  } else{
    document.getElementById(id).style.borderColor = "var(--second-main-color";
    document.getElementById(id).style.color = "var(--first-main-color)";
  }
}

function createMovieImgElement(movieId, path){
  let img = document.createElement("img");
  img.setAttribute("class", "movie_img");
  img.setAttribute("id", "movie_img_" + movieId);
  img.setAttribute("src", path);
  img.setAttribute("onclick", "openMoviePopup(this)")
  document.getElementById("body-container").appendChild(img);
}

function changeMovieDetails(details){
  let {title, fsk, length, releaseDate, description, trailerUrl} = details;
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

function changeMoviePlayTimes(moviePlayTimes){
  let moviePlayTimeFields = ["first-time-btn", "second-time-btn", "third-time-btn", "fourth-time-btn"];
  let unformattedMoviePlayTimeDate = moviePlayTimes[0].substring(0,10);
  let moviePlayTimeYear = unformattedMoviePlayTimeDate.substring(0,4);
  let moviePlayTimeMonth = unformattedMoviePlayTimeDate.substring(5,7);
  let moviePlayTimeDay = unformattedMoviePlayTimeDate.substring(8,10);
  let formattedMoviePlayTimeDate = moviePlayTimeDay + "." + moviePlayTimeMonth + "." + moviePlayTimeYear;
  setElementInnerHtml("movie-play-time-date",formattedMoviePlayTimeDate);
  for(let i = 0; i<moviePlayTimes.length; i++){
      setElementInnerHtml(moviePlayTimeFields[i],moviePlayTimes[i].substring(10,16));
  }
}

async function doFetch(url){
  let resp = await fetch(url)
  .catch(handleGeneralError);
  return resp;
}

function generateUrl(path){
  let url = `${API_URL}/${path}`;
  return url;
}

function handleGeneralError(error) {
  log('Error: ', error.message);
  alert(error.message || 'Internal Server');
}