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
    normal: 'normal',
    fire: 'fuego',
    water: 'agua',
    electric: 'eléctrico',
    grass: 'planta',
    ice: 'hielo',
    fighting: 'lucha',
    poison: 'veneno',
    ground: 'tierra',
    flying: 'volador',
    psychic: 'psíquico',
    bug: 'bicho',
    rock: 'roca',
    ghost: 'fantasma',
    dragon: 'dragón',
    dark: 'siniestro',
    steel: 'acero',
    fairy: 'hada'
  };



let tipos = pokemon.types.map(type => `<span class="${type.type.name} tipos"> ${tiposTraducidos[type.type.name].charAt(0).toUpperCase() + tiposTraducidos[type.type.name].slice(1)}</span>`);
tipos = tipos.join(''); 

const div = document.createElement("div");
div.classList.add("pokemon");
div.innerHTML = `<img src="${pokemon.sprites.other["official-artwork"].front_default}" class="imagen-pokemons" alt="ImagenPokemons">
                <p><span class="numero-pokemons">N&deg; ${(pokemon.id.toString().padStart(3,0))}</span>  ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                ${tipos}`;
listaPokemon.append(div);
}


