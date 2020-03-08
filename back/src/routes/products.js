import express from 'express';
import mongoose from 'mongoose';
import products from '../models/product';

mongoose.connect('mongodb://localhost:27017/jokkerDB', {
    useNewUrlParser: true
});

var router = express.Router();

router.get('/:id', (req, res, next) => {
    let productIds = req.params.id;
    products.find({
            'category': {
                $in: productIds
            }
        })
        .exec((err, product) => {
            if (err) return res.send(err)
            return res.status(200).send(product)
        })
})


router.get('/cart/:id', function (req, res, next) {
    products.findById({
        _id: req.params.id
    }, function (err, producto) {
        if (err) throw err;
        res.send(producto)
    });
});



router.get('/', function (req, res, next) {
    products.find((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

router.get('/search', async function (req, res, next) {
    let productos;
    if (req.query.q) {
        productos = await productos.find({
            $text: {
                $search: req.query.q
            }
        }, 
        {
            score: {
                $meta: 'textScore'
            }
        }
        ).sort({
            score: {
                $meta: 'textScore'
            }
        });
    }
    res.json(productos);

});

router.post('/create', function (req, res, next) {

    const {
        titulo,
        talle,
        precioMayor,
        precioMenor,
        stock,
        descripcion,
        talles,
        category,
        imageUrl
    } = req.body;

    const nuevo = new products({
        titulo: titulo,
        talle: talle,
        precioMayor: precioMayor,
        precioMenor: precioMenor,
        stock: stock,
        descripcion: descripcion,
        talles: talles,
        category: category,
        imageUrl: imageUrl
    });

    nuevo.save((error, item) => {
        if (error) {
            res.send(error);
        } else {
            res.send(item);
        }
    })
})

router.put('/edit/:id', function (req, res, next) {
    products.updateOne({
            _id: req.params.id,
        }, {
            titulo: req.body.titulo,
            precioMayor: req.body.precioMayor,
            precioMenor: req.body.precioMenor,
            stock: req.body.stock,
            descripcion: req.body.descripcion,
            talles: req.body.talles,
            category: req.body.category
        },
        (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.send(data)

            }
        });
});

router.delete('/delete/:id', function (req, res, next) {

    products.findOneAndDelete(({
        _id: req.params.id
    }), (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    });
});



export default router;