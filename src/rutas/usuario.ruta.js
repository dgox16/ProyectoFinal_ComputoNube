const { Router } = require('express');
const router = Router();

const { renderFormRegistro, registro, renderFormInicio } = require('../controles/usuarioControl');

router.get('/usuarios/registro', renderFormRegistro);
router.post('/usuarios/registro', registro);

router.get('/usuarios/iniciar', renderFormInicio);

module.exports = router;