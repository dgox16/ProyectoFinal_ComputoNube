const { Router } = require('express');
const router = Router();

const { estaAutenticado } = require('../auxiliar/validacionSesion');
const { renderVistaAutores } = require('../controles/autorControl');

router.get('/autores',  renderVistaAutores);


module.exports = router;