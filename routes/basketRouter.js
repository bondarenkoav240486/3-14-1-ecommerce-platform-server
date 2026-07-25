const Router = require('express');

const router = new Router();

const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/add', authMiddleware, basketController.add);
module.exports = router;