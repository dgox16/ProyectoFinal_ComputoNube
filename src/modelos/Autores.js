const { Schema, model, Model } = require('mongoose');

const autoresEstructura = new Schema({
    nombre: {type: String},
    añoNacimiento: {type: Number},
    Nacionalidad: {type: String},
    frase: {type: String},
    filename: { type: String },
    path: { type: String }
},{
    timestamps: true
});

module.exports = model('Autor', autoresEstructura);