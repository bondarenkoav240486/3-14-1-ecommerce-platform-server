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
}
module.exports = new BasketService();

