const basketService = require('../services/basketService');

class BasketController {
    async add(req, res, next) {
        try {
            const result = await basketService.add(req);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController();