
const seccionMascota = document.getElementById("mascota");
const seccionAtaque = document.getElementById("ataque");

const seccionReiniciar = document.getElementById("reiniciar");
const botonMascota = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");

const spanMascotaSelect = document.getElementById("mascota-seleccionada");

const mascotaRival = document.getElementById("mascota-rival")

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const seccionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById ("contenedor-ataques");


let mokepones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostevis;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;


class Mokepon {
  constructor(nombre, foto, vidas) {
    this.nombre = nombre;
    this.foto = foto;
    this.vidas = vidas;
    this.ataque = [];
  }
}

let hipodoge = new Mokepon('Hipodoge', 'img/hipodoge.png', 5);
let capipepo = new Mokepon('Capipepo', 'img/capipepo.png', 5);
let ratigueya = new Mokepon('Ratigueya', 'img/ratigueya.png', 5);
let langostevis = new Mokepon('Langostevis', 'img/langostelvis.png', 5);

hipodoge.ataque.push(
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'},

)
capipepo.ataque.push(
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '💧', id: 'boton-agua'},

)
ratigueya.ataque.push(
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
)
langostevis.ataque.push(
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'},

)

mokepones.push(hipodoge, capipepo, ratigueya, langostevis);


function iniciarJuego() {

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
      <input type="radio" name="mascota" id=${mokepon.nombre} />
      <label class="tarjeta-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
      </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
    inputLangostevis = document.getElementById("Langostevis");
  })
  


  seccionAtaque.style.display = "none";  
  seccionReiniciar.style.display = "none";  

  botonMascota.addEventListener("click", seleccionarMascota);
  
  
  botonReiniciar.addEventListener("click", reiniciarJuego);

}

function seleccionarMascota() {
  seccionAtaque.style.display = "flex";

  
  seccionMascota.style.display = "none";

  

  if(inputHipodoge.checked) {
    spanMascotaSelect.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  }else if(inputCapipepo.checked) {
    spanMascotaSelect.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  }else if(inputRatigueya.checked) {
    spanMascotaSelect.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  }else if(inputLangostevis.checked) {
    spanMascotaSelect.innerHTML = inputLangostevis.id;
    mascotaJugador = inputLangostevis.id;
  } else {
    alert("No seleccionaste a ninguna mascota")
  }

  extraerAtaques(mascotaJugador);
  seleccionarMascotaRival();
  
}

function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataque;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
    <button class="boton boton-ataque B-ataque" id=${ataque.id} />${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += ataquesMokepon;
  })

   botonFuego = document.getElementById("boton-fuego");
   botonAgua = document.getElementById("boton-agua");
   botonTierra = document.getElementById("boton-tierra");
   botones = document.querySelectorAll(".B-ataque");

}

function secuenciaAtaques(){
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("Fuego");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧") {
        ataqueJugador.push("Agua");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("Tierra");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    })
  })
  
}

function seleccionarMascotaRival() {


  let mascotaAleatorio = aleatorio(0, mokepones.length - 1);
  
  mascotaRival.innerHTML = mokepones[mascotaAleatorio].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataque;

  secuenciaAtaques();
}


function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1);
  if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
    ataqueEnemigo.push("Fuego");
  }else if (ataqueAleatorio === 3 || ataqueAleatorio === 4) {
    ataqueEnemigo.push("Agua");
  }else {
    ataqueEnemigo.push("Tierra");
  }

  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemiga) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemiga];
}

function combate() {
  
  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueJugador[i] === ataqueEnemigo[i]) {
      indexAmbosOponentes(i, i)
      crearMensaje("EMPATE");
    } else if(ataqueJugador[i] === "Fuego" && ataqueEnemigo[i] === "Tierra") {
      indexAmbosOponentes(i, i)
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[i] === "Agua" && ataqueEnemigo[i] === "Fuego") {
      indexAmbosOponentes(i, i)
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if(ataqueJugador[i] === "Tierra" && ataqueEnemigo[i] === "Agua") {
      indexAmbosOponentes(i, i)
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    }  else {
      indexAmbosOponentes(i, i)
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
    
  }
 revisarVidas();
 
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("Esto fue un empate!!!");
  } else if (victoriasJugador > victoriasEnemigo){
    crearMensajeFinal("FELICITACIONES, GANASTE!!");
  } else {
    crearMensajeFinal("LO SIENTO, PERDISTE");
  }
}

function crearMensaje(resultado) {

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;


  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  

  seccionMensajes.innerHTML = resultadoFinal;
  
  seccionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}



window.addEventListener("load", iniciarJuego);
