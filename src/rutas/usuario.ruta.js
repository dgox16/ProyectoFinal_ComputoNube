const { Router } = require('express');
const router = Router();

const { renderFormRegistro, registro } = require('../controles/usuarioControl');

router.get('/usuarios/registro', renderFormRegistro);
router.post('/usuarios/registro', registro);

module.exports = router;