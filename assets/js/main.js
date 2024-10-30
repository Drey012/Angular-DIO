const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const select = document.getElementById('select-generation')
const section = document.getElementById('main')

var generation;
var maxRecords;
var offset;

function atualizarValores() {
    offset = 0;
    if (generation == "Gen 1") {
        maxRecords = 151;
        offset = 0;
    } else if (generation == "Gen 2") {
        maxRecords = 251;
        offset = 151;
    } else if (generation == "Gen 3") {
        maxRecords = 386;
        offset = 251;
    } else if (generation == "Gen 4") {
        maxRecords = 494;
        offset = 386;
    } else if (generation == "Gen 5") {
        maxRecords = 649;
        offset = 494;
    } else if (generation == "Gen 6") {
        maxRecords = 721;
        offset = 649;
    } else if (generation == "Gen 7") {
        maxRecords = 809;
        offset = 721;
    }
}

// Chamar a função no carregamento da página
atualizarValores();

// Chamar a função no evento change do select
select.addEventListener('change', () => {
    generation = select.value;
    atualizarValores();
    pokemonList.innerHTML = ''; // Adicione essa linha para limpar a lista
    loadPokemonItens(offset, limit);
});


// define quantos pokemons devem ser carregados por vez
const limit = 10

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
                     alt="${pokemon.name}"
                     title="${pokemon.name}">
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

        pokemonList.innerHTML += '<hr/>'
        
    } else {
        // carrega os próximos pokemons com base no offset e limit
        loadPokemonItens(offset, limit)
    }
})  