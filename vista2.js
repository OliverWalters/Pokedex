const infoPokemon = document.getElementById("general");/* poner id general del grid */

const enlace = window.location.search;

const urlParametros = new URLSearchParams(enlace);
const id = urlParametros.get('id');

datosPokemons(id);

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
  for(let i =0; i <6;i++){

    move(pokemon.stats[i].stat.name, pokemon.stats[i].base_stat);
}


let tipos = pokemon.types.map(type => `<span class="${type.type.name} tipos"> ${tiposTraducidos[type.type.name]}</span>`);
tipos = tipos.join(''); 


const div = document.createElement("div");
div.classList.add("general");
div.innerHTML = `   <div class="imagen">
                    <img class="imagen-pokemon" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Imagen-pokemon">
                    </div>
                <div class="descripcionYtipo"> 
                    <div class="descripcion">
                        <div class="texto">
                             Altura:<br> ${pokemon.height}
                        </div>
                         <div class="texto">
                             Peso:<br> ${pokemon.weight}
                         </div>         
                    </div>
                <div class="parrafo">
                   <p>TIPOS</p>
                    ${tipos}
                </div>
                </div>  
              
            `;/*poner los tres divs del html aqui una vez terminados, y se anade los datos como en la vista 1 ${pokemon.name}... */

infoPokemon.append(div);


datosEvoluciones(pokemon.species.url);

}

function move(name,stat) {
var elem = document.getElementById(`myBar-${name}`);   
var width = 0;
var id = setInterval(frame, 0);
function frame() {

    if (width >= (stat/255)*100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
     /* document.getElementById(`label-${name}`).innerHTML = width * 1  + '%';para poner texto dentro de la barra */
    }
  }
}


function datosEvoluciones(evolChain){
  fetch(`${evolChain}`)
  .then(datos => datos.json())
  .then(resultado => datosEvol(resultado.evolution_chain.url))
  }

function datosEvol(info){
  fetch(`${info}`)
  .then(datos => datos.json())
  .then(resultado => mostrarEvoluciones(resultado))
}

const evolucionesPokemons = document.getElementById("evoluciones");

async function mostrarEvoluciones(datos){
  let pokemon = datos.chain;

  do{
 
  await cadaEvolucion(pokemon.species.name);

  pokemon = pokemon.evolves_to[0];

  }while(pokemon.evolves_to.Lenght != 0)


}

async function cadaEvolucion(info){
  await fetch(`https://pokeapi.co/api/v2/pokemon/${info}`)
  .then(datos => datos.json())
  .then(resultado => mostrarCadaPokemon(resultado))
}

function mostrarCadaPokemon(info,id){

  if(info.id <= 151){
    let clase;

    if(info.id == id){
      clase = "mismoPokemon"; /*crear estas clases, y el grid*/
    }
    else{
      clase = "evolucion";
    }

    const div = document.createElement("div");

    div.classList.add(clase);
  
    div.innerHTML = `
                    <img src="${info.sprites.other["official-artwork"].front_default}">
                    <p>${info.name.charAt(0).toUpperCase() + info.name.slice(1)}</p>
                    `;

    
    evolucionesPokemons.append(div);
   }
}