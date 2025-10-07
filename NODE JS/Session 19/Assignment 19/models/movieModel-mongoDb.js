const { MongoClient, ObjectId, mongoConnection } = require('./mongodbConnection');

async function index(page = 1, limit = 20, title = "", cast = "", genre = "") {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const skip = (page - 1) * limit;

    let filter = {};
    if (title && cast) {
        filter = {
            $and: [
                { title: { $regex: title, $options: "i" } },
                { cast: { $elemMatch: { $regex: cast, $options: "i" } } }
            ]
        };
    } else if (title) {
        filter = { title: { $regex: title, $options: "i" } };
    } else if (cast) {
        filter = { cast: { $elemMatch: { $regex: cast, $options: "i" } } };
    }

    // Add genre filter if provided
    if (genre) {
        filter.genres = { $elemMatch: { $regex: genre, $options: "i" } };
    }

    const movies = await db.collection("movies")
        .find(filter)
        .sort({ year: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
    const total = await db.collection("movies").countDocuments(filter);
    client.close();
    return { movies: renamemoviesID(movies), total };
}

async function show(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("movies").find({ _id: new ObjectId(String(id))}).toArray();
    client.close();
    return renamemoviesID(movies);
}

async function store(createFormData) {
    let doc = {};
    doc.title = createFormData.title;
    doc.year = createFormData.year;
    doc.thumbnail = createFormData.thumbnail;

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("movies").insertOne(doc, function(err, res){
        if(err) throw err;
        client.close();
        return {"operation": "success"};
    });
}

async function updateForm(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("movies").find({ _id: new ObjectId(String(id))}).toArray();
    client.close();
    return renamemoviesID(movies);
}

async function update(updateFormData) {
    const id = updateFormData.id;
    const title = updateFormData.title;
    const year = updateFormData.year;
    const thumbnail = updateFormData.thumbnail;

    if(thumbnail != "") {
        var updateSQL = { "title": title, "year": year, "thumbnail": thumbnail };
    }
    else {
        var updateSQL = { "title": title, "year": year };
    }

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("movies").updateOne(
        { _id: new ObjectId(String(id)) },
        { $set : updateSQL },
        function(err, res){
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

async function destroy(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    await db.collection("movies").deleteOne(
        { _id: new ObjectId(String(id)) },
        function(err, res){
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

function renamemoviesID(movies) {
    return movies.map(movie => renameID(movie));
}

function renameID(movie) {
    movie.id = movie._id;
    delete movie._id;
    return movie;
}

module.exports = {
    index,
    show,
    store,
    updateForm,
    update,
    destroy
}