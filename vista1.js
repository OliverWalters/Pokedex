const enlace = window.location.search;

const urlParametros = new URLSearchParams(enlace);
const id = urlParametros.get('id');
/**/ 



const listaPokemon = document.getElementById("lista-pokemon");

datosPokemons();

async function datosPokemons() {
  for(let i = 1; i <= 151; i++){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(datos => datos.json())
      .then(resultado => mostrarPokemon(resultado))
    }
}

function mostrarPokemon(pokemon){
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
div.id = `${pokemon.id}`;
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

function inicio(){
  const img = document.getElementById("pika");
  img.src = "Recursos/boton/antes.png";
  img.style.width = "35px";
}

function mientras(){
  const img = document.getElementById("pika");
  img.src = "Recursos/boton/while.png";
  img.style.width = "50px";
}

function salta(){
  const img = document.getElementById("pika");
  img.src = "Recursos/boton/desp.png";
  img.style.width = "80px";
}

function irInicio(){
  window.scrollTo({
    top:0,
    behavior: "smooth"
  })
}

const modo = document.getElementById("css");
if(localStorage.getItem("modoOscuro") == "true"){
  modo.href = "vista1oscuro.css"
}

function cambiarModo(){
if(localStorage.getItem("modoOscuro") == "true"){
  modo.href = "vista1claro.css"
  localStorage.setItem("modoOscuro", "false");
}
else{
  modo.href = "vista1oscuro.css"
  localStorage.setItem("modoOscuro", "true");
}
}



