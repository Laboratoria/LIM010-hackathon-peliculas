const form = document.getElementById('form-search-movies');
const searchField = document.getElementById('search-movies');
const moviesContainer = document.getElementById('movies-container');
const modalContainer = document.getElementById('modal-container');

const movieDataTMDB = app.getMoviesFromTMDB(tmdbApiKey);

window.onload = async () => {
	const results = await movieDataTMDB;
	results.slice(0, 10).forEach((movie) => {
		moviesContainer.innerHTML += `
     <div class="card col-md-4" id="${movie.imdb_id}">
     <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${movie.title}</h5>
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
			// Primero defino un objeto movie vacio
			let movie = {};

			const movieId = event.currentTarget.id;
			// Invoco la funcion movieDataTMDB con await
			const moviesFromTMDB = await movieDataTMDB;
			// Ahora invoco la otra api
			const gettingMovieOMDB = await app.getMovieByIMDB(movieId, omdbApiKey);
			
			const [movieTMDB] = moviesFromTMDB.filter(
				movieFiltered => movieFiltered.imdb_id === movieId 
			);

			const { overview } = movieTMDB;
			movie = { ...gettingMovieOMDB, overview }

			const {
				// realizo asignación por destructuring de la data
				Title,
				Year,
				Poster,
				imdbRating,
				Production
			} = movie;

			modalContainer.innerHTML = ` 
            <div>${Title}</div>
            <div>${Year}</div>
            <img src="${Poster}">
            <div><p>Rating</p>${imdbRating}</div>
			<div><p>Productora</p>${Production}</div>
			<p>${overview}</p>
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
