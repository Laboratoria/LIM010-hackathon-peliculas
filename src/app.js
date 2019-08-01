const tmdbApiKey = 'e83ff2d774d6c5b031e45a3bfbfcb919';
const omdbApiKey = '90e275bc';

const app = {
	getMoviesFromTMDB: async (tmdbApiKey)=> {
		// Obteniendo la data
		const movies = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=es-ES&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&page=1&with_original_language=en`
		);

		// Desesctructuro el objeto movies, obteniendo solo los results
		const { results } = await movies.json();

		const moviesWithIMDBid = results.map(async (movie) => {
			// Busco el id de IMDB de la pelicula
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`
			);
			// Desesctructuro el objeto response, obteniendo solo el id imdb
			const { imdb_id } = await response.json();
			// Creo un nuevo objeto con lo que devuelve movie y le añado el imdb_id
			return { ...movie, imdb_id };
		});
		// moviesWithIMDBid me devuelve un array de promesas, entonces con Promise.All las resuelvo todas

		const resolvedPromisesArr = await Promise.all(moviesWithIMDBid);
		return resolvedPromisesArr;
	},

	getMovieByIMDB: async (movieId, omdbApiKey) => {
		const movie = await fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${omdbApiKey}`);

		const movieResolved = await movie.json();

		return movieResolved;
	},

	getMovieByGenre: async (genreId, tmdbApiKey)=> {
		const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?&apikey=${omdbApiKey}&language=es-ES&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&with_genres=${genreId}&with_original_language=en`);

		const movieResolved = await movie.json();
		
		return movieResolved;	
	} // aun no sirve, devuelve una promesa pendiente :-(

};

window.app = app;
window.tmdbApiKey = tmdbApiKey;
window.omdbApiKey = omdbApiKey;

