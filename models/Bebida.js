const mongoose = require('mongoose')
const Schema = mongoose.Schema
    //*Nombre, tipo, ingredientes, precio, tamaño, calorias, imagen, porcentaje de alcohol, nota

let Bebidas = new Schema({
    nombre: {
        type: String
    },
    tipo: {
        type: String
    },
    ingredientes: {
        type: String
    },
    precio: {
        type: Number
    },
    tamanio: {
        type: String
    },
    calorias: {
        type: Number
    },
    imagen: {
        type: String
    },
    porcentaje_alcohol: {
        type: String
    },
    nota: {
        type: String
    }
}, {
    collection: 'Bebidas'
})

module.exports = mongoose.model('Bebidas', Bebidas)