const { Router } = require('express');
const router = Router();

const { renderAgregarLibro, agregarLibro, listaLibros } = require('../controles/libroControl')
const { estaAutenticado } = require('../auxiliar/validacionSesion');

router.get('/libro/agregar', estaAutenticado, renderAgregarLibro);
router.post('/libro/agregar', estaAutenticado, agregarLibro);
router.get('/libro', estaAutenticado, listaLibros)

module.exports = router;