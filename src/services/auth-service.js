'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    var token = await jwt.sign(data, global.SALT_KEY, {
        expiresIn: '1d'
    });
    return token;

}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.autorize = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: "Restricted Access."
        });
        return;
    }

    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
        if (error) {
            res.status(401).json({
                message: "Restricted Access. Your token may be expired."
            });
        } else {
            next();
        }
    });
}

exports.isAdmin = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers[x - access - token];
    if (!token) {
        res.status(401).json({
            message: "Restricted Access."
        });
    }
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
        if (error) {
            res.status(401).json({
                message: "Restricted Access."
            })
            return;
        }
        if (decoded.roles.includes('admin')) {
            next();
        } else {
            res.status(401).json({
                message: "Admins Only."
            });
        }

    });
}