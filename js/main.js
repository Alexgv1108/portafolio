var nav = () => {
    let navSeleccionado = 1;

    $('#sobre-mi').on('click', () => {
        if (navSeleccionado !== 1) {
            estilosNav(true, false, false, false);

            $('#loader').removeClass('quitar');
            $.get("sobre-mi.html", null, function (htmlExterno) {
                $('#main').html(htmlExterno);
                mostrarExperienciaLaboral();
            }).then(() => {
                $('#loader').addClass('quitar');
            });
            navSeleccionado = 1;
        }
    });

    $('#certificados').on('click', () => {
        if (navSeleccionado !== 2) {
            estilosNav(false, true, false, false);

            $('#loader').removeClass('quitar');
            $.get("certificados.html", null, function (htmlExterno) {
                $('#main').html(htmlExterno);
                mostrarCertificados();
            }).then(() => {
                $('#loader').addClass('quitar');
            });
            navSeleccionado = 2;
        }
    });

    $('#habilidades').on('click', () => {
        if (navSeleccionado !== 3) {
            estilosNav(false, false, true, false);

            $('#loader').removeClass('quitar');
            $.get("habilidades.html", null, function (htmlExterno) {
                $('#main').html(htmlExterno);
            }).then(() => {
                $('#loader').addClass('quitar');
            });
            navSeleccionado = 3;
        }
    });

    $('#contacto').on('click', () => {
        if (navSeleccionado !== 4) {
            estilosNav(false, false, false, true);

            $('#loader').removeClass('quitar');
            $.get("contacto.html", null, function (htmlExterno) {
                $('#main').html(htmlExterno);
            }).then(() => {
                $('#loader').addClass('quitar');
            });
            navSeleccionado = 4;
        }
    });
};

var estilosNav = (sobreMi, certificados, habilidades, contacto) => {
    if (sobreMi) $('#sobre-mi').addClass("active")
    else $('#sobre-mi').removeClass("active");
    if (certificados) $('#certificados').addClass("active")
    else $('#certificados').removeClass("active");
    if (habilidades) $('#habilidades').addClass("active");
    else $('#habilidades').removeClass("active");
    if (contacto) $('#contacto').addClass("active");
    else $('#contacto').removeClass("active");
};

var init = () => {
    $('#loader').removeClass('quitar');
    $.get("sobre-mi.html", null, function (htmlExterno) {
        $('#main').html(htmlExterno);
        mostrarExperienciaLaboral();
    });
    window.addEventListener("load", () => {
        $('#loader').addClass('quitar');
    });
    $('#sobre-mi').addClass("active");
    nav();
};

init();