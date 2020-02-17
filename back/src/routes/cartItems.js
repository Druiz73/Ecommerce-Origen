import express from 'express';


var router = express.Router();

router.get('/', function (req, res, next) {
    Sale.find((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);

        }
    });
})

router.get('/:id', function (req, res, next) {
    Sale.findById({ _id: req.params._id }, function (error, sale) {
        if (error) {
            res.send(error);
        } else {
            res.send(sale)
        }
    })
})

router.put('/id:', function (req, res, next) {
    Sale.updateOne(({ _id: req.params._id }, { total: req.params.total, cantidad: req.params.cantidad, user: req.params.user })), (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    }
})

router.post('/', function (req, res, next) {
    const newSale = new Sale({
        cantidad: req.body.cantidad,
        detalle: req.body.detalle,
        total: req.body.total,
        precio: req.body.precio,
        status: req.body.status
    });
    console.log(newSale);
    newSale.save((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    })
})

router.delete('/', function (req, res, next) {
    Sale.deleteOne({ _id: req.body.id }), (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    }
})

export default router;
