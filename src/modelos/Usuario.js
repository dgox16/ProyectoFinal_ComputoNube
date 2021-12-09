const {Schema, model, Model} = require('mongoose'); //librerias para las estructuras en Mongo
const bcrypt = require('bcryptjs'); // Libreria para encriptar

const usuarioEstructura = new Schema({  // Se crea la estructura basica de los usuarios
    nombre : {type : String, required : true},
    usuario : {type : String, required : true, unique:true},
    contraseña : {type : String, required : true},
    esAdministrador : {type : Boolean, required : true}
}, {
    timestamps : true // Hora de creacion
});

// Encriptar contraseña
usuarioEstructura.methods.encriptarContraseña = async contraseña => { // Creacion del metodo donde se necesita una contraseña
    const salt = await bcrypt.genSalt(10); // Se genera un numero que mientras mayor sea, mayor sera la complejidad del cifrado
    return await bcrypt.hash(contraseña, salt); // Se crea un hash con la contraseña y el salt; este valor se retorna   
};

usuarioEstructura.methods.compararContraseña = async function(contraseña) { // Algoritmo para comparar contraseñas
    return await bcrypt.compare(contraseña, this.contraseña) // Comparacion de la contraseña con la contraseña cifrada
};

module.exports = model('Usuario', usuarioEstructura);