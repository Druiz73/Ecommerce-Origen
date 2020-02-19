import express from 'express';
import mongoose from 'mongoose';
import users from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

process.env.SECRET_KEY = 'secret';


mongoose.connect('mongodb://localhost:27017/jokkerDB', {
    useNewUrlParser: true
});

var router = express.Router();




router.post('/register', function (req, res, next) {
    const createAt = new Date();
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    const nuevo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        createAt: createAt
    }
    users.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 3, (err, hash) => {
                    nuevo.password = hash
                    users.create(nuevo)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            }
            else {
                res.json({ error: 'user already' })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})

router.post('/login', function (req, res, next) {
    users.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
                else {
                    res.json({ error: 'user does not exist' })
                }
            }
            else {
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/profile', function (req, res, next) {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    users.findOne({
        _id: decoded._id
    })

        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("user does not exist")
            }
        })

        .catch(err => {
            res.send('error: ' + err)
        })
});

router.put('/edit/:id', function (req, res, next) {
    users.updateOne({
        _id: req.params.id
    }, {
        nombre: req.body.nombre,
    }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    });
});

router.delete('/delete/:id', function (req, res, next) {

    users.findOneAndDelete(({
        _id: req.params.id
    }), (error, data) => {
        if (error) {
            res.send(error)
        } else {
            res.send(data)
        }
    });
});



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