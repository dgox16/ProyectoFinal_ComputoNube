const { Router } = require('express');
const router = Router();

const { renderAgregarLibro, agregarLibro } = require('../controles/libroControl')

router.get('/libro/agregar', renderAgregarLibro);
router.post('/libro/agregar', agregarLibro);

module.exports = router;