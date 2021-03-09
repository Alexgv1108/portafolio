var circulo = true;
var uno = null, dos = null, tres = null, cuatro = null, cinco = null, seis = null,
siete = null, ocho = null, nueve = null;
var contadorReiniciarJuego = 0;

var clic = () => {

    $(".triki .opciones .opcion.uno").on('click', () => {
        if (!uno) {
            if (circulo) {
                agregarIcono('circle outline', 'uno');
                circulo = false;
                uno = 1;
            } else {
                agregarIcono('x icon', 'uno');
                circulo = true;
                uno = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.dos").on('click', () => {
        if (!dos) {
            if (circulo) {
                agregarIcono('circle outline', 'dos');
                circulo = false;
                dos = 1;
            } else {
                agregarIcono('x icon', 'dos');
                circulo = true;
                dos = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.tres").on('click', () => {
        if (!tres) {
            if (circulo) {
                agregarIcono('circle outline', 'tres');
                circulo = false;
                tres = 1;
            } else {
                agregarIcono('x icon', 'tres');
                circulo = true;
                tres = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.cuatro").on('click', () => {
        if (!cuatro) {
            if (circulo) {
                agregarIcono('circle outline', 'cuatro');
                circulo = false;
                cuatro = 1;
            } else {
                agregarIcono('x icon', 'cuatro');
                circulo = true;
                cuatro = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.cinco").on('click', () => {
        if (!cinco) {
            if (circulo) {
                agregarIcono('circle outline', 'cinco');
                circulo = false;
                cinco = 1;
            } else {
                agregarIcono('x icon', 'cinco');
                circulo = true;
                cinco = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.seis").on('click', () => {
        if (!seis) {
            if (circulo) {
                agregarIcono('circle outline', 'seis');
                circulo = false;
                seis = 1;
            } else {
                agregarIcono('x icon', 'seis');
                circulo = true;
                seis = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.siete").on('click', () => {
        if (!siete) {
            if (circulo) {
                agregarIcono('circle outline', 'siete');
                circulo = false;
                siete = 1;
            } else {
                agregarIcono('x icon', 'siete');
                circulo = true;
                siete = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.ocho").on('click', () => {
        if (!ocho) {
            if (circulo) {
                agregarIcono('circle outline', 'ocho');
                circulo = false;
                ocho = 1;
            } else {
                agregarIcono('x icon', 'ocho');
                circulo = true;
                ocho = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });

    $(".triki .opciones .opcion.nueve").on('click', () => {
        if (!nueve) {
            if (circulo) {
                agregarIcono('circle outline', 'nueve');
                circulo = false;
                nueve = 1;
            } else {
                agregarIcono('x icon', 'nueve');
                circulo = true;
                nueve = 2;
            }
            if (++contadorReiniciarJuego > 8) {
                condicionesGanar();
                reiniciarJuego();
            }
        }
        condicionesGanar();
    });
}

var reiniciarJuego = () => {

    $('.triki .opciones .iconos').html('');
    uno = null;
    dos = null;
    tres = null;
    cuatro = null;
    cinco = null;
    seis = null;
    siete = null;
    ocho = null;
    nueve = null;
    contadorReiniciarJuego = 0;
}

var agregarIcono = (icono, posicion) => {
    $('.triki .opciones .iconos').append(`<div class="opcion icono ${posicion}"><i class="${icono} icon"></i></div>`);
}

var condicionesGanar = () => {
    // Horizontal
    if (uno == 1 && dos == 1 && tres == 1) ventanaGanador('CÍRCULO');
    else if (uno == 2 && dos == 2 && tres == 2) ventanaGanador('EQUIS');
    else if (cuatro == 1 && cinco == 1 && seis == 1) ventanaGanador('CÍRCULO');
    else if (cuatro == 2 && cinco == 2 && seis == 2) ventanaGanador('EQUIS');
    else if (siete == 1 && ocho == 1 && nueve == 1) ventanaGanador('CÍRCULO');
    else if (siete == 2 && ocho == 2 && nueve == 2) ventanaGanador('EQUIS');

    // Vertical
    if (uno == 1 && cuatro == 1 && siete == 1) ventanaGanador('CÍRCULO');
    else if (uno == 2 && cuatro == 2 && siete == 2) ventanaGanador('EQUIS');
    else if (dos == 1 && cinco == 1 && ocho == 1) ventanaGanador('CÍRCULO');
    else if (dos == 2 && cinco == 2 && ocho == 2) ventanaGanador('EQUIS');
    else if (tres == 1 && seis == 1 && nueve == 1) ventanaGanador('CÍRCULO');
    else if (tres == 2 && seis == 2 && nueve == 2) ventanaGanador('EQUIS');

    // Diagonal
    if (uno == 1 && cinco == 1 && nueve == 1) ventanaGanador('CÍRCULO');
    else if (uno == 2 && cinco == 2 && nueve == 2) ventanaGanador('EQUIS');
    else if (tres == 1 && cinco == 1 && siete == 1) ventanaGanador('CÍRCULO');
    else if (tres == 2 && cinco == 2 && siete == 2) ventanaGanador('EQUIS');
}

var ventanaGanador = (ganador) => {
    Swal.fire({
        title: 'ganador',
        text: `El ganador es el jugador con ${ganador}`,
        confirmButtonText: 'Cerrar ventana',
        width: 600,
        padding: '3em',
        background: '#fff url(./img/trees.png)',
        backdrop: `
            rgba(0,0,123,0.4)
            url("./img/nyan-cat.gif")
            left top
            no-repeat
        `
    });
    reiniciarJuego();
}

var init = () => {
    clic();
}

init();