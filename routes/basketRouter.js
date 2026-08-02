const Router = require('express');

const router = new Router();

const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/add', authMiddleware, basketController.add);
router.get('/', authMiddleware, basketController.get);
// router.post('/remove', authMiddleware, basketController.remove);
router.delete('/remove', authMiddleware, basketController.remove);
router.post('/clear', authMiddleware, basketController.clear);

module.exports = router;