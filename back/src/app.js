import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mercadopago from 'mercadopago';
import categoriesRouter from './routes/categories';
import cartItemsRouter from './routes/cartItems';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import registerRouter from './routes/register';
import saleRouter from './routes/sales';
import adminRouter from './routes/admins';
import suscriberRouter from './routes/suscribers';


// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-4338767001765102-031414-316e8537f8e6023b2165733934397426-168068507' // agregar el TOKEN de cada uno!
});

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cartItems', cartItemsRouter);
app.use('/user', usersRouter);
app.use('/register', registerRouter);
app.use('/sales', saleRouter);
app.use('/admin', adminRouter);
app.use('/suscriber', suscriberRouter);


export default app;
