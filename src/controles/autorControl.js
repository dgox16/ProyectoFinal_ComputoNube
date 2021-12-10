const autorCtrl = {};
const Autor = require('../modelos/Autores');
const Libro = require('../modelos/Libros');

autorCtrl.renderVistaAutores = async (req, res) => {
    const autores = await Autor.find().sort({nombre: 1});
    res.render('autores/todosAutores', {autores});
};
autorCtrl.renderAdministrarAutor = async (req, res) => {
    const autor = await Autor.findById(req.params.id);
    const libros = await Libro.find({ autor: autor.nombre })
    res.render('autores/administrar', { autor, libros });
}

autorCtrl.administrarAutor = async (req, res) => {
    const autorAux = await Autor.findById(req.params.id);
    const { nombre, añoNacimiento, Nacionalidad, frase} = req.body;
    const { filename } = req.file;
    await Libro.updateMany({autor: autorAux.nombre}, {autor: nombre})
    await Autor.findByIdAndUpdate(req.params.id, {
        nombre,
        añoNacimiento,
        Nacionalidad,
        frase,
        filename,
        path: 'img/subidas/' + filename
    });
    
    res.send('Editado correctamente')
}


module.exports = autorCtrl;