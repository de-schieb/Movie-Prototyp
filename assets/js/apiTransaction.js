// Initial Values
const MOVIE_DB_API = '647031bce9dfa4c325d76540eadbb638';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

function doHttpRequest(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function doHttpRequestWithoutOnComplete(url, onError) {
    const result = null;
    fetch(url)
        .then((res) => res.json())
        .then((data) => result = data)
        .catch(onError);
        log("result: " + result);
        return result;
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}


function searchTopRatedMovies() {
    const url = generateMovieDBUrl(`/movie/top_rated`);
    const render = renderMovies.bind({ title: 'Top Rated Movies' })
    doHttpRequest(url, render, handleGeneralError);
}

function searchTrendingMovies() {
    const url = generateMovieDBUrl('/trending/movie/day');
    const render = renderMovies.bind({ title: 'Trending Movies' })
    doHttpRequest(url, render, handleGeneralError);
}


function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    const render = renderMovies.bind({ title: 'Upcoming Movies' })
    doHttpRequest(url, render, handleGeneralError);
}

function searchPopularMovie() {
    const url = generateMovieDBUrl('/movie/popular');
    const render = renderMovies.bind({ title: 'Popular Movies' });
    doHttpRequest(url, render, handleGeneralError);
}

// Invoke a different function for search movies
function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    doHttpRequest(url, renderSearchMovies, handleGeneralError);
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    doHttpRequest(url, render, handleGeneralError);
}

function getProviderOfMovie(movieId){
    const url = generateMovieDBUrl(`/movie/${movieId}/watch/provider`)
    return doHttpRequestWithoutOnComplete(url,handleGeneralError);
}