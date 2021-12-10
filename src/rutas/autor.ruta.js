const { Router } = require('express');
const router = Router();

const { estaAutenticado } = require('../auxiliar/validacionSesion');
const { renderVistaAutores, renderAdministrarAutor } = require('../controles/autorControl');

router.get('/autores',  renderVistaAutores);


router.get('/autores/administrar/:id', renderAdministrarAutor);


module.exports = router;