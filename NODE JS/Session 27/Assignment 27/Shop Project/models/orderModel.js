const { MongoClient, ObjectId, mongoConnection } = require('./mongodbConnection');

async function index() {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const orders = await db.collection("orders").find().sort({ orderDateTime: -1 }).toArray();
    client.close();
    return renameOrdersID(orders);
}

async function show(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const orders = await db.collection("orders").find({ _id: new ObjectId(String(id)) }).toArray();
    client.close();
    return renameOrdersID(orders);
}

async function store(orderData) {
    let doc = {
        customer: {
            customerName: orderData.customerName,
            customerPhone: orderData.customerPhone,
            customerAddress: orderData.customerAddress
        },
        products: orderData.products || [],
        status: [{
            statusName: "Pending",
            statusDateTime: new Date()
        }],
        orderDateTime: new Date(),
        createdAt: new Date(),
        isActive: true
    };

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("orders").insertOne(doc, function(err, res) {
        if(err) throw err;
        client.close();
        return {"operation": "success"};
    });
}

async function updateStatus(orderId, statusName) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    const newStatus = {
        statusName: statusName,
        statusDateTime: new Date()
    };

    await db.collection("orders").updateOne(
        { _id: new ObjectId(String(orderId)) },
        { $push: { status: newStatus } },
        function(err, res) {
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

async function getOrdersByStatus(status) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    
    let query = {};
    if (status && status !== 'all') {
        query = { "status.statusName": status };
    }
    
    const orders = await db.collection("orders").find(query).sort({ orderDateTime: -1 }).toArray();
    client.close();
    return renameOrdersID(orders);
}

async function getOrdersByDateRange(startDate, endDate) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    
    const query = {
        orderDateTime: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    };
    
    const orders = await db.collection("orders").find(query).sort({ orderDateTime: -1 }).toArray();
    client.close();
    return renameOrdersID(orders);
}

async function destroy(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("orders").deleteOne(
        { _id: new ObjectId(String(id)) },
        function(err, res) {
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

function renameOrdersID(orders) {
    return orders.map(order => renameID(order));
}

function renameID(order) {
    order.id = order._id;
    delete order._id;
    return order;
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
