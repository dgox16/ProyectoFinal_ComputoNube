const { Router } = require('express');
const router = Router();

const { estaAutenticado } = require('../auxiliar/validacionSesion');
const { renderVistaAutores, renderAdministrarAutor, administrarAutor } = require('../controles/autorControl');

router.get('/autores',  renderVistaAutores);


router.get('/autores/administrar/:id', renderAdministrarAutor);
router.put('/autores/administrar/:id', administrarAutor);


module.exports = router;