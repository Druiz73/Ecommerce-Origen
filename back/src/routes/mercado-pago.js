// SDK de Mercado Pago
import mercadopago from 'mercadopago';
import express from 'express';

var router = express.Router();

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-4338767001765102-030316-ea84fea9fb4b2f86e727b101f625c140-168068507' // agregar el TOKEN de cada uno!
});

/* GET home page. */
router.post('/', function (req, res, next) {
    // Crea un objeto de preferencia
    let items = req.body.products.map((element)=>{
       items={
        title: element.detalle,
        unit_price: parseInt(element.precio),
        quantity: parseInt(element.cantidad)
       }
       return items
    })  
       console.log(items)  
    
    let preference = {
        items,
        "back_urls": {
            "success": "http://localhost:3000/success",
            "failure": "http://localhost:3000/failure",
            "pending": "http://localhost:3000/pending"
        },
        "auto_return": "approved",
    }
    mercadopago.preferences.create(preference)
        .then(function (err, response) {
            if (err) {
                res.send(err)
            } else {
                global.init_point = response.body.init_point;
                res.send(global.init_point)
            }
            // Este valor reemplazará el string "$$init_point$$" en tu HTML
        }).catch(function (error) {
            console.log(error);
        });

});



export default router;