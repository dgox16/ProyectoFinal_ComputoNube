const auxiliar = {};

auxiliar.estaAutenticado = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('mensajeError', 'No has iniciado sesion')
    res.redirect('/usuarios/iniciar')
}

module.exports = auxiliar;