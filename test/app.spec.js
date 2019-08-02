global.window = global;
global.assert = require('chai').assert;
require('../src/app.js');
require('./app.spec.js');
/* 
describe('getMoviesFromTMDB', () =>{
  it('debería retornar un array', () => {
      expect(getMoviesFromTMDB(app, ))
  });
});


describe('filterEggs', () => {
  it('debería retornar un array con los pokemones ordenados por el tipo de huevo', () => {
    expect(filterEggs(data, '2 km')).toEqual(outputEgg);
  });
}); */

describe('app', () => {
  it('deberìa ser un objeto', () => {
    expect(typeof app).toBe('object');
  });
}); 

