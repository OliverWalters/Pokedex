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


function buscar(){
const letras = document.getElementById("buscador").value;
document.querySelectorAll(".grid-item-pokemon").forEach(pokemon => {
  if(pokemon.textContent.toLocaleLowerCase().includes(letras.toLocaleLowerCase())){
    pokemon.classList.remove("filtro")
  }
  else{
    pokemon.classList.add("filtro")
  }
})
}


const modo = document.getElementById("css");
if(localStorage.getItem("modoOscuro") == "true"){
  modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista1oscuro.css\">"
}

function cambiarModo(){
if(modo.innerHTML == "<link rel=\"stylesheet\" href=\"vista1oscuro.css\">"){
  modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista1claro.css\">";
  localStorage.setItem("modoOscuro", "false");
}
else{
  modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista1oscuro.css\">";
  localStorage.setItem("modoOscuro", "true");
}
}



