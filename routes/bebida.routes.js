const express = require("express");
const upload = require("../Upload");
const bebidaRouter = express.Router();

// Declaramos un objeto nuevo
let Bebida = require("../models/Bebida");

//agregar una nueva bebida
bebidaRouter.route('/agregar').post(upload.single('imagen'), (req, res)=>{
    const nuevaBebida = new Bebida({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        ingredientes: req.body.ingredientes,
        precio: req.body.precio,
        tamaño: req.body.tamaño,
        calorias: req.body.calorias,
        porcentaje_alcohol: req.body.porcentaje_alcohol,
        nota: req.body.nota,
        imagen: req.file ? `/uploads/${req.file.filename}`: '' // aquí guardas la ruta
    });

    nuevaBebida.save()
    .then((data) =>{
        console.log('Se agrega la bebida correctamente');
        res.send(data);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error al guardar la bebida", error)
    });
});

//obtenemos toda la informacion de las bebidas
bebidaRouter.route('/bebidas').get((req, res)=>{
    Bebida.find()
    .then((data)=>{
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

//obtenemos una sola bebida por su ID
bebidaRouter.route('/bebida/:id').get((req, res) => {
    Bebida.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error(error)    
    })
})

//actualizar una bebida
bebidaRouter.route('/actualizar/:id').put((req, res) => {
    Bebida.findByIdAndUpdate(req.params.id, {
        $set: req.body
    })
    .then((data) => {
        console.log("La bebida se actualizo correctamente")
        res.send(data)
    })
    .catch((error)=>{
        console.error(error)
    })
})

//eliminar una bebida
bebidaRouter.route('/eliminar/:id').delete((req, res)=>{
    Bebida.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('La bebida se elimino correctamente')
        res.send(data)
    })
    .catch((error) => {
        console.error(error)
    })
})


// Exportamos el router
module.exports = bebidaRouter;
