const { Router } = require('express');
const router = Router();

const { renderIndex, renderAcerca } = require('../controles/indexControl') // Se exportan funciones de control

router.get('/', renderIndex);

router.get('/acerca', renderAcerca);

module.exports = router;
