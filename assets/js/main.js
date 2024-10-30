const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

// define o número máximo de pokemons que podem ser carregados
const maxRecords = 151
// define quantos pokemons devem ser carregados por vez
const limit = 10
// define qual o offset inicial, ou seja, qual o primeiro pokemon que deve ser carregado
let offset = 0;

// essa função é responsável por converter um pokemon em um elemento <li> que pode ser adicionado na lista
function convertPokemonToLi(pokemon) {
    return `
        <li class="ordem-pk ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// essa função é responsável por carregar os pokemons com base no offset e limit
function loadPokemonItens(offset, limit) {
    // chama a função getPokemons do arquivo poke-api.js e passa o offset e limit como parâmetro
    pokedex.getPokemons(offset, limit).then((pokemons = []) => {
        // converte os pokemons em elementos <li>
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        // adiciona os elementos <li> na lista de pokemons
        pokemonList.innerHTML += newHtml
    })
}

// carrega os primeiros pokemons com base no offset e limit
loadPokemonItens(offset, limit)

// adiciona um evento de click no botão para carregar mais pokemons
loadMoreButton.addEventListener('click', () => {
    // incrementa o offset para carregar os próximos pokemons
    offset += limit
    // calcula quantos pokemons devem ser carregados na próxima página
    const qtdRecordsWithNexPage = offset + limit

    // se o número de pokemons que devem ser carregados for maior que o número máximo de pokemons
    if (qtdRecordsWithNexPage >= maxRecords) {
        // calcula quantos pokemons devem ser carregados para completar a lista
        const newLimit = maxRecords - offset
        // carrega os pokemons com o novo limit
        loadPokemonItens(offset, newLimit)

        // remove o botão para carregar mais pokemons pois não há mais pokemons para carregar
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // carrega os próximos pokemons com base no offset e limit
        loadPokemonItens(offset, limit)
    }
})  