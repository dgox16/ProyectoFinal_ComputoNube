const { Router } = require('express');
const router = Router();

const { renderIndex} = require('../controles/indexControl') // Se exportan funciones de control

router.get('/', renderIndex);

module.exports = router;
