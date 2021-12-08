const { Schema, model, Model } = require('mongoose');

const libroEstrutura = new Schema({
    titulo : {type : String},
    descripcion : {type : String},
    filename : {type : String},
    path : {type : String},
    originalname : {type : String},
    mimetype : {type : String},
    size : {type : Number},
    usuario : {type : String, required: true},
    creandoEl : {type : Date, default: Date.now()}
});

module.exports = model('Libro', libroEstrutura);