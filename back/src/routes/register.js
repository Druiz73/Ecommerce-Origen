import express from 'express';
import users from '../models/register';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

process.env.SECRET_KEY = 'secret';

var router = express.Router();

router.post('/', function (req, res, next) {
    const createAt = new Date();
    const {
        nombre,
        apellido,
        email,
        domicilio,
        edad,
        password,
        image,
        provincia
    } = req.body;
    const nuevo = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        domicilio: domicilio,
        edad: edad,
        password: password,
        image: image,
        provincia: provincia
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
export default router;