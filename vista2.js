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

const nombre = document.getElementsByClassName("principio")
nombre[0].innerHTML = `<span>N&deg; ${(pokemon.id.toString().padStart(3,0))}</span><span>   ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>`;

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
div.innerHTML = `<div class="imagen">
                    <img class="imagen-pokemon" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="Imagen-pokemon">
                    </div>
                <div class="descripcionYtipo"> 
                    <div class="descripcion">
                        <div class="texto">
                             Altura:<br> ${pokemon.height / 10} m
                        </div>
                         <div class="texto">
                             Peso:<br> ${pokemon.weight / 10} kg
                         </div>         
                    </div>
                <div class="parrafo">
                   <p>TIPOS</p>
                    ${tipos}
                </div>
                </div>
            `;

infoPokemon.append(div);


datosEvoluciones(pokemon.species.url);

}

function move(name,stat) {
  const traduccionStats ={
    hp: "PS: ",
    attack:"Ataque: ",
    defense:"Defensa: ",
    ["special-attack"]:"Ataque especial: ",
    ["special-defense"]:"Defensa especial: ",
    speed:"Velocidad: "
  }
var elem = document.getElementById(`myBar-${name}`);   
var width = 0;
var id = setInterval(frame, 0);

function frame() {
    if (width >= (stat/255)*100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
     document.getElementById(`label-${name}`).innerHTML = traduccionStats[name] + stat + "/255";/* para poner texto dentro de la barra */
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
const itemsTraducidos = {
  ["thunder-stone"]: "piedra trueno",
  ["moon-stone"]: "piedra lunar",
  ["leaf-stone"]: "piedra hoja",
  ["water-stone"]: "piedra agua",
  ["fire-stone"]: "piedra fuego"
}

  let pokemon = datos.chain;

  if(pokemon.evolves_to.length == 1 || pokemon.evolves_to.length == 2){
    while(pokemon != null){
      let trigger = "";
      let numeroPokemon = "";

      if(pokemon.evolves_to[0] != null){
        numeroPokemon = pokemon.evolves_to[0].species.url.split("/");
      }
        
      
      if(pokemon.evolves_to[0] != null && numeroPokemon[6] < 152){
        if(pokemon.evolves_to[0].evolution_details[0].trigger.name == "level-up"){
          if(pokemon.evolves_to[0].evolution_details[0].min_level == null && pokemon.evolves_to[0].evolution_details[0].min_happiness != null){
            trigger = `Evoluciona al nivel ${pokemon.evolves_to[0].evolution_details[0].min_happiness} de felicidad`;
          }
          else if(pokemon.evolves_to[0].evolution_details[0].min_happiness == null && pokemon.evolves_to[0].evolution_details[0].min_level != null){
            trigger = `Evoluciona al nivel ${pokemon.evolves_to[0].evolution_details[0].min_level}`;
          }
        
        }
        else if(pokemon.evolves_to[0].evolution_details[0].trigger.name == "use-item"){
          trigger =`Evoluciona con la ${itemsTraducidos[pokemon.evolves_to[0].evolution_details[0].item.name]}`;
        }
        else if (pokemon.evolves_to[0].evolution_details[0].trigger.name == "trade"){
          trigger = "Intercambio";
        }
      }
  
      await cadaEvolucion(pokemon.species.name, trigger);
      pokemon = pokemon.evolves_to[0];
  
    }
  }
  else{
    let trigger = "";
    await cadaEvolucion(datos.chain.species.name, trigger);

    for(let i = 0; i < pokemon.evolves_to.length; i++){
console.log(pokemon.evolves_to.length)
      let pokemonVariable = pokemon;
      pokemonVariable = datos.chain.evolves_to[i];
      trigger =`Eevee evoluciona con la ${itemsTraducidos[pokemonVariable.evolution_details[0].item.name]} a:`;
      
      await cadaEvolucion(pokemonVariable.species.name, trigger);
    }
  }
  

}

async function cadaEvolucion(info, trigger){
  await fetch(`https://pokeapi.co/api/v2/pokemon/${info}`)
  .then(datos => datos.json())
  .then(resultado => mostrarCadaPokemon(resultado, trigger, id))
}

function mostrarCadaPokemon(pokemon, trigger, id){

  if(pokemon.id <= 151){
    let clase;

    if(pokemon.id == id){
      clase = "mismoPokemon";
    }
    else{
      clase = "evolucion";
    }


    const div = document.createElement("div");
    const div2 = document.createElement("div");
    div.classList.add("pokemonEvolucion");
    div2.classList.add("trigger");
    div.innerHTML = `<button type="button" class="boton" onclick= redireccion(${pokemon.id})>
                    <img class="imgEvoluciones ${clase}" src="${pokemon.sprites.other["official-artwork"].front_default}">
                    </button>
                    <br><br><br>
                    <p class="${clase}">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    `;
    div2.innerHTML = `<p class="trigger">${trigger}</p>`;

    if(id == 133 || id == 134 || id == 135 || id == 136){
      evolucionesPokemons.classList.remove("evoluciones");
      evolucionesPokemons.classList.add("evolucionesEevee");
      if(trigger != ""){
        evolucionesPokemons.append(div2)
      }
      evolucionesPokemons.append(div);
    }
    else{
      evolucionesPokemons.classList.remove("evolucionesEevee");
      evolucionesPokemons.classList.add("evoluciones");
      evolucionesPokemons.append(div);
      if(trigger != ""){
        evolucionesPokemons.append(div2)
      }
    }
    
  }
}

function redireccion(id){
  location.href = `PokedexVista2.html?id=${id}`;
}


const modo = document.getElementById("css");

if(localStorage.getItem("modoOscuro") == "true"){
  modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista2oscuro.css\">"
}


function cambiarModo(){
  
  if(modo.innerHTML == "<link rel=\"stylesheet\" href=\"vista2oscuro.css\">"){
    modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista2claro.css\">"
    localStorage.setItem("modoOscuro", "false");
  }
  else{
    modo.innerHTML = "<link rel=\"stylesheet\" href=\"vista2oscuro.css\">"
    localStorage.setItem("modoOscuro", "true");
  }
  }
  
  