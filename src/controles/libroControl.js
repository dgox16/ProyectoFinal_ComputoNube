const libroCtrl = {};

libroCtrl.renderAgregarLibro = (req, res) => {
    res.send('Añadir Libro')
}
libroCtrl.agregarLibro = (req, res) => {
    res.send('Añadido')
}

module.exports = libroCtrl;