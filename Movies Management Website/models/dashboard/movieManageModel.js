const { MongoClient, ObjectId, mongoConnection } = require('../mongodbConnection.js');

async function userAddNewMovie(userId, userFullName, movieData) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    const movie = {
        title: movieData.title,
        year: parseInt(movieData.year),
        genres: movieData.genres,
        cast: movieData.actors,
        createdBy: {
            userId: new ObjectId(String(userId)),
            fullname: userFullName
        },
        createdAt: new Date(),
        status: "underReview"
    };

    const result = await db.collection("arMovies").insertOne(movie);
    client.close();

    return result;
}


async function suggestedMovies(req) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("arMovies").find({ "status" : "underReview"}).toArray();
    client.close();
    return movies;
}

async function viewMovieDetails(req) {
    const movieID = req.query.movieID;
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movie = await db.collection("arMovies").find({ _id: new ObjectId(String(movieID)) }).limit(1).toArray();
    client.close();
    return movie;
}

async function reviewMovieDecision(req) {
    const movieID = req.body.movieID;

    if (!movieID || !ObjectId.isValid(movieID)) {
        throw new Error("Invalid or missing movieID");
    }

    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();

    let status = "underReview";
    let updateData = { status: status };
    
    if(req.body.decision === "approve") {
        status = "approved";
        updateData.status = status;
    }
    else {
        status = "rejected";
        updateData.status = status;
        // Add admin note if provided
        if(req.body.adminNote) {
            updateData.adminNote = req.body.adminNote;
        }
    }

    const movie = await db.collection("arMovies").findOneAndUpdate(
        { _id: new ObjectId(String(movieID)) },
        { $set: updateData },
        { returnDocument: 'after' }
    );
    
    client.close();
    return movie;
}

async function getUserRejectedMovies(userId) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movies = await db.collection("arMovies").find({ 
        "createdBy.userId": new ObjectId(String(userId)),
        "status": "rejected"
    }).toArray();
    client.close();
    return movies;
}

async function getMovieById(movieId) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const movie = await db.collection("arMovies").findOne({ _id: new ObjectId(String(movieId)) });
    client.close();
    return movie;
}

async function updateMovie(movieId, movieData) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    
    const updateData = {
        title: movieData.title,
        year: parseInt(movieData.year),
        genres: movieData.genres,
        cast: movieData.actors,
        updatedAt: new Date(),
        status: "underReview" // Reset status to under review when user edits
    };

    const result = await db.collection("arMovies").findOneAndUpdate(
        { _id: new ObjectId(String(movieId)) },
        { $set: updateData },
        { returnDocument: 'after' }
    );
    
    client.close();
    return result;
}

module.exports = {
    userAddNewMovie,
    suggestedMovies,
    viewMovieDetails,
    reviewMovieDecision,
    getUserRejectedMovies,
    getMovieById,
    updateMovie,
}