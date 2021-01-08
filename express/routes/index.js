const express = require('express');
const router = express.Router();


const IndexController = require('../controllers/index-controller');

router.get('/', IndexController.home);

const ProductsController = require('../controllers/product-controller');
const CategoryController = require('../controllers/category-controller');
const OrderStatusController = require('../controllers/status-controller');
const OrderController = require('../controllers/order-controller');
const CartController = require('../controllers/cart-controller');
const OrderListController = require('../controllers/order-list-controller');

 router.get('/products', ProductsController.getAll);
 router.get('/products/:id', ProductsController.getById);
 router.post('/products', ProductsController.add);
 router.put('/products/:id', ProductsController.updateById);
 router.get('/category/:id', ProductsController.getByCategoryId);
router.get('/category', CategoryController.getAll);
router.get('/category-name/:id', CategoryController.getByCategoryId);

router.get('/status', OrderStatusController.getAll);

router.get('/orders', OrderController.getAll);
router.get('/orders/status/:id', OrderController.get);
router.post('/orders', OrderController.add);
router.put('/orders/:id', OrderController.updateById);
router.get('/last-order', OrderController.getLatest);

router.post('/carts', CartController.add);
router.delete('/carts', CartController.delete);
router.get('/carts', CartController.getAll);

router.post('/order-list', OrderListController.add);
router.get('/order-list', OrderListController.get);

module.exports = router;


