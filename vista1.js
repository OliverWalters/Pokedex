const listaPokemon = document.getElementsByClassName("lista-pokemon")
for(let i = 1; i <= 151; i++){
datosPokemons(i);
}

function datosPokemons(id){
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(datos => datos.json())
.then(resultado => mostrarPokemon(resultado))
}

function mostrarPokemon(pokemon){ /*datos de un pokemon*/
const div = document.createElement("div");
div.classList.add("pokemon");
div.innerHTML = `<img src="${pokemon.sprites.front_default}" class="imagen-pokemons" alt="ImagenPokemons">
                <p><span class="numero-pokemons">N&deg; ${(pokemon.id.toString().padStart(3,0))}</span>  ${pokemon.name}</p>
                <p>Tipo del pok&eacute;mon</p>`;
listaPokemon[0].append(div);
}


