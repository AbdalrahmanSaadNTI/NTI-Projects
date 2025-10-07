const productModel = require("../models/productModel-mongoDb");
const orderModel = require("../models/orderModel");

const getProductsByCategory = (req, res) => {
    const categoryId = req.params['categoryId'];
    
    productModel.getProductsByCategory(categoryId)
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch products by category" });
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

const getOrdersByStatusAndDate = (req, res) => {
    const status = req.params['status'];
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
        return res.status(400).json({ error: "Start date and end date are required" });
    }

    // First get orders by date range, then filter by status
    orderModel.getOrdersByDateRange(startDate, endDate)
        .then(orders => {
            if (status && status !== 'all') {
                const filteredOrders = orders.filter(order => 
                    order.status.some(s => s.statusName === status)
                );
                res.json(filteredOrders);
            } else {
                res.json(orders);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Failed to fetch orders by status and date" });
        });
}

module.exports = {
    getProductsByCategory,
    getOrdersByStatus,
    getOrdersByDateRange,
    getOrdersByStatusAndDate
};
