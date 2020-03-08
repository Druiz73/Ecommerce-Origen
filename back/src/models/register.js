import mongoose from 'mongoose';

const registerSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
     password: {
         type: String,
         required: true
     },
    domicilio: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    edad : {
        type: String,
        required: true
    },
    image: []
});

const Register = mongoose.model('Register', registerSchema);

export default Register;
