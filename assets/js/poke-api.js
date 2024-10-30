const pokedex = {};

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name )
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokedex.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}



pokedex.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    // requisição no servidor da API
    return fetch(url)
    .then((response) => response.json())
    //exibe a lista de pokemons do objeto json
    .then((jsonBody) => jsonBody.results)
    // converte os pokemons em elementos <li>
    .then((pokemons) => pokemons.map(pokedex.getPokemonDetail))
    // pega os detalhes dos pokemons
    .then((detailRequests) => Promise.all(detailRequests))
    // converte os detalhes dos pokemons em objetos
    .then((pokemonsDetails) => pokemonsDetails)
}
