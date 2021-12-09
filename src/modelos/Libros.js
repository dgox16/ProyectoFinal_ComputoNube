const { Schema, model, Model } = require('mongoose');

const libroEstrutura = new Schema({
    titulo: { type: String },
    autor: { type: String },
    filename: { type: String },
    path: { type: String },
    usuario: { type: String, required: true },
    calificacion: { type: Number},
    añoLectura: { type: Number}
}, {
    timestamps: true
});

module.exports = model('Libro', libroEstrutura);