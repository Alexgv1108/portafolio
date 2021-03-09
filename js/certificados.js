var certificadosPersonales = [
    {
        nombre: 'Técnica en sistemas',
        institucion: 'Cetasdi',
        ubicacion: 'Rionegro, Antioquia',
        descripcion: 'Conceptos de programación Web y mantenimiento de computadores.',
        descripcionModal: 'Técnica profesional en sistemas',
        nombrePDF: 'tecnica.pdf',
        identificador: 'tecnica-sistemas'
    },
    {
        nombre: 'Marca personal',
        institucion: 'Platzi',
        ubicacion: 'Web',
        descripcion: 'Conceptos para tener un manejo de las redes sociales en el ámbito laboral.',
        descripcionModal: 'Certificado de Platzi.',
        nombrePDF: 'diploma-marca-personal.pdf',
        identificador: 'marca-personal'
    },
    {
        nombre: 'Introducción a la Web',
        institucion: 'Platzi',
        ubicacion: 'Web',
        descripcion: 'Historia y conceptos básicos de la Web y el internet.',
        descripcionModal: 'Certificado de Platzi.',
        nombrePDF: 'diploma-introweb.pdf',
        identificador: 'introduccion-web'
    },
    {
        nombre: 'Entorno de desarrollo Windows',
        institucion: 'Platzi',
        ubicacion: 'Web',
        descripcion: 'Preconfiguración del entorno Windows para desarrollo Web.',
        descripcionModal: 'Certificado de Platzi.',
        nombrePDF: 'diploma-prework-windows.pdf',
        identificador: 'prework-desarrollo-web'
    },
    {
        nombre: 'Desarrollo de Software',
        institucion: 'Casa de la cultura',
        ubicacion: 'Rionegro, Antioquia',
        descripcion: 'Semillero sobre conceptos básicos de programación',
        descripcionModal: 'Semillero, casa de la cultura.',
        nombrePDF: 'casa-cultura-programacion.pdf',
        identificador: 'casa-cultura-programacion'
    }
];

var mostrarCertificados = () => {
    certificadosPersonales.forEach(certificadoActual => {
        $('.contenido-certificados').append(`
            <div class="column">
                <div class="ui link centered cards">
                    <div class="card">
                        <div class="content">
                            <div class="header">${certificadoActual.nombre}</div>
                            <div class="meta">${certificadoActual.institucion}</div>
                            <div class="description">
                                <div class="meta">
                                    <i class="location arrow icon"></i> ${certificadoActual.ubicacion}
                                </div>
                                ${certificadoActual.descripcion}
                            </div>
                        </div>
                        <a class="ui bottom attached button modal-pdf" onclick="certificados('${certificadoActual.identificador}');">
                            <i class="folder open outline icon"></i>Ver certificado
                        </a>
                        <a class="ui bottom attached button modal-pdf-movil" href='pdf/${certificadoActual.nombrePDF}' target='_BLANK'">
                            <i class="folder open outline icon"></i>Abrir certificado
                        </a>
                    </div>
                </div>
            </div>`);

        $('.certificados-modal').append(`
            <div class="ui modal ${certificadoActual.identificador}">
                <div class="header">
                    ${certificadoActual.nombre}
                </div>
                <div class="image content">
                    <div class="description">
                        <div class="ui header">${certificadoActual.descripcionModal}</div>
                        <embed src="pdf/${certificadoActual.nombrePDF}" type="application/pdf"/>
                    </div>
                </div>
                <div class="actions">
                    <div class="ui button deny">Cerrar ventana</div>
                </div>
            </div>`);
    });
};

var certificados = (identificador) => {
    $(`.ui.modal.${identificador}`).modal('show');
};