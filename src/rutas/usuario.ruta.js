const { Router } = require('express');
const router = Router();

const { renderFormRegistro, registro, renderFormInicio, iniciaSesion } = require('../controles/usuarioControl');

router.get('/usuarios/registro', renderFormRegistro);
router.post('/usuarios/registro', registro);

router.get('/usuarios/iniciar', renderFormInicio);
router.post('/usuarios/iniciar', iniciaSesion);

module.exports = router;