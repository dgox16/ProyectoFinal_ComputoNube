const { Router } = require('express');
const router = Router();

const { renderAgregarLibro, 
        agregarLibro, 
        listaLibros, 
        renderVistaLibro, 
        eliminarLibro, 
        renderEditarLibro, 
        editarLibro} = require('../controles/libroControl');

const { estaAutenticado } = require('../auxiliar/validacionSesion');

// AÑADIR LIBRO 
router.get('/libro/agregar', estaAutenticado, renderAgregarLibro);
router.post('/libro/agregar', estaAutenticado, agregarLibro);

// VER LIBROS
router.get('/libro', estaAutenticado, listaLibros);
router.get('/libro/:id', estaAutenticado, renderVistaLibro);

// EDITAR Y ELIMINAR LIBROS
router.delete('/libro/eliminar/:id', estaAutenticado, eliminarLibro);
router.get('/libro/editar/:id', estaAutenticado, renderEditarLibro);
router.put('/libro/editar/:id', estaAutenticado, editarLibro);


module.exports = router;