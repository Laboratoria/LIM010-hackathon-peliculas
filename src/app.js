const tmdbApiKey = 'e83ff2d774d6c5b031e45a3bfbfcb919';
const omdbApiKey = '90e275bc';

const app = {
	getMoviesFromTMDB: async (tmdbApiKey)=> {		
		const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=es-ES&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&page=1&with_original_language=en`
		); // Obteniendo la data
		const { results } = await movies.json(); // Desesctructuro el objeto movies, obteniendo solo los results
		const moviesWithIMDBid = results.map(async (movie) => { // Busco el id de IMDB de la pelicula
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`);
			const { imdb_id } = await response.json(); // Desesctructuro el objeto response, obteniendo solo el id imdb
			return { ...movie, imdb_id }; // Creo un nuevo objeto con lo que devuelve movie y le añado el imdb_id
		});
		const resolvedPromisesArr = await Promise.all(moviesWithIMDBid); // moviesWithIMDBid me devuelve un array de promesas, entonces con Promise.All las resuelvo todas
		return resolvedPromisesArr;
	},

	getMovieByIMDB: async (movieId, omdbApiKey) => {
		const movie = await fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${omdbApiKey}`);

		const movieResolved = await movie.json();

		return movieResolved;
	},

	getMovieGenres: async (tmdbApiKey)=> {
		const genres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}&language=es-ES`)
		const allGenres = await genres.json();		
		return allGenres;
	},
	
	getMoviesByGenres: async (tmdbApiKey,genreId)=> {
		const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?&api_key=${tmdbApiKey}&language=es-ES&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&with_genres=${genreId}&with_original_language=en`);
		const { results } = await movies.json(); // Desesctructuro el objeto movies, obteniendo solo los results
		const moviesWithIMDBid = results.map(async (movie) => { // Busco el id de IMDB de la pelicula
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`);
			const { imdb_id } = await response.json(); // Desesctructuro el objeto response, obteniendo solo el id imdb
			return { ...movie, imdb_id }; // Creo un nuevo objeto con lo que devuelve movie y le añado el imdb_id
		});
		const resolvedPromisesArr = await Promise.all(moviesWithIMDBid); // moviesWithIMDBid me devuelve un array de promesas, entonces con Promise.All las resuelvo todas
		return resolvedPromisesArr;
	},

};

window.app = app;
window.tmdbApiKey = tmdbApiKey;
window.omdbApiKey = omdbApiKey;

