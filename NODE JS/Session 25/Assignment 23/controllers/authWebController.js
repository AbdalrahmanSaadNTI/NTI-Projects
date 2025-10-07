const path = require('path');

const renderSignin = (req, res) => {
    res.render('pages/auth/signin', { pageTitle: 'Sign in' });
}

const renderSignup = (req, res) => {
    res.render('pages/auth/signup', { pageTitle: 'Sign up' });
}

const postSignin = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const response = await fetch(`${baseUrl}/api/v1.0/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: req.body.userName, password: req.body.password })
        });
        const data = await response.json();
        if (response.ok && data.token) {
            res.cookie('token', data.token, { httpOnly: false });
            res.redirect('/products');
        }
        else {
            res.render('pages/auth/signin', { pageTitle: 'Sign in', error: data.login || 'Signin failed' });
        }
    } catch (e) {
        res.render('pages/auth/signin', { pageTitle: 'Sign in', error: 'Signin failed' });
    }
}

const postSignup = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const response = await fetch(`${baseUrl}/api/v1.0/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: req.body.fullName, userName: req.body.userName, password: req.body.password, role: req.body.role || 'user' })
        });
        const data = await response.json();
        if (response.ok) {
            res.redirect('/auth/signin');
        } else {
            res.render('pages/auth/signup', { pageTitle: 'Sign up', error: data.errors || 'Signup failed' });
        }
    } catch (e) {
        res.render('pages/auth/signup', { pageTitle: 'Sign up', error: 'Signup failed' });
    }
}

module.exports = { renderSignin, renderSignup, postSignin, postSignup };


