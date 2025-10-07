const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require("bcrypt");

const mongoConnection = process.env.MONGODB_CONNECTION;


async function checkUserNameDuplication(userName) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const oneUser = await db.collection("users").find({ userName: userName }).limit(1).toArray();
    client.close();
    return oneUser;
}

async function signup(signupFormData) {
    let doc = {};
    bcrypt.hash(signupFormData.password, 11, async (err, hash) => {
        if (err) {
            //
        }
        else {
            // hash            
            doc.fullName = signupFormData.fullName;
            doc.userName = signupFormData.userName;
            doc.password = hash;
            doc.role = signupFormData.role;
            doc.isActive = true;
            doc.createdAt = new Date();

            const client = await MongoClient.connect(mongoConnection);
            const db = client.db();
            await db.collection("users").insertOne(doc, function (err, res) {
                if (err) throw err;
                client.close();
                return { "operation": "success" };
            });
        }
    });
}

async function signin(signinFormData) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const users = await db.collection("users").find({ userName: signinFormData.userName }).limit(1).toArray();
    client.close();
    return users;
}

async function verifySignin(id, role) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const users = await db.collection("users").find({ _id: new ObjectId(String(id)) , role: role }).limit(1).toArray();
    client.close();
    return users;
}

async function getAllUsers() {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const users = await db.collection("users").find().toArray();
    client.close();
    return renameUsersID(users);
}

async function getUserById(id) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    const users = await db.collection("users").find({ _id: new ObjectId(String(id)) }).toArray();
    client.close();
    return renameUsersID(users);
}

async function updateUserStatus(id, isActive) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    
    await db.collection("users").updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: { isActive: isActive, updatedAt: new Date() } },
        function(err, res) {
            if(err) throw err;
            client.close();
            return {"operation": "success"};
        }
    );
}

async function changePassword(id, newPassword) {
    const client = await MongoClient.connect(mongoConnection);
    const db = client.db();
    
    bcrypt.hash(newPassword, 11, async (err, hash) => {
        if (err) {
            throw err;
        } else {
            await db.collection("users").updateOne(
                { _id: new ObjectId(String(id)) },
                { $set: { password: hash, updatedAt: new Date() } },
                function(err, res) {
                    if(err) throw err;
                    client.close();
                    return {"operation": "success"};
                }
            );
        }
    });
}

function renameUsersID(users) {
    return users.map(user => renameID(user));
}

function renameID(user) {
    user.id = user._id;
    delete user._id;
    delete user.password; // Don't return password in user data
    return user;
}

module.exports = {
    checkUserNameDuplication,
    signup,
    signin,
    verifySignin,
    getAllUsers,
    getUserById,
    updateUserStatus,
    changePassword
}