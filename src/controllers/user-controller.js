'use strict';

const repository = require('../repositories/user-repository');
const md5 = require('md5');
const auth = require('../services/auth-service');

exports.post = async (req, res) => {
    try {
        var user = await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password) + global.SALT_KEY,
            picture: req.body.picture,
            roles: ['user'],
        })

        var token = await auth.generateToken({
            id: user._id,
            name: user.name,
            email: user.email
        });


        res.status(200).send({
            message: "User created.",
            token: token,
            data: {
                email: user.email,
                name: user.name,
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Error processing request."
        });
    }
}

exports.get = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Error processing request."
        });
    }
}


exports.authenticate = async (req, res) => {
    var user = await repository.authenticate({
        email: req.body.email,
        password: md5(req.body.password) + global.SALT_KEY
    });

    if (!user) {
        res.status(401).send({
            message: "senha ou email invalidos."
        });
        return;
    }

    var token = await auth.generateToken({
        id: user._id,
        email: user.email,
        name: user.name,
        roles: user.roles
    });

    res.status(200).send({
        token: token,
        data: {
            name: user.name,
            email: user.email,
        }
    })
}


exports.refreshToken = async (req, res) => {

    var token = req.body.token || req.query.token || req.headers['x-access-token']; //exists and it is already validated by the route

    var data = await auth.decodeToken(token);

    var newToken = await auth.generateToken({
        name: data.name,
        id: data.id,
        email: data.email,
        roles: data.roles
    });

    res.status(200).send({
        newToken: newToken,
        data: {
            name: data.name,
            id: data.id,
            email: data.email,
        }
    });


}