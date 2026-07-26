const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketService {

    async add(req) {
        const { deviceId } = req.body;
        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: {
                userId
            }
        });

        if (!basket) {
            throw ApiError.badRequest('Basket not found');
        }

        // Перевіряємо, чи існує товар
        const device = await Device.findByPk(deviceId);

        if (!device) {
            throw ApiError.badRequest('Device not found');
        }

        const basketDevice = await BasketDevice.findOne({
            where: {
                basketId: basket.id,
                deviceId
            }
        });

        if (basketDevice) {
            basketDevice.quantity += 1;
            await basketDevice.save();

            return basketDevice;
        }

        const newBasketDevice = await BasketDevice.create({
            basketId: basket.id,
            deviceId,
            quantity: 1
        });

        return newBasketDevice;
    }

    async get(req) {

        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: BasketDevice,
                    include: [
                        {
                            model: Device
                        }
                    ]
                }
            ]
        });

        if (!basket) {
            throw ApiError.badRequest('Basket not found');
        }

        let totalPrice = 0;

        basket.basket_devices.forEach(item => {
            totalPrice += item.quantity * item.device.price;
        });

        const result = basket.toJSON();

        result.totalPrice = totalPrice;

        return result;
    }

    async remove(req) {

        const { deviceId } = req.body;
        const userId = req.user.id;

        const basket = await Basket.findOne({
            where: {
                userId
            }
        });

        if (!basket) {
            throw ApiError.badRequest('Basket not found');
        }
        
        const basketDevice = await BasketDevice.findOne({
            where: {
                basketId: basket.id,
                deviceId
            }
        });

        if (!basketDevice) {
            throw ApiError.badRequest('Device not found in basket');
        }

        if (basketDevice.quantity > 1) {
            basketDevice.quantity -= 1;
            await basketDevice.save();

        } else {
            await basketDevice.destroy();
        }


        const updatedBasket = await Basket.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: BasketDevice,
                    include: [
                        {
                            model: Device
                        }
                    ]
                }
            ]
        });

        let totalPrice = 0;

        updatedBasket.basket_devices.forEach(item => {
            totalPrice += item.quantity * item.device.price;
        });

        const result = updatedBasket.toJSON();

        result.totalPrice = totalPrice;

        return result;

    }
}
module.exports = new BasketService();

