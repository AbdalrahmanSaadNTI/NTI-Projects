const orderModel = require("../models/orderModel");

const index = (req, res) => {
    orderModel.index()
        .then(orders => {
            res.status(200).json(orders);
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    orderModel.show(id)
        .then(oneOrder => {
            res.status(200).json(oneOrder);
        });
}

const store = (req, res) => {
    orderModel.store(req.body)
        .then(() => {
            res.status(201).json({ ok: true, message: 'Order created' });
        })
        .catch(() => {
            res.status(500).json({ ok: false, message: 'Failed to create order' });
        });
}

const update = (req, res) => {
    const id = req.params['id'] || req.body.id;
    req.body.id = id;
    orderModel.update(req.body)
        .then(() => {
            res.status(200).json({ ok: true, message: 'Order updated' });
        })
        .catch(() => {
            res.status(500).json({ ok: false, message: 'Failed to update order' });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    orderModel.destroy(id)
        .then(() => {
            res.status(200).json({ ok: true, message: 'Order deleted' });
        })
        .catch(() => {
            res.status(500).json({ ok: false, message: 'Failed to delete order' });
        });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}


