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

const { estaAutenticado, esAdmin } = require('../auxiliar/validacionSesion');

router.get('/usuarios/registro', renderFormRegistro);
router.post('/usuarios/registro', registro);

router.get('/usuarios/iniciar', renderFormInicio);
router.post('/usuarios/iniciar', iniciaSesion);

router.get('/usuarios/cerrarSesion', cerrarSesion);

router.get('/usuarios/administrar', estaAutenticado, esAdmin, renderAdministrar);

router.delete('/usuarios/eliminar/:id', estaAutenticado, esAdmin, eliminarUsuario);

router.get('/usuarios/editar/:id', estaAutenticado, esAdmin, renderEditarUsuario);

router.put('/usuarios/editar/:id', estaAutenticado, esAdmin, editarUsuario)

module.exports = router;