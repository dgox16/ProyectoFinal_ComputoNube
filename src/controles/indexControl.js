// Controles: aqui se crearan las funciones a utilizar cuando se solicite una ruta
const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index') // Cuando se visiste la raiz; renderizar indez
};

indexCtrl.renderAcerca = (req, res) => {
    res.render('acerca') // Cuando se visite about se va a renderizar la pagina acerca
};

module.exports = indexCtrl;


