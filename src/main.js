const form = document.getElementById('form-search-movies');
const searchField = document.getElementById('search-movies');
const moviesContainer = document.getElementById('movies-container');
const modalbody = document.getElementById('modal-body');
const filterGenres = document.getElementById('filter-genres')
const modalMovieTitle = document.getElementById('movie-modal-title')
const currentMovieDisplay = document.getElementById('current-movie-display')

const movieDataTMDB = app.getTopMoviesFromTMDB(tmdbApiKey);

let currentMovieList = [];

const createTemplateCard = movieList => {
	let templateCard = '';
	movieList.forEach((movie) => {
		const card = `
	  <div class="card col-md-3" id="${movie.imdb_id}">
	  <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" class="card-img-top" alt="${movie.title} poster">
	  <div class="card-body">
		<h5 class="card-title">${movie.title}</h5>
	  </div>
	</div>
	 `;
		templateCard += card;
	});
	moviesContainer.innerHTML = templateCard;
	createModal();
};

window.onload = async function () {
	const getGenres = await app.getMovieGenres(tmdbApiKey);
	const genres = Object.values(getGenres)

	genres.forEach(genresArr => {
		genresArr.forEach(genre => {
			filterGenres.innerHTML += `<option value='${genre.id}' name='${genre.name}'>${genre.name}</option>`
		});
	});

	const tenTopRatedMovies = await app.getTopMoviesFromTMDB(tmdbApiKey);
	createTemplateCard(tenTopRatedMovies);
	currentMovieList = tenTopRatedMovies
	currentMovieDisplay.innerHTML = 'Lo más destacado';
};

filterGenres.addEventListener('change', async (event)=>{
	
	const select = event.target;
	const selectedOption = select.options[select.selectedIndex];
    const value = selectedOption.getAttribute('value');
    const name = selectedOption.getAttribute('name');
	
	const selectedGenre = value;
	const gettingMoviesByGenre = await app.getMoviesByGenres(tmdbApiKey, selectedGenre);
	createTemplateCard(gettingMoviesByGenre);
	currentMovieList = gettingMoviesByGenre
	currentMovieDisplay.innerHTML = `Seleccionadas por ${name}`;
	return currentMovieList 
});

const createModal = () => {
	const allMovies = document.querySelectorAll('#movies-container > .card');

	allMovies.forEach((card) => {
		card.addEventListener('click', async (event) => {
			// Primero defino un objeto movie vacio
			let movie = {};
			const movieId = event.currentTarget.id;

			// Ahora invoco la otra api
			const gettingMovieOMDB = await app.getMovieByIMDB(movieId, omdbApiKey);

			const [movieTMDB] = currentMovieList.filter(
				movieFiltered => movieFiltered.imdb_id === movieId
			);

			const { overview, poster_path } = movieTMDB;
			movie = { ...gettingMovieOMDB, overview, poster_path }

			const {
				// realizo asignación por destructuring de la data
				Title,
				Year,
				imdbRating,
				Production
			} = movie;

			modalMovieTitle.innerHTML = `${Title}`

			modalbody.innerHTML = ` 
            <div>${Year}</div>
			<img src="https://image.tmdb.org/t/p/w185${poster_path}" class="card-img-top" alt="${Title} poster">
            <div><p>Rating</p>${imdbRating}</div>
			<div><p>Productora</p>${Production}</div>
			<p>${overview}</p>
			`;
			$('#modal').modal('show')
		});
	});
};

// Haciendo la busqueda

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const searchQuery = searchField.value;
	const searchResults = await app.getMoviesBySearchQuery(tmdbApiKey, searchQuery);

	currentMovieList = searchResults;
	currentMovieDisplay.innerHTML = `Resultados de "${searchQuery}"`;

	if (searchResults.length === 0) {
		moviesContainer.innerHTML = '<p> Lo sentimos, no existe ninguna pelicula con ese nombre :-( </p>';
	} else createTemplateCard(searchResults);
});

searchField.addEventListener('input', async (event) => {
	if (event.target.value === '') {
		const tenTopRatedMovies = await app.getTopMoviesFromTMDB(tmdbApiKey);
		createTemplateCard(tenTopRatedMovies);
		currentMovieList = tenTopRatedMovies
		currentMovieDisplay.innerHTML = 'Lo más destacado';
	}

})