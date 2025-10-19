const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.user = null;
            return next();
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        const decodedToken = jwt.verify(token, secretKey);
        
        req.user = {
            id: decodedToken.userId,
            fullname: decodedToken.fullname,
            role: decodedToken.role
        };
        
        next();
    } catch (error) {
        req.user = null;
        next();
    }
};

const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/signin');
    }
    next();
};

const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/signin');
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).render('pages/error', { 
                error: 'Access denied. Insufficient permissions.',
                pageTitle: 'Access Denied'
            });
        }
        
        next();
    };
};

module.exports = {
    verifyToken,
    requireAuth,
    requireRole
};
