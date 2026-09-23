/*
  ================================================================
  SOPA DE LETRAS — Tertulia Digital
  ================================================================
  Este archivo es JAVASCRIPT (JS): el lenguaje que hace que la página
  REACCIONE a lo que la persona hace (tocar, arrastrar, hacer clic).

  - HTML dice QUÉ hay.   - CSS dice CÓMO SE VE.   - JS dice QUÉ HACE.

  Ideas básicas de JS que verá aquí:
  - const / let  → guardan un dato con un nombre (una "variable").
                   const no cambia; let sí puede cambiar.
  - function     → un conjunto de instrucciones con nombre, que se puede usar muchas veces.
  - if (...)     → "si pasa esto, haz aquello".
  - for (...)    → "repite esto varias veces".
  - [ ... ]      → una LISTA (arreglo).   { ... } → un OBJETO (datos con etiquetas).
  - // texto     → comentario de una línea (el navegador lo ignora).
*/


/* ----------------------------------------------------------------
   1. LOS 10 NIVELES
   ----------------------------------------------------------------
   Cada nivel es un objeto con:
   - tema:        el título de la sopa
   - tamano:      cuántas letras mide por lado (8 = tablero de 8 × 8)
   - direcciones: hacia dónde pueden ir las palabras
   - ayuda:       texto que explica las direcciones
   - palabras:    la lista (en MAYÚSCULAS y SIN acentos, como en las sopas de letras impresas)

   ¿Quiere cambiar una palabra o un tema? ¡Solo edite esta lista!
   Regla: ninguna palabra puede ser más larga que el tamaño del tablero.
*/
const NIVELES = [
  {
    tema: "En el mercado",
    tamano: 8,
    direcciones: ["derecha", "abajo"],
    ayuda: "Las palabras van de izquierda a derecha → o de arriba abajo ↓.",
    palabras: ["MANGO", "PAPAYA", "GUAYABA", "TUNA", "LIMON"],
  },
  {
    tema: "Especias de la cocina",
    tamano: 9,
    direcciones: ["derecha", "abajo"],
    ayuda: "Las palabras van de izquierda a derecha → o de arriba abajo ↓.",
    palabras: ["CANELA", "COMINO", "OREGANO", "CLAVO", "PIMIENTA", "AJONJOLI"],
  },
  {
    tema: "Plantas medicinales",
    tamano: 10,
    direcciones: ["derecha", "abajo", "diagonalAbajo"],
    ayuda: "Ahora también hay palabras en diagonal ↘.",
    palabras: ["MANZANILLA", "RUDA", "ARNICA", "SABILA", "TORONJIL", "EPAZOTE"],
  },
  {
    tema: "Oficios de antes",
    tamano: 10,
    direcciones: ["derecha", "abajo", "diagonalAbajo"],
    ayuda: "Palabras en horizontal →, vertical ↓ y diagonal ↘.",
    palabras: ["ZAPATERO", "SASTRE", "HERRERO", "PANADERO", "CARPINTERO", "ALFARERO", "TEJEDORA"],
  },
  {
    tema: "Ciudades de México",
    tamano: 11,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba"],
    ayuda: "Las diagonales van en los dos sentidos: ↘ y ↗.",
    palabras: ["OAXACA", "PUEBLA", "MERIDA", "TOLUCA", "CAMPECHE", "ZACATECAS", "MORELIA"],
  },
  {
    tema: "Instrumentos musicales",
    tamano: 11,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba", "izquierda"],
    ayuda: "Atención: algunas palabras están escritas al revés ←.",
    palabras: ["GUITARRA", "VIOLIN", "TROMPETA", "MARIMBA", "ARPA", "ACORDEON", "SALTERIO", "JARANA"],
  },
  {
    tema: "Paisajes de México",
    tamano: 12,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba", "izquierda", "arriba"],
    ayuda: "Hay palabras al revés, hacia la izquierda ← y hacia arriba ↑.",
    palabras: ["POPOCATEPETL", "PARICUTIN", "CENOTE", "BARRANCA", "LAGUNA", "SIERRA", "DESIERTO", "CASCADA"],
  },
  {
    tema: "Escritores mexicanos",
    tamano: 12,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba", "izquierda", "arriba", "diagonalAbajoIzq", "diagonalArribaIzq"],
    ayuda: "Las palabras pueden ir en cualquier dirección, incluso al revés.",
    palabras: ["PAZ", "RULFO", "FUENTES", "CASTELLANOS", "PONIATOWSKA", "GARRO", "REYES", "NERVO", "SABINES"],
  },
  {
    tema: "Bailes y ritmos",
    tamano: 12,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba", "izquierda", "arriba", "diagonalAbajoIzq", "diagonalArribaIzq"],
    ayuda: "Las palabras pueden ir en cualquier dirección, incluso al revés.",
    palabras: ["DANZON", "HUAPANGO", "BOLERO", "CUMBIA", "JARABE", "CHOTIS", "POLKA", "VALS", "MAMBO"],
  },
  {
    tema: "Juegos y pasatiempos",
    tamano: 12,
    direcciones: ["derecha", "abajo", "diagonalAbajo", "diagonalArriba", "izquierda", "arriba", "diagonalAbajoIzq", "diagonalArribaIzq"],
    ayuda: "El último reto: cualquier dirección y más palabras que nunca.",
    palabras: ["LOTERIA", "DOMINO", "AJEDREZ", "BARAJA", "CANICAS", "BALERO", "TROMPO", "MATATENA", "DAMAS", "CRUCIGRAMA"],
  },
];

/* Cada dirección dice cuánto se mueve por cada letra: [filas, columnas].
   Ejemplo: "derecha" = [0, 1] → misma fila, una columna más a la derecha. */
const DIRECCIONES = {
  derecha:           [0, 1],
  abajo:             [1, 0],
  diagonalAbajo:     [1, 1],    // ↘
  diagonalArriba:    [-1, 1],   // ↗
  izquierda:         [0, -1],   // ←
  arriba:            [-1, 0],   // ↑
  diagonalAbajoIzq:  [1, -1],   // ↙
  diagonalArribaIzq: [-1, -1],  // ↖
};

// Letras para rellenar los huecos. Las vocales y letras comunes se repiten
// para que el relleno "parezca español" y no sea tan fácil distinguir las palabras.
const LETRAS_RELLENO = "AAAAEEEEIIIOOOUURRSSNNLLTTCCDDMMPBGVFHJQZYÑ";


/* ----------------------------------------------------------------
   2. EL "ESTADO" DEL JUEGO: lo que el juego necesita recordar
   ---------------------------------------------------------------- */
let nivelActual = 0;          // en JS las listas empiezan en 0: el nivel 1 es el 0
let tablero = [];             // las letras, en filas y columnas
let palabrasColocadas = [];   // qué palabras hay en el tablero
let encontradas = new Set();  // palabras que ya se encontraron (un Set es una lista sin repetidos)
let inicio = null;            // primera letra que tocó la persona (null = "nada todavía")
let presionada = null;        // letra donde se apretó el dedo o el mouse
let esToqueNuevo = false;     // ¿este toque fue el que eligió la primera letra?


/* ----------------------------------------------------------------
   3. CONECTAR CON EL HTML
   ----------------------------------------------------------------
   document.getElementById("x") busca en el HTML el elemento con id="x".
*/
const elTablero      = document.getElementById("tablero");
const elLista        = document.getElementById("lista-palabras");
const elContador     = document.getElementById("contador");
const elNiveles      = document.getElementById("niveles");
const elTituloNivel  = document.getElementById("titulo-nivel");
const elAyudaNivel   = document.getElementById("ayuda-nivel");
const elMensaje      = document.getElementById("mensaje");
const elFelicitacion = document.getElementById("felicitacion");
const elTextoFelicitacion = document.getElementById("texto-felicitacion");
const btnSiguiente   = document.getElementById("btn-siguiente");
const btnPista       = document.getElementById("btn-pista");
const btnNuevo       = document.getElementById("btn-nuevo");


/* ----------------------------------------------------------------
   4. HERRAMIENTAS PEQUEÑAS
   ---------------------------------------------------------------- */

// Un número entero al azar entre 0 y (maximo - 1)
function numeroAlAzar(maximo) {
  return Math.floor(Math.random() * maximo);
}

// Un elemento al azar de una lista
function elegirAlAzar(lista) {
  return lista[numeroAlAzar(lista.length)];
}

// Muestra un mensaje debajo del tablero
function avisar(texto) {
  elMensaje.textContent = texto;
}


/* ----------------------------------------------------------------
   5. PROGRESO GUARDADO
   ----------------------------------------------------------------
   localStorage es una pequeña "libreta" del navegador: lo que guardamos
   ahí sigue ahí aunque se cierre la página (solo en ESE navegador).
   Usamos try/catch ("intenta… y si falla, no pasa nada") porque en
   algunos modos privados el navegador no deja guardar.
*/
const CLAVE_PROGRESO = "tertulia-sopa-completados";

function leerCompletados() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || [];
  } catch (error) {
    return [];
  }
}

function guardarCompletado(numeroNivel) {
  const completados = leerCompletados();
  if (!completados.includes(numeroNivel)) {
    completados.push(numeroNivel);
  }
  try {
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(completados));
  } catch (error) {
    // Si no se puede guardar, el juego sigue funcionando igual.
  }
}


/* ----------------------------------------------------------------
   6. CREAR EL TABLERO
   ----------------------------------------------------------------
   La idea:
   1) Empezamos con un tablero vacío.
   2) Acomodamos las palabras (de la más larga a la más corta) en lugares al azar,
      cuidando que no se salgan y que solo se crucen si comparten la misma letra.
   3) Rellenamos los huecos con letras al azar.
   Si alguna palabra no cabe, volvemos a empezar (la computadora lo intenta muy rápido).
*/
function crearTablero(nivel) {
  for (let intento = 0; intento < 200; intento++) {
    // Tablero vacío: una lista de filas, y cada fila es una lista de "" (vacío)
    const nuevoTablero = [];
    for (let fila = 0; fila < nivel.tamano; fila++) {
      nuevoTablero.push(new Array(nivel.tamano).fill(""));
    }

    // Copiamos la lista y la ordenamos de la palabra más larga a la más corta
    const ordenadas = [...nivel.palabras].sort((a, b) => b.length - a.length);
    const colocadas = [];
    let todoCupo = true;

    for (const palabra of ordenadas) {
      const celdas = colocarPalabra(nuevoTablero, palabra, nivel.direcciones);
      if (celdas === null) {
        todoCupo = false;
        break; // esta palabra no cupo: salimos y volvemos a intentar desde cero
      }
      colocadas.push({ palabra: palabra, celdas: celdas });
    }

    if (todoCupo) {
      rellenarHuecos(nuevoTablero);
      return { tablero: nuevoTablero, colocadas: colocadas };
    }
  }
  throw new Error("No se pudo armar el tablero. Revise que las palabras quepan.");
}

// Intenta poner UNA palabra en el tablero. Devuelve sus casillas, o null si no cupo.
function colocarPalabra(tab, palabra, nombresDirecciones) {
  const tamano = tab.length;

  for (let intento = 0; intento < 300; intento++) {
    const [pasoFila, pasoColumna] = DIRECCIONES[elegirAlAzar(nombresDirecciones)];
    const filaInicio = numeroAlAzar(tamano);
    const columnaInicio = numeroAlAzar(tamano);

    // ¿Dónde terminaría la palabra? Si se sale del tablero, probamos otro lugar.
    const filaFin = filaInicio + pasoFila * (palabra.length - 1);
    const columnaFin = columnaInicio + pasoColumna * (palabra.length - 1);
    if (filaFin < 0 || filaFin >= tamano || columnaFin < 0 || columnaFin >= tamano) {
      continue; // "continue" = salta a la siguiente vuelta del for
    }

    // ¿Choca con otra palabra? Solo se vale cruzar si la letra es la misma.
    let cabe = true;
    for (let i = 0; i < palabra.length; i++) {
      const letraAhi = tab[filaInicio + pasoFila * i][columnaInicio + pasoColumna * i];
      if (letraAhi !== "" && letraAhi !== palabra[i]) {
        cabe = false;
        break;
      }
    }
    if (!cabe) continue;

    // ¡Cabe! La escribimos letra por letra y guardamos sus casillas.
    const celdas = [];
    for (let i = 0; i < palabra.length; i++) {
      const fila = filaInicio + pasoFila * i;
      const columna = columnaInicio + pasoColumna * i;
      tab[fila][columna] = palabra[i];
      celdas.push({ fila: fila, columna: columna });
    }
    return celdas;
  }
  return null;
}

function rellenarHuecos(tab) {
  for (const fila of tab) {
    for (let columna = 0; columna < fila.length; columna++) {
      if (fila[columna] === "") {
        fila[columna] = elegirAlAzar(LETRAS_RELLENO);
      }
    }
  }
}


/* ----------------------------------------------------------------
   7. DIBUJAR EN LA PANTALLA
   ----------------------------------------------------------------
   JS puede CREAR elementos de HTML: document.createElement("div")
   crea un <div> nuevo, y .append() lo mete dentro de otro.
*/
function dibujarTablero() {
  const tamano = tablero.length;
  // Le pasamos el tamaño al CSS (lo usa para saber cuántas columnas hacer)
  elTablero.style.setProperty("--columnas", tamano);
  elTablero.innerHTML = ""; // borramos el tablero anterior

  for (let fila = 0; fila < tamano; fila++) {
    for (let columna = 0; columna < tamano; columna++) {
      const casilla = document.createElement("div");
      casilla.className = "letra";
      casilla.textContent = tablero[fila][columna];
      // "data-" guarda datos dentro del HTML: aquí, la posición de la letra
      casilla.dataset.fila = fila;
      casilla.dataset.columna = columna;
      elTablero.append(casilla);
    }
  }
}

function dibujarListaPalabras() {
  elLista.innerHTML = "";
  // Mostramos la lista en orden alfabético (así no delata cuál es más larga)
  const ordenadas = palabrasColocadas.map((p) => p.palabra).sort();
  for (const palabra of ordenadas) {
    const elemento = document.createElement("li");
    elemento.textContent = palabra;
    elemento.dataset.palabra = palabra;
    elLista.append(elemento);
  }
  actualizarContador();
}

function actualizarContador() {
  elContador.textContent = `${encontradas.size} de ${palabrasColocadas.length} encontradas`;
  // Las comillas invertidas `...` permiten meter variables con ${ }
}

function dibujarBotonesNiveles() {
  const completados = leerCompletados();
  elNiveles.innerHTML = "";

  NIVELES.forEach((nivel, indice) => {
    const boton = document.createElement("button");
    const numero = indice + 1;
    const hecho = completados.includes(numero);

    boton.type = "button";
    boton.textContent = hecho ? `${numero} ✓` : `${numero}`;
    boton.setAttribute("aria-label", `Nivel ${numero}: ${nivel.tema}${hecho ? ", completado" : ""}`);
    boton.setAttribute("aria-pressed", indice === nivelActual ? "true" : "false");
    if (hecho) boton.classList.add("completado");

    // Cuando se haga clic en este botón, cargamos ese nivel
    boton.addEventListener("click", () => cargarNivel(indice));
    elNiveles.append(boton);
  });
}

// Devuelve la casilla (el <div>) de una posición
function casillaEn(posicion) {
  return elTablero.children[posicion.fila * tablero.length + posicion.columna];
}


/* ----------------------------------------------------------------
   8. EMPEZAR UN NIVEL
   ---------------------------------------------------------------- */
function cargarNivel(indice) {
  nivelActual = indice;
  const nivel = NIVELES[indice];
  const resultado = crearTablero(nivel);

  tablero = resultado.tablero;
  palabrasColocadas = resultado.colocadas;
  encontradas = new Set();
  inicio = null;

  elTituloNivel.textContent = `Nivel ${indice + 1} de ${NIVELES.length}: ${nivel.tema}`;
  elAyudaNivel.textContent = nivel.ayuda;
  elFelicitacion.hidden = true;
  avisar("Toque la primera letra de una palabra y después la última. También puede arrastrar.");

  dibujarTablero();
  dibujarListaPalabras();
  dibujarBotonesNiveles();
}


/* ----------------------------------------------------------------
   9. ELEGIR LETRAS (tocar o arrastrar)
   ----------------------------------------------------------------
   "pointer" funciona igual con mouse, dedo o lápiz digital.
   - pointerdown = se aprieta   - pointermove = se mueve   - pointerup = se suelta
*/

// ¿Qué casilla está debajo del dedo o del mouse?
function posicionBajoPuntero(evento) {
  const elemento = document.elementFromPoint(evento.clientX, evento.clientY);
  const casilla = elemento ? elemento.closest(".letra") : null;
  if (!casilla || !elTablero.contains(casilla)) return null;
  return { fila: Number(casilla.dataset.fila), columna: Number(casilla.dataset.columna) };
}

function mismaPosicion(a, b) {
  return a && b && a.fila === b.fila && a.columna === b.columna;
}

// Las casillas en línea recta entre A y B, o null si no están en línea.
function lineaEntre(a, b) {
  const difFilas = b.fila - a.fila;
  const difColumnas = b.columna - a.columna;
  const esRecta = difFilas === 0 || difColumnas === 0 || Math.abs(difFilas) === Math.abs(difColumnas);
  if (!esRecta) return null;

  const pasos = Math.max(Math.abs(difFilas), Math.abs(difColumnas));
  const linea = [];
  for (let i = 0; i <= pasos; i++) {
    linea.push({
      fila: a.fila + Math.sign(difFilas) * i,       // Math.sign da -1, 0 o 1
      columna: a.columna + Math.sign(difColumnas) * i,
    });
  }
  return linea;
}

// Pinta la selección en curso (de la primera letra hasta donde está el puntero)
function mostrarSeleccion(desde, hasta) {
  limpiarSeleccion();
  const linea = lineaEntre(desde, hasta) || [desde];
  for (const posicion of linea) {
    casillaEn(posicion).classList.add("seleccion");
  }
}

function limpiarSeleccion() {
  for (const casilla of elTablero.querySelectorAll(".seleccion")) {
    casilla.classList.remove("seleccion");
  }
}

function cancelarSeleccion() {
  inicio = null;
  limpiarSeleccion();
}

// Se aprieta sobre una letra
elTablero.addEventListener("pointerdown", (evento) => {
  const posicion = posicionBajoPuntero(evento);
  if (!posicion) return;
  evento.preventDefault(); // evita que el navegador intente seleccionar texto

  presionada = posicion;
  if (inicio === null) {
    inicio = posicion;          // primera letra elegida
    esToqueNuevo = true;
    mostrarSeleccion(inicio, inicio);
  } else {
    esToqueNuevo = false;       // ya había primera letra: este toque es la última
  }
});

// Se mueve: vamos pintando la línea para que se vea qué se está eligiendo
document.addEventListener("pointermove", (evento) => {
  if (inicio === null) return;
  const posicion = posicionBajoPuntero(evento);
  if (posicion) mostrarSeleccion(inicio, posicion);
});

// Se suelta: decidimos qué hacer
document.addEventListener("pointerup", (evento) => {
  if (presionada === null) return;
  presionada = null;

  const posicion = posicionBajoPuntero(evento);
  if (!posicion) return;

  if (mismaPosicion(posicion, inicio)) {
    // Soltó en la misma letra: si fue el primer toque, esperamos la última letra;
    // si volvió a tocar la primera letra, cancelamos.
    if (!esToqueNuevo) {
      cancelarSeleccion();
      avisar("Selección cancelada. Elija otra vez la primera letra.");
    }
    return;
  }
  comprobarSeleccion(inicio, posicion);
});

document.addEventListener("pointercancel", () => {
  presionada = null;
});

// La tecla Escape también cancela
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") cancelarSeleccion();
});


/* ----------------------------------------------------------------
   10. ¿ENCONTRÓ UNA PALABRA?
   ---------------------------------------------------------------- */
function comprobarSeleccion(desde, hasta) {
  const linea = lineaEntre(desde, hasta);
  cancelarSeleccion();

  if (!linea) {
    avisar("Las letras deben estar en línea recta: horizontal, vertical o diagonal.");
    return;
  }

  // Juntamos las letras elegidas en un texto, y también al revés
  const texto = linea.map((p) => tablero[p.fila][p.columna]).join("");
  const alReves = [...texto].reverse().join("");

  const hallada = palabrasColocadas.find(
    (p) => !encontradas.has(p.palabra) && (p.palabra === texto || p.palabra === alReves)
  );

  if (!hallada) {
    avisar(`"${texto}" no está en la lista. Siga buscando, sin prisa.`);
    return;
  }

  // ¡La encontró! Pintamos sus letras con uno de 4 tonos, para distinguir palabras.
  encontradas.add(hallada.palabra);
  const tono = (encontradas.size - 1) % 4;
  for (const posicion of linea) {
    const casilla = casillaEn(posicion);
    casilla.classList.add("encontrada");
    casilla.dataset.tono = tono;
  }
  elLista.querySelector(`[data-palabra="${hallada.palabra}"]`).classList.add("hallada");
  actualizarContador();
  avisar(`¡Muy bien! Encontró "${hallada.palabra}".`);

  if (encontradas.size === palabrasColocadas.length) {
    terminarNivel();
  }
}

function terminarNivel() {
  const numero = nivelActual + 1;
  guardarCompletado(numero);
  dibujarBotonesNiveles();

  const esUltimo = nivelActual === NIVELES.length - 1;
  elTextoFelicitacion.textContent = esUltimo
    ? "¡Completó los 10 niveles! Puede volver a jugar cualquiera: cada vez las letras cambian de lugar."
    : `Terminó el nivel ${numero}. Cuando guste, siga con el siguiente.`;
  btnSiguiente.hidden = esUltimo;
  elFelicitacion.hidden = false;
  avisar("");
}


/* ----------------------------------------------------------------
   11. BOTONES
   ---------------------------------------------------------------- */

// Pista: resalta por unos segundos la primera letra de una palabra que falte
btnPista.addEventListener("click", () => {
  const faltantes = palabrasColocadas.filter((p) => !encontradas.has(p.palabra));
  if (faltantes.length === 0) return;

  const elegida = elegirAlAzar(faltantes);
  const casilla = casillaEn(elegida.celdas[0]);
  casilla.classList.add("pista");
  avisar(`Pista: la palabra "${elegida.palabra}" empieza en la letra resaltada.`);

  // setTimeout = "haz esto después de un rato" (3000 milisegundos = 3 segundos)
  setTimeout(() => casilla.classList.remove("pista"), 3000);
});

// Nuevo tablero: mismo nivel, letras en otros lugares
btnNuevo.addEventListener("click", () => cargarNivel(nivelActual));

btnSiguiente.addEventListener("click", () => {
  cargarNivel(nivelActual + 1);
  elTablero.scrollIntoView({ behavior: "smooth", block: "center" });
});


/* ----------------------------------------------------------------
   12. ¡A JUGAR!
   ----------------------------------------------------------------
   Al abrir la página empezamos en el primer nivel que falte por completar.
*/
const completados = leerCompletados();
const primerPendiente = NIVELES.findIndex((nivel, indice) => !completados.includes(indice + 1));
cargarNivel(primerPendiente === -1 ? 0 : primerPendiente);
