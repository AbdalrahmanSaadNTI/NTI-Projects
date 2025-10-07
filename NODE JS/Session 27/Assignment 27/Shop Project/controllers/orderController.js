const orderModel = require("../models/orderModel");

const index = (req, res) => {
    orderModel.index()
        .then(orders => {
            res.json(orders);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch orders" });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    orderModel.show(id)
        .then(order => {
            if (order.length === 0) {
                return res.status(404).json({ error: "Order not found" });
            }
            res.json(order[0]);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch order" });
        });
}

const store = (req, res) => {
    // Validation
    if (!req.body.customerName || !req.body.customerPhone) {
        return res.status(400).json({ error: "Customer name and phone are required" });
    }

    orderModel.store(req.body)
        .then(() => {
            res.status(201).json({ message: "Order created successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to create order" });
        });
}

const updateStatus = (req, res) => {
    const id = req.params['id'];
    const statusName = req.body.statusName;
    
    // Validation
    if (!statusName) {
        return res.status(400).json({ error: "Status name is required" });
    }

    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(statusName)) {
        return res.status(400).json({ error: "Invalid status. Must be one of: Pending, In Progress, Completed" });
    }

    orderModel.updateStatus(id, statusName)
        .then(() => {
            res.status(200).json({ message: "Order status updated successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to update order status" });
        });
}

const getOrdersByStatus = (req, res) => {
    const status = req.params['status'];
    orderModel.getOrdersByStatus(status)
        .then(orders => {
            res.json(orders);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch orders by status" });
        });
}

const getOrdersByDateRange = (req, res) => {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
        return res.status(400).json({ error: "Start date and end date are required" });
    }

    orderModel.getOrdersByDateRange(startDate, endDate)
        .then(orders => {
            res.json(orders);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch orders by date range" });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    orderModel.destroy(id)
        .then(() => {
            res.status(200).json({ message: "Order deleted successfully" });
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to delete order" });
        });
}

module.exports = {
    index,
    show,
    store,
    updateStatus,
    getOrdersByStatus,
    getOrdersByDateRange,
    destroy
};
