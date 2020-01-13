import express from 'express';
import mongoose from 'mongoose';
import products from '../models/product';


mongoose.connect('mongodb://localhost:27017/OrigenDB', {
    useNewUrlParser: true
});

var router = express.Router();

/* GET home page. */
router.get('/products', function (req, res, next) {
    products.find((error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
});

router.post('/products', function (req, res, next) {

    const {
        nombre,
        slug,
        talle,
        precio,
        color,
        stock,
        descripcion,
        productPic,
    } = req.body;
    const nuevo = new products({
        nombre: nombre,
        slug: slug,
        parent: parent,
        talle: talle,
        precio: precio,
        color: color,
        stock: stock,
        descripcion: descripcion,
        productPic: productPic

    })
    nuevo.save((error, item) => {
        if (error) {
            res.send(error);
        } else {
            res.send(item);
        }
    })
})




router.put('/products/:id', function (req, res, next) {
    products.updateOne({
        _id: req.params.id
    }, {
        name: req.body.name,
        slug: req.body.slug,
        parent: req.body.parent,
        talle: req.body.talle,
        precio: req.body.precio,
        color: req.body.color,
        stock: req.body.stock,
        descripcion: req.body.descripcion,
        productPic: req.body.descripcion
    }, (err, data) => {
        if(err){
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.delete('/products/delete/:id', function (req, res, next) {

    products.findOneAndDelete(({
        _id: req.params.id
    }), (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    });
})



// router.get('/pagination', function (req, res, next) {
//     Investment.find((error, data) => {
//         let cant = 3;
//         let desde = 0;
//         let cantInv = data.length;
//         let paginas = cantInv / cant;
//         paginas = Math.ceil(paginas)
//         console.log(cantInv)
//         if (error) {
//             res.send(error)
//         } else {
//             res.send({
//                 results: data.slice(desde, desde + cant),
//                 totalInv: data.length,
//                 cantPaginas: paginas
//             });

//         }
//     })
// });

export default router;