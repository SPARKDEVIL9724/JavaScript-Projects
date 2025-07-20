const apiKey = '9ee4e138';

const containerDiv = document.querySelector('.container');
const searchMovieButton = document.querySelector('.search-movie');
const inputMovieName = document.querySelector('.movie-name-input');
const genre = document.querySelector('.genre');
const runtime = document.querySelector('.runtime');
const rated = document.querySelector('.rated');
const director = document.querySelector('.director');
const release = document.querySelector('.release-date');
const description = document.querySelector('.movie-description');
const rating = document.querySelector('.imdb-rating');
const title = document.querySelector('.movie-title');

function changeMovieName(Name){
    const arr = Name.split(' ');
    Name = arr.join('+');
    return Name;
}

function changeMovieData(data){
    rated.textContent = `Rated: ${data.Rated}`;
    description.textContent = `Description: ${data.Plot}`;
    rating.textContent = `IMDb Rating: ${data.imdbRating} \n IMDb ID: ${data.imdbID}`;
    title.textContent = data.Title;
    director.textContent = `Director: ${data.Director}`;
    genre.textContent = `Genre: ${data.Genre}`;
    release.textContent = `Release Date: ${data.Released}`;
    runtime.textContent = `Runtime: ${data.Runtime}`;
}

function createPoster(posterLink, name){
    const poster = document.querySelector('.movie-poster');
    poster.src = posterLink;
    poster.alt = name;
}

async function getMovieData(link){
    promise = await fetch(link);
    const movieData = await promise.json();
    if(movieData.Response === 'True'){
        createPoster(movieData.Poster, movieData.Title);
        changeMovieData(movieData);
    }
    else{
        title.textContent = movieData.Error;
    }
}

// events
searchMovieButton.addEventListener('click', () => {
    let movieName = inputMovieName.value;
    movieName = changeMovieName(movieName);
    const link = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`;
    getMovieData(link);
});

inputMovieName.addEventListener('keydown' , (e) => {
    if(e.key === 'Enter'){
        searchMovieButton.click();
    }
});
