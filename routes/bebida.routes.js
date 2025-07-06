const express = require("express");
const upload = require("../Upload");
const fs = require('fs')
const path = require('path')
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
        tamanio: req.body.tamanio,
        calorias: req.body.calorias,
        porcentaje_alcohol: req.body.porcentaje_alcohol,
        nota: req.body.nota,
        imagen: req.file ? `/uploads/${req.file.filename}` : '' //guardamos la ruta de las imagenes
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
bebidaRouter.route('/actualizar/:id').put(upload.single('imagen'), async (req, res) => {
    try {
        const bebida = await Bebida.findById(req.params.id);

        // Si se subió una nueva imagen, eliminar la anterior
        if (req.file && bebida.imagen) {
            const imagenAnteriorPath = path.join(__dirname, '..', bebida.imagen);
            if (fs.existsSync(imagenAnteriorPath)) {
                fs.unlinkSync(imagenAnteriorPath);
            }
        }

        // Actualizar la bebida
        bebida.set({
            ...req.body,
            imagen: req.file ? `/uploads/${req.file.filename}` : bebida.imagen,
        });

        const bebidaActualizada = await bebida.save();
        res.send(bebidaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la bebida');
    }
});



//eliminar una bebida
bebidaRouter.route('/eliminar/:id').delete(async (req, res) => {
    try {
        const bebida = await Bebida.findByIdAndDelete(req.params.id);

        if (bebida && bebida.imagen) {
            const imagenPath = path.join(__dirname, '..', bebida.imagen);
            if (fs.existsSync(imagenPath)) {
                fs.unlinkSync(imagenPath);
            }
        }

        res.send(bebida);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la bebida');
    }
});



// Exportamos el router
module.exports = bebidaRouter;
