const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//*nombre, tipo, ingredientes, precio, tamanio, calorias, imagen, porcentaje_alcohol, nota

let Bebida = new Schema(
  {
    nombre: {
      type: String,
    },
    tipo: {
      type: String,
    },
    ingredientes: {
      type: String,
    },
    precio: {
      type: Number,
    },
    tamanio: {
      type: String,
    },
    calorias: {
      type: Number,
    },
    imagen: {
      type: String,
    },
    porcentaje_alcohol: {
      type: String,
    },
    nota: {
      type: String,
    },
  },
  {
    collection: "bebidas",
  }
);

module.exports = mongoose.model("Bebidas", Bebida);
