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

    async get(req, res, next) {
        try {
            const result = await basketService.get(req);

            return res.json(result);
        } catch (e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const basket = await basketService.remove(req);
            console.log(`basket controller`)
            return res.json(basket);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BasketController();