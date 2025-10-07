const authModel = require("../../models/dashboard/authModel");
const bcrypt = require("bcrypt");


const signup = (req, res) => {
    const msg = req.query.msg;
    res.render("../views/dashboard/signup.ejs", { msg });
}

const storeUser = (req, res) => {

    if (req.body.password == req.body.confirmPassword) {
        authModel.verifySignin(req.body)
            .then(users => {
                if (users.length != 0) {
                    res.redirect("/dashboard/createAccountForm?msg=username already exists !!!");
                }
                else {
                    authModel.storeUser(req.body)
                        .then(result => {
                            if(result.operation == "success") {
                                res.redirect("/dashboard/manageAccounts?msg=New Account Created successfully");                               
                            }
                        })
                        .catch(err => {
                            res.redirect("/dashboard/createAccountForm?msg=Operation failed, try again");
                        });                        
                }
            });
    }
    else {
        res.redirect("/dashboard/createAccountForm?msg=password and confirmed password not matched");
    }
}

const signin = (req, res) => {
    const registerComplete = req.query.registerComplete;
    const failed = req.query.failed;
    const logout = req.query.logout;
    res.render("../views/dashboard/signin.ejs", { registerComplete, failed, logout });
}

const verifySignin = (req, res) => {
    authModel.verifySignin(req.body)
        .then(users => {
            if (users.length == 0) {
                res.redirect("/signin?failed=No user name OR password matched !!!");
            }
            else {
                bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                    if (err) {
                        //
                    }
                    if (result) {
                        // success sign in
                        req.session.userID = users[0]._id;
                        req.session.fullname = users[0].fullname;
                        req.session.userRole = users[0].userRole;
                        //console.log(req.session);
                        res.redirect("/dashboard/index");
                    }
                    else {
                        res.redirect("/signin?failed=No user name OR password matched !!!");
                    }
                });
            }
        });
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            //
        }
        res.redirect("/signin?logout=You are signed out");
    });
}

const changePassword = (req, res) => {
    if(req.body.newPassword == req.body.confirmNewPassword) {
        authModel.changePassword(req.body, req.session.userID)
        .then(result => {
            if(result.operation == "failed") {
                res.redirect("/dashboard/changePassword?msg=" + result.msg);
            }
            else {
                res.redirect("/dashboard/index?msg=Password changed successfully");
            }
        });        
    }
    else {
        res.redirect("/dashboard/changePassword?msg=New password and confirmed new password not matched");
    }
}

/* ----------------------- auth middleware -------------------------- */

const isAuthenticated = (req, res, next) => {
    if (req.session.userRole == "admin" || req.session.userRole == "user") {
        res.locals.fullname = req.session.fullname;
        res.locals.userRole = req.session.userRole;
        next();
    }
    else {
        res.redirect("/signin?failed=You are NOT authorized, Signin first.");
    }
}

function hasRole(allowedRoles) {
    return function (req, res, next) {
        if (req.session && req.session.userRole && allowedRoles.includes(req.session.userRole)) {
            return next();
        } else {
            return res.status(403).render("../views/dashboard/pages/403.ejs");
        }
    };
}

module.exports = {
    signup,
    storeUser,
    signin,
    verifySignin,
    isAuthenticated,
    hasRole,
    logout,
    changePassword,
}