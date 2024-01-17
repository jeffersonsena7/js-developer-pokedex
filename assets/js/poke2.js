const selectPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const pokemon = await res.json()
  displayPopup(pokemon)
}

const displayPopup = (pokemon) => {

  const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  const photo = pokemon.sprites.other.dream_world.front_default
  const dataHtml = `

    <div id="closeBotton" onClick="closePage()">
      <img src="./assets/img/1112.png" alt="seta">
    </div>
      <li class="pokemon ${pokemon.type}">
      <span class="name">${pokemon.name}</span>
      <span class="number">#${pokemon.id.toString()}</span>
      
      <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
      </div>
      <div>
        <img src="${photo}"alt="${pokemon.name}">
          
      </div>
      <div>  
        <h4>Base Dados</h4>
      </div>
      <div>      
        ${pokemon.stats.map((name_stats) => `<p class="${type}">${name_stats.stat.name}</p>`).join('')}
      </div>
      <div> ${pokemon.stats.map((base_stats) => `<p class="${type}">
        ${base_stats.base_stat}</p>`).join('')}
      </div>
     
      <div>
          <p>Height: ${(pokemon.height / 10).toFixed(2)}m</p>
          <p>Weight: ${(pokemon.weight / 10)}kg</p>
      </div>
         
    `

  pokemonList.innerHTML = dataHtml + pokemonList.innerHTML
}


//Função JavaScript para manipular o clique e redirecionar
function closePage() {
  // Obtenha a URL da página de destino do atributo href
  const urlDestino = 'index.html';
  // Redirecione para a página de destino
  window.location.href = urlDestino;
}

