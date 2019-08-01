const form = document.getElementById('form-search-movies');
const searchField = document.getElementById('search-movies');
const moviesContainer = document.getElementById('movies-container');
let searchedForText = '';

/* const paintMovies = (movies)=>{
    movies.forEach(news => {
        console.log(news)
        moviesContainer.innerHTML += `
        <h2> ${news.headline.main} </h2>
        <p> ${news.abstract} </p>`;
    });
} */

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  moviesContainer.innerHTML = '';
  searchedForText = searchField.value;
  getMovies(searchedForText)
    .then(json => console.log(json));
});