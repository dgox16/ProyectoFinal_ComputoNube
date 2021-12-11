const { Router } = require('express');
const router = Router();

const { estaAutenticado } = require('../auxiliar/validacionSesion');
const { renderVistaAutores, renderAdministrarAutor, administrarAutor } = require('../controles/autorControl');

router.get('/autores', estaAutenticado,  renderVistaAutores);


router.get('/autores/administrar/:id', estaAutenticado, renderAdministrarAutor);
router.put('/autores/administrar/:id', estaAutenticado, administrarAutor);


module.exports = router;