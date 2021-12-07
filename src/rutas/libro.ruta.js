const { Router } = require('express');
const router = Router();

const { renderAgregarLibro, agregarLibro, listaLibros } = require('../controles/libroControl')

router.get('/libro/agregar', renderAgregarLibro);
router.post('/libro/agregar', agregarLibro);
router.get('/libro', listaLibros)

module.exports = router;