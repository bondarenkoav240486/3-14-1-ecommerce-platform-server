class OrderController {

    async getAll(req, res) {
        return res.json({
            message: 'Order API works сотеукщддук'
        })
    }

}

module.exports = new OrderController()