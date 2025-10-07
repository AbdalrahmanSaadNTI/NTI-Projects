const path = require('path');

const renderSignin = (req, res) => {
    res.render('pages/auth/signin', { pageTitle: 'Sign in', user: null });
}

const renderSignup = (req, res) => {
    res.render('pages/auth/signup', { pageTitle: 'Sign up', user: null });
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
        console.log('Login response:', data); // Debug log
        
        if (response.ok && data.token) {
            res.cookie('token', data.token, { 
                httpOnly: false, 
                secure: false, // Set to true in production with HTTPS
                maxAge: 300 * 24 * 60 * 60 * 1000 // 300 days
            });
            res.redirect('/');
        } else {
            res.render('pages/auth/signin', { 
                pageTitle: 'Sign in', 
                user: null,
                error: data.login || data.message || 'Signin failed' 
            });
        }
    } catch (e) {
        console.error('Login error:', e); // Debug log
        res.render('pages/auth/signin', { 
            pageTitle: 'Sign in', 
            user: null,
            error: 'Signin failed: ' + e.message 
        });
    }
}

const postSignup = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const response = await fetch(`${baseUrl}/api/v1.0/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: req.body.fullName, userName: req.body.userName, password: req.body.password, role: req.body.role || 'item_manager' })
        });
        
        const data = await response.json();
        console.log('Signup response:', data); // Debug log
        
        if (response.ok) {
            res.redirect('/auth/signin');
        } else {
            res.render('pages/auth/signup', { 
                pageTitle: 'Sign up', 
                user: null,
                error: data.errors || data.message || 'Signup failed' 
            });
        }
    } catch (e) {
        console.error('Signup error:', e); // Debug log
        res.render('pages/auth/signup', { 
            pageTitle: 'Sign up', 
            user: null,
            error: 'Signup failed: ' + e.message 
        });
    }
}

module.exports = { renderSignin, renderSignup, postSignin, postSignup };


