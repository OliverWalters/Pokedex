const infoPokemon = document.getElementById("id");/* poner id general del grid */

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



let tipos = pokemon.types.map(type => `<span class="${type.type.name} tipos"> ${tiposTraducidos[type.type.name]}</span>`);
tipos = tipos.join(''); 


const div = document.createElement("div");
div.innerHTML = `
                  
                `;/*poner los tres divs del html aqui una vez terminados, y se anade los datos como en la vista 1 ${pokemon.name}... */
/*infoPokemon.append(div);*/




datosEvoluciones(pokemon.species.url);

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