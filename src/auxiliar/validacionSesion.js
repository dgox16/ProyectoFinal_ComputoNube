const auxiliar = {};

auxiliar.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('mensajeError', 'No has iniciado sesion')
    res.redirect('/usuarios/iniciar')
}

auxiliar.esAdmin = (req, res, next) => {
    if (req.user.esAdministrador) {
        return next();
    }
    req.flash('mensajeError', 'No esta autorizado')
    res.redirect('/libro')
}

module.exports = auxiliar;