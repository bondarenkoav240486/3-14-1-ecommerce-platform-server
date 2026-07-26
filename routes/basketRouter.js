const Router = require('express');

const router = new Router();

const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/add', authMiddleware, basketController.add);
router.get('/', authMiddleware, basketController.get);
router.delete('/remove', authMiddleware, basketController.remove);

module.exports = router;