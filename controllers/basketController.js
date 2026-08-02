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
            return res.json(basket);
        } catch (e) {
            next(e);
        }
    }

    async clear(req, res, next) {
        try {
            const result = await basketService.clear(req);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async fetchDevicesFromBasket(req, res, next) {
        const { idUser } = req.params;
        const basket = await Basket.findOne({ where: { userId: idUser } });
        const devicesInBasketDevice = await BasketDevice.findAll({ where: { basketId: basket.dataValues.id } });
        let devicesIdsDevice = devicesInBasketDevice.map(elem => elem.deviceId);
        const devices = await Device.findAll({ where: { id: devicesIdsDevice } });
        let items = [];
        devicesIdsDevice.forEach(id => {
            const findDevice = devices.find(obj => obj.id === id);
            items.push(findDevice);
        });
        return res.json(items);
    }

    async addRate(req, res, next) {
        const { idUser, idDevice, rateValue } = req.body;
        console.log(idUser, idDevice, rateValue);

        const rating = await Rating.findOne({
            where: { userId: idUser, deviceId: idDevice }
        });
        if (rating === null && rateValue != null) {
            try {
                await Rating.create({ rate: rateValue, userId: idUser, deviceId: idDevice });
            } catch (error) {
                console.log(error.message);
            }
        }
        if (rateValue != null) {
            try {
                await Rating.update(
                    { rate: rateValue },
                    { where: { userId: idUser, deviceId: idDevice } }
                );
            } catch (error) {
                console.log(error.message);
            }
        }
        const devices = await Rating.findAll({ where: { deviceId: idDevice } });
        let ratesSum = devices.reduce((acc, elem) => acc + elem.rate, 0);
        let ratingMiddle = Math.round(ratesSum / devices.length);

        try {
            await Device.update(
                { rating: ratingMiddle },
                { where: { id: idDevice } }
            );
        } catch (error) {
            console.log(error.message);
        }
        const device = await Device.findOne({ where: { id: idDevice } });

        return res.json(device);
    }

    async getSearchGoods(req, res, next) {
        // const { idUser } = req.params
        const idUser = 7;
        let basket;
        try {
            basket = await Basket.findOne({ where: { userId: idUser } });
        } catch (error) {
            console.log(error.message);
        }

        return res.json(basket);
    }
}

module.exports = new BasketController();