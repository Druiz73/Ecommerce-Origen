import express from 'express';
import Suscriber from '../models/suscriber';


var router = express.Router();


router.get('/', function (req, res, next) {
    Suscriber.find((error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
});

router.post('/', function (req, res, next) {
    let email = req.body.email;
    const newSuscriber = new Suscriber({
        email: email
    });
    newSuscriber.save((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data)
        }
    })
})

router.delete('/:id', function (req, res, next) {

    Suscriber.findOneAndDelete(({
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