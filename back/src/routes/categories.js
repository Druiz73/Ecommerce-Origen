import express from 'express';
import mongoose from 'mongoose';
import category from '../models/category';


mongoose.connect('mongodb://localhost:27017/OrigenDB', {
    useNewUrlParser: true
});

var router = express.Router();

/* GET home page. */
router.get('/categories', function (req, res, next) {
    category.find((error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    })
});

router.post('/categories', function (req, res, next) {

    const {
        name,
        slug,
        parent
    } = req.body;
    const nuevo = new category({
        name: name,
        slug: slug,
        parent: parent

    })
    nuevo.save((error, item) => {
        if (error) {
            res.send(error);
        } else {
            res.send(item);
        }
    })
})




router.put('/categories/:id', function (req, res, next) {
    category.updateOne({
        _id: req.params.id
    }, {
        name: req.body.name,
        slug: req.body.slug,
        parent: req.body.parent
    }, (err, data) => {
        if(err){
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

router.delete('/delete/:id', function (req, res, next) {

    category.findOneAndDelete(({
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