
const pokeApi = {}
// Função para converter dados da API

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Converte lista de tipos em variável
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json().then((pokemon) => {
            return convertPokeApiDetailToPokemon(pokemon);
        })
    );
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// Função para extrair detalhes do pokemon
pokeApi.getPokemonDetailsToProfile = (id) => {
    // URL de requisição
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
    // Retornando informações do pokemon tratadas
    return (
      fetch(url)
        // Trata o resultado da promise para json
        .then((response) => response.json())
        .then((pokemonDetails) => {
          return convertPokeApiDetailToPokemon(pokemonDetails);
        })
        .catch((error) => console.log(error))
    );
  };