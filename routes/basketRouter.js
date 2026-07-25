const Router = require('express');

const router = new Router();

const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/add', authMiddleware, basketController.add);
router.get('/', authMiddleware, basketController.get);
module.exports = router;