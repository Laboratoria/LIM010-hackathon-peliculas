const form = document.getElementById('form-search-movies');
const searchField = document.getElementById('search-movies');
const moviesContainer = document.getElementById('movies-container');
const modalContainer = document.getElementById('modal-container');

const movieData = app.getMoviesFromTMDB(tmdbApiKey);

window.onload = async () => {
    const results = await movieData;
    results.slice(0, 10).forEach((movie) => {
        moviesContainer.innerHTML += `
     <div class="card col-md-4" id="${movie.imdb_id}">
     <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${movie.title}</h5>
       <p class="card-text">${movie.overview}</p>
       <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
     </div>
   </div>
    `;
        createModal();
    });
};


const createModal = () => {
    const allMovies = document.querySelectorAll('#movies-container > .card');

    allMovies.forEach((card) => {
        card.addEventListener('click', async (event) => {
            const movieId = event.currentTarget.id; // currentTarget obtenemos el id del padre
            const gettingMovieOMDB = await app.getMovieByIMDB(movieId, omdbApiKey);
            console.log(gettingMovieOMDB);
            const {
                // realizo asignación por destructuring de la data
                Title,
                Year,
                Poster,
                imdbRating,
                Production
            } = gettingMovieOMDB;

            modalContainer.innerHTML += ` 
            <div>${Title}</div>
            <div>${Year}</div>
            <img src="${Poster}">
            <div><p>Rating</p>${imdbRating}</div>
            <div><p>Productora</p>${Production}</div>
            `;
            $('#movieId').modal('show')
        });
    });
};



const showModal = () => {
    modal.classList.add('visible');
    mask.classList.add('visible');
    modalBg.classList.add('visible');
};
