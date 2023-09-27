const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/api/products', require('./products'));
app.use('/api/users', require('./users'));
app.use('/api/cart', require('./cart'));
app.use('/api/orders', require('./orders'));
app.use('/api/inventory', require('./inventory'));
app.use('/api/order-history', require('./orderHistory'));
app.use('/api/promotions', require('./promotions'));
app.use('/api/paymentDetails', require('./paymentDetails'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});
