const { mongoose, Schema, mongoConnection } = require('./mongooseConnection');

const orderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    name: String,
    quantity: Number,
    unitPrice: Number
}, { _id: false });

const addressSchema = new Schema({
    fullName: String,
    street: String,
    city: String,
    country: String,
    zip: String
}, { _id: false });

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    paymentMethod: String,
    notes: String,
    total: Number,
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    lastStatusChange: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

mongoose.connect(mongoConnection)
    .then(() => {
        // success connecting
    })
    .catch((err) => {
        // failed connecting
    });

async function index() {
    const orders = await Order.find().lean();
    return renameOrdersID(orders);
}

async function show(id) {
    let orders = await Order.findById(id).lean();
    orders = [orders];
    return renameOrdersID(orders);
}

async function store(createFormData) {
    await Order.create(createFormData);
}

async function update(updateFormData) {
    await Order.updateOne(
        { _id: updateFormData.id },
        updateFormData
    );
}

async function destroy(id) {
    await Order.deleteOne({ _id: id });
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
    update,
    destroy
}


