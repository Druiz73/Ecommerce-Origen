import express from 'express';
import Sale from '../models/sale';
import mercadopago from 'mercadopago';

var router = express.Router();

router.get('/', function (req, res, next) {
    Sale.find((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);

        }
    });
});

router.get('/:id', function (req, res, next) {
    Sale.findById({
        _id: req.params.id
    }, function (error, sale) {
        if (error) {
            res.send(error);
        } else {
            res.send(sale)
        }
    })
})

router.put('/:id', function (req, res, next) {
    Sale.updateOne({
        _id: req.params.id
    }, {
        status: req.body.status
    }, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    })
})

router.post('/', function (req, res, next) {
   
    let products = req.body.products.map((item) => ({
        title:item.titulo,
        quantity: parseInt(item.quantity),
        unit_price: parseInt(item.price)
    }))
  
    const newSale = new Sale({
        products: products
    });
    
    newSale.save((error, data) => {
        if (error) {
            res.send(error);
        } else {
            // Crea un objeto de preferencia
            let preference = {
                items: products,
                "back_urls": {
                    "success": "http://localhost:3000/returnMercado",
                    "failure": "http://localhost:3000/returnMercado",
                    "pending": "http://localhost:3000/returnMercado"
                },
                "auto_return": "approved",
                external_reference: data._id.toString()
            };
            mercadopago.preferences.create(preference)
                .then(function (response) {
                    res.send({ init_point: response.body.init_point });
                }).catch(function (error) {
                    console.log(error);
                });
           
        }
    })
})

router.delete('/', function (req, res, next) {
    Sale.deleteOne({
        _id: req.body.id
    }), (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    }
})

export default router;