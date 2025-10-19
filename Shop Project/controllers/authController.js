const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');


const signup = (req, res) => {
    console.log('Signup attempt for user:', req.body.userName); // Debug log
    
    authModel.checkUserNameDuplication(req.body.userName)
        .then(oneUser => {
            if (oneUser.length != 0) {
                return res.status(409).json({ errors: 'user name reserved .' });
            }
            else {
                authModel.signup(req.body)
                    .then(result => {
                        console.log('User created successfully'); // Debug log
                        return res.status(200).json({ register: 'done' });
                    })
                    .catch(error => {
                        console.error('Signup error:', error); // Debug log
                        return res.status(500).json({ errors: 'failed to create user' });
                    });
            }
        })
        .catch(error => {
            console.error('Check username error:', error); // Debug log
            return res.status(500).json({ errors: 'server error' });
        });
}


const signin = (req, res) => {
    console.log('Signin attempt for user:', req.body.userName); // Debug log
    
    authModel.signin(req.body)
        .then(users => {
            console.log('Found users:', users.length); // Debug log
            if (users.length == 0) {
                return res.status(401).json({ login: 'failed, no user name valid' });
            }
            else {
                bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                    if (err) {
                        console.error('Bcrypt error:', err); // Debug log
                        return res.status(500).json({ login: 'failed, server error' });
                    }
                    if (result) {
                        // success sign in
                        const payload = {
                            userId: users[0]._id,
                            fullname: users[0].fullName,
                            role: users[0].role
                        };

                        const secretKey = process.env.JWT_SECRET_KEY;
                        if (!secretKey) {
                            console.error('JWT_SECRET_KEY not set'); // Debug log
                            return res.status(500).json({ login: 'failed, server configuration error' });
                        }

                        const token = jwt.sign(payload, secretKey, { expiresIn: '300d' });
                        console.log('Token generated successfully'); // Debug log

                        return res.status(200).json({ login: 'done', token: token, role: users[0].role });
                    }
                    else {
                        console.log('Password mismatch'); // Debug log
                        return res.status(401).json({ login: 'failed, no password valid' });
                    }
                });
            }
        })
        .catch(error => {
            console.error('Signin error:', error); // Debug log
            return res.status(500).json({ login: 'failed, server error' });
        });
}


const verifySignin = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY;
        var decodedToken = jwt.verify(token, secretKey);
    } catch (error) {
        return res.status(401).json({ login: 'failed, no or Wrong token sent' });
    }

    const id = decodedToken.userId;
    const fullname = decodedToken.fullname;
    const role = decodedToken.role;

    req.user = { id, fullname, role };

    authModel.verifySignin(id, role)
        .then(users => {
            if (users.length == 0) {
                return res.status(401).json({ login: 'failed, no user with this ID or Role' });
            }
            else {
                next();
            }
        });
}


module.exports = {
    signup,
    signin,
    verifySignin
}