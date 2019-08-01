const app = {
  getMovies: movieTitle =>{
    return fetch(`http://www.omdbapi.com/?s=${movieTitle}&plot=full&apikey=90e275bc`)
    
      .then(function(response) {
        return response.json();
      });
  }
    
};
