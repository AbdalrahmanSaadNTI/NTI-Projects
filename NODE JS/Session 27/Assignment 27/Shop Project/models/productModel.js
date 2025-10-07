const { mongoose, Schema, mongoConnection } = require('./mongooseConnection');

const productSchema = new Schema({
    productName: String,
    weight: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },
    photo: String,
    category: {
        categoryID: { type: Schema.Types.ObjectId, ref: 'category' },
        categoryName: String // Optional, for easier access
    }
});

const Product = mongoose.model("product", productSchema);

mongoose.connect(mongoConnection)
        .then(() => {
            // success connecting
        })
        .catch((err) => {
            // failed connecting
        });

async function index() {
    const products = await Product.find();
    return renameProductsID(products);;
}



async function show(id) {
    let product = await Product.findById(id).lean();
    if (!product) return [];

    // Ensure price is set
    if (typeof product.price === 'undefined') {
        product.price = null;
    }

    // Ensure createdAt is set
    if (!product.createdAt) {
        product.createdAt = null;
    }

    // Populate category name if missing
    if (product.category && product.category.categoryID && !product.category.categoryName) {
        const categoryModel = require('./categoryModel');
        const categories = await categoryModel.show(product.category.categoryID);
        if (categories && categories.length > 0) {
            product.category.categoryName = categories[0].categoryName;
        } else {
            product.category.categoryName = "No category assigned";
        }
    } else if (!product.category) {
        product.category = { categoryName: "No category assigned" };
    }

    return [renameID(product)];
}

async function store(createFormData) {
    // Ensure category is set
    if (!createFormData.category || !createFormData.category.categoryID) {
        createFormData.category = {
            categoryID: null,
            categoryName: "No category assigned"
        };
    }

    Product.create(createFormData)
        .then(() => {
            return;
        })
        .catch(
            // error
        );
}

async function updateForm(id) {
    let products = await Product.findById(id);
    products = [products];
    return renameProductsID(products);;
}

async function update(updateFormData) {    
    const photo = updateFormData.photo;

    if(photo != "") {
        //
    }
    else {
        let oldDoc = await Product.findById(updateFormData.id);
        updateFormData.photo = oldDoc.photo;
    }

    Product.updateOne(
        { _id: updateFormData.id },
        updateFormData
    )
    .then(() => {
        return;
    })
    .catch((err) => {
        //
    });
}

async function destroy(id) {
    Product.deleteOne({ _id: id })
        .then(() => {
            return;
        })
        .catch(
            // error
        );
}


function renameProductsID(products) {
    return products.map(product => renameID(product));
}

function renameID(product) {
    product.id = product._id;
    delete product._id;
    return product;
}


module.exports = {
    index,
    show,
    store,
    updateForm,
    update,
    destroy
}