const libroCtrl = {};

libroCtrl.renderAgregarLibro = (req, res) => {
    res.render('libros/nuevoLibro')
}
libroCtrl.agregarLibro = (req, res) => {
    console.log(req.file);
    res.send('Añadido')
}

module.exports = libroCtrl;