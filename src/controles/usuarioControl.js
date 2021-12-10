const usuarioCtrl = {};
const passport = require('passport');
const Usuario = require('../modelos/Usuario');
const Libro = require('../modelos/Libros');

// SECCION REGISTRO
usuarioCtrl.renderFormRegistro = (req, res) => {
    res.render('usuarios/registro')
};


usuarioCtrl.registro = async (req, res) => {
    const errores = [];
    const { nombre, usuario, contraseña, confirmarContraseña } = req.body;
    if (contraseña != confirmarContraseña) {
        errores.push({ text: 'Las contraseñas no coinciden' });
    };
    if (contraseña.length < 4) {
        errores.push({ text: 'La contraseña debe tener al menos 4 caracteres' });
    };
    if (errores.length > 0) {
        res.render('usuarios/registro', {
            errores,
            nombre,
            usuario
        });
    } else {
        const usuarioID = await Usuario.findOne({ usuario: usuario });
        if (usuarioID) {
            req.flash('mensajeError', "El usuario ya está en uso");
            res.redirect('/usuarios/registro')
        } else {
            const nuevoUsuario = new Usuario({ nombre, usuario, contraseña, esAdministrador: false });
            nuevoUsuario.contraseña = await nuevoUsuario.encriptarContraseña(contraseña);
            await nuevoUsuario.save();
            req.flash('mensajeExito', 'Se ha registrado correctamente')
            res.redirect('/usuarios/iniciar')
        }
    }
}


//SECCION INICIO SESION
usuarioCtrl.renderFormInicio = (req, res) => {
    res.render('usuarios/iniciar');
}

usuarioCtrl.iniciaSesion = passport.authenticate('local', {
    failureRedirect: '/usuarios/registro',
    successRedirect: '/libro',
    failureFlash: true
});


//SECCION CERRAR SESION
usuarioCtrl.cerrarSesion = (req, res) => {
    req.logout();
    req.flash('mensajeExito', 'Has cerrado sesión');
    res.redirect('/usuarios/iniciar');
}


// ADMINISTRAR 
usuarioCtrl.renderAdministrar = async (req, res) => {
    const usuario = await Usuario.find({ esAdministrador: false }).sort({ createdAt: -1 });
    res.render('usuarios/administrar', { usuario })
}


// ELIMINAR USUARIO
usuarioCtrl.eliminarUsuario = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    await Libro.deleteMany({ usuario: req.params.id });
    req.flash('mensajeExito', 'Has eliminado al usuario');
    res.redirect('/usuarios/administrar');
}


// EDITAR USUARIO
usuarioCtrl.renderEditarUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.render('usuarios/editar', { usuario });
}

usuarioCtrl.editarUsuario = async (req, res) => {
    const { nombre, usuario, esAdministrador } = req.body;
    if (esAdministrador) {
        await Usuario.findByIdAndUpdate(req.params.id, { nombre, usuario, esAdministrador });
    } else {
        await Usuario.findByIdAndUpdate(req.params.id, { nombre, usuario });
    }
    res.redirect('/usuarios/administrar');
}


module.exports = usuarioCtrl;