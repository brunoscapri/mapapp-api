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
            roles: 'user',
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