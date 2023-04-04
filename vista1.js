const listaPokemon = document.getElementById("lista-pokemon");

datosPokemons();

async function datosPokemons() {
  for(let i = 1; i <= 151; i++){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(datos => datos.json())
      .then(resultado => mostrarPokemon(resultado))
    }
}

function mostrarPokemon(pokemon){ /*datos de un pokemon*/
const tiposTraducidos = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'El&eacute;ctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Ps&iacute;quico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Drag&oacute;n',
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
document.addEventListener("keyup", e => {
  if(e.target.matches("#buscador")){
    document.querySelectorAll(".grid-item-pokemon").forEach(pokemon => {
      if(pokemon.textContent.toLocaleLowerCase().includes(e.target.value)){
        pokemon.classList.remove("filtro")
      }
      else{
        pokemon.classList.add("filtro")
      }
    })
  }
})



