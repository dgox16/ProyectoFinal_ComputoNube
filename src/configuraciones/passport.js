const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../modelos/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contraseña'
}, async (usuario, contraseña, terminado) => {
    const user = await Usuario.findOne({ usuario });
    if (!user) {
        return terminado(null, false, { message: 'No existe este usuario' });
    } else {
        const comparacion = await user.compararContraseña(contraseña);
        if (comparacion) {
            return terminado(null, user);
        } else {
            return terminado(null, false, { message: 'Contraseña incorrecta' })
        }
    }
}));

passport.serializeUser((user, terminado) => {
    terminado(null, user.id);
});
passport.deserializeUser((id, terminado) => {
    Usuario.findById(id, (err, user) => {
        terminado(err, user);
    })
})
