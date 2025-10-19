const { MongoClient, ObjectId, mongoConnection } = require('./mongodbConnection');

async function index() {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const categories = await db.collection("categories").find().toArray();
    client.close();
    return renameCategoriesID(categories);
}

async function show(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const categories = await db.collection("categories").find({ _id: new ObjectId(String(id)) }).toArray();
    client.close();
    return renameCategoriesID(categories);
}

async function store(categoryData) {
    let doc = {
        categoryName: categoryData.categoryName,
        createdAt: new Date(),
        isActive: true
    };

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("categories").insertOne(doc, function(err, res) {
        if(err) throw err;
        client.close();
        return {"operation": "success"};
    });
}

async function update(updateData) {
    const id = updateData.id;
    const categoryName = updateData.categoryName;

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("categories").updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: { categoryName: categoryName, updatedAt: new Date() } },
        function(err, res) {
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

async function destroy(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("categories").deleteOne(
        { _id: new ObjectId(String(id)) },
        function(err, res) {
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

function renameCategoriesID(categories) {
    return categories.map(category => renameID(category));
}

function renameID(category) {
    category.id = category._id;
    delete category._id;
    return category;
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
