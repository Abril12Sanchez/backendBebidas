const express = require("express");
const path = require("path")
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// conectamos a la base de datos
mongoose
  .connect("mongodb://localhost:27017/bebidas")
  .then((conn) => {
    console.log(`Conectado a la base de datos: "${conn.connection.name}"`);
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
  });

//configuarar el servidor web
const bebidaRutas = require("./routes/bebida.routes");
const { create } = require("./models/Bebida");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", bebidaRutas);
// Puerto de escucha _ habilitamos el puerto 4000
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

// Manejo de errores 404
app.use((err, req, res, next) => {
  next(createError(404));
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message || "Error interno del servidor");
});
