import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import categoriesRouter from './routes/categories';
import cartItemsRouter from './routes/cartItems';
import ordersRouter from './routes/orders';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import registerRouter from './routes/register';
import saleRouter from './routes/Sales';
import adminRouter from './routes/admins';
import suscriberRouter from './routes/suscribers';
import mercadoPago from './routes/mercado-pago';

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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000 }));


app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/cartItems', cartItemsRouter);
app.use('/user', usersRouter);
app.use('/register', registerRouter);
app.use('/sales', saleRouter);
app.use('/admin', adminRouter);
app.use('/suscriber', suscriberRouter);
app.use('/mercado-pago', mercadoPago);
// app.use('/orders', ordersRouter);
// app.use('/products', productsRouter);

export default app;
