const usuarioCtrl = {};
const passport = require('passport');
const Usuario = require('../modelos/Usuario');

// SECCION REGISTRO
usuarioCtrl.renderFormRegistro = (req, res) => {
    res.render('usuarios/registro')
};


usuarioCtrl.registro = async (req, res) => {
    const errores = [];
    const { nombre, usuario, contraseña, confirmarContraseña } = req.body;
    if (contraseña != confirmarContraseña) {
        errores.push({text: 'Las contraseñas no coinciden'});
    };
    if (contraseña.length < 4) {
        errores.push({text: 'La contraseña debe tener al menos 4 caracteres'});
    };
    if (errores.length > 0) {
        res.render('usuarios/registro', {
            errores,
            nombre,
            usuario
        });
    } else {
        const usuarioID = await Usuario.findOne({usuario:usuario});
        if (usuarioID) {
            req.flash('mensajeError', "El usuario ya está en uso");
            res.redirect('/usuarios/registro')
        } else {
            const nuevoUsuario = new Usuario({nombre,usuario,contraseña});
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
    failureRedirect : '/usuarios/registro',
    successRedirect : '/libro',
    failureFlash : true
});

//SECCION CERRAR SESION
usuarioCtrl.cerrarSesion = (req, res) => {
    req.logout();
    req.flash('mensajeExito', 'Has cerrado sesión');
    res.redirect('/usuarios/iniciar');
}

module.exports = usuarioCtrl;