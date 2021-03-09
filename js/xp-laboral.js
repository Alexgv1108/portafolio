var experienciaLaboralPersonales = [
    {
        nombre: 'Práctica en Sistemas',
        institucion: 'Arclad S.A.',
        tiempo: '26/11/2018 - 25/05/2019',
        descripcion: `Encargado de brindar el primer nivel de soporte tanto de software como de hardware a 
        todos los computadores de la empresa.`,
        pagina: 'https://www.arclad.com/es/'
    },
    {
        nombre: 'Desarrollador Web',
        institucion: 'Quipux',
        tiempo: '13/04/2020 - Actualmente',
        descripcion: `desarrollador fullstack usando tecnologías como HTML5, Jquery, AngularJS, 
        Java, Maven, Spring, JPA, SQL Developer, Git, Gitlab y servicios REST.`,
        pagina: 'https://www.quipux.com/web/'
    }
];

var mostrarExperienciaLaboral = () => {
    experienciaLaboralPersonales.forEach(xpActual => {
        $('.contenido-experiencia-laboral').append(`
            <div class="column">
                <div class="ui link centered cards">
                    <div class="card">
                        <div class="content">
                            <div class="header">${xpActual.nombre}</div>
                            <div class="meta">${xpActual.institucion}</div>
                            <div class="description">
                                <div class="meta">
                                    <i class="clock outline icon"></i> ${xpActual.tiempo}
                                </div>
                                ${xpActual.descripcion}
                            </div>
                        </div>
                        <a href='${xpActual.pagina}' class="ui bottom attached button" target='_BLANK'>
                            Página Web
                        </a>
                    </div>
                </div>
            </div>`);
    });
};