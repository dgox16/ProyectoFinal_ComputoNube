// Controles: aqui se crearan las funciones a utilizar cuando se solicite una ruta
const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index') // Cuando se visiste la raiz; renderizar indez
};

module.exports = indexCtrl;


