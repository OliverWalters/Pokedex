const listaPokemon = document.getElementById("lista-pokemon");

for(let i = 1; i <= 151; i++){
datosPokemons(i);
}

function datosPokemons(id){
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(datos => datos.json())
.then(resultado => mostrarPokemon(resultado))
}

function mostrarPokemon(pokemon){ /*datos de un pokemon*/
const tiposTraducidos = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada'
  };

let tipos = pokemon.types.map(type => `<span class="${type.type.name} tipos"> ${tiposTraducidos[type.type.name]}</span>`);
tipos = tipos.join(''); 

const div = document.createElement("div");
div.classList.add("grid-item-pokemon");
div.innerHTML = `<button type="button" class="boton" onclick= redireccion(${pokemon.id})>
                <div class="pokemon">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="imagen-pokemons" alt="ImagenPokemons">
                <p><span class="numero-pokemons">N&deg; ${(pokemon.id.toString().padStart(3,0))}</span>  ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                ${tipos}
                </div> 
                </button>`;
listaPokemon.append(div);
}
function redireccion(id){
  location.href = `PokedexVista2.html?id=${id}`;
}


