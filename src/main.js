const form = document.getElementById('form-search-movies');
const searchField = document.getElementById('search-movies');
const moviesContainer = document.getElementById('movies-container');
const modalbody = document.getElementById('modal-body');
const filterGenres = document.getElementById('filter-genres')

const movieDataTMDB = app.getTopMoviesFromTMDB(tmdbApiKey);

const createTemplateCard = movieList => {
	let templateCard = '';
	movieList.slice(0, 10).forEach((movie) => {
		const card = `
	  <div class="card col-md-4" id="${movie.imdb_id}">
	  <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="card-img-top" alt="${movie.title} poster">
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
			filterGenres.innerHTML += `<option value='${genre.id}'>${genre.name}</option>`
		});
	});

	const tenTopRatedMovies = await app.getTopMoviesFromTMDB(tmdbApiKey);
	createTemplateCard(tenTopRatedMovies);
};

filterGenres.addEventListener('change', async(event) => {
	const selectedGenre = event.target.value;
	const gettingMoviesByGenre = await app.getMoviesByGenres(tmdbApiKey,selectedGenre);
	createTemplateCard(gettingMoviesByGenre);
});

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

			modalbody.innerHTML = ` 
            <div>${Title}</div>
            <div>${Year}</div>
            <img src="${Poster}">
            <div><p>Rating</p>${imdbRating}</div>
			<div><p>Productora</p>${Production}</div>
			<p>${overview}</p>
			`;
			$('#modal').modal('show')
		});
	});
};
