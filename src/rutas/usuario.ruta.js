const { Router } = require('express');
const router = Router();

const { renderFormRegistro, 
        registro, 
        renderFormInicio, 
        iniciaSesion, 
        cerrarSesion, 
        renderAdministrar,
        eliminarUsuario,
        renderEditarUsuario,
        editarUsuario
      } = require('../controles/usuarioControl');

router.get('/usuarios/registro', renderFormRegistro);
router.post('/usuarios/registro', registro);

router.get('/usuarios/iniciar', renderFormInicio);
router.post('/usuarios/iniciar', iniciaSesion);

router.get('/usuarios/cerrarSesion', cerrarSesion);

router.get('/usuarios/administrar', renderAdministrar);

router.delete('/usuarios/eliminar/:id', eliminarUsuario);

router.get('/usuarios/editar/:id', renderEditarUsuario);

router.put('/usuarios/editar/:id', editarUsuario)

module.exports = router;