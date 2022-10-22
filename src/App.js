import './App.css';

import { useState } from 'react';

function App() {
  const [pokemons, setPokemons] = useState([])
  var listPokemons = []
  
  const options = {
    method: 'GET',
  };

  function getPokemons() {

    fetch('https://pokeapi.co/api/v2/pokemon', options)
    .then(response => response.json())
    .then(response => { 
      response.results.forEach(element => {
        fetch(element.url, options)
        .then(responsePokemon => responsePokemon.json())
        .then(responsePokemon => { 
          listPokemons.push(responsePokemon);
          setPokemons([...listPokemons]);})
        .catch(err => console.error(err));
      })
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <div className="App-body">
        <button className="listar" onClick={getPokemons}>Buscar Pokemons</button>

        <div className="pokemons">
          {pokemons && pokemons.map((poke, index) => (
            <div className="item-container" key={poke.Id}>
              <p>Pokemons: <span>{poke.name}</span></p>
              <img src={poke.sprites.front_default}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;