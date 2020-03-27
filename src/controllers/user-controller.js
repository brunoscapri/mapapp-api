'use strict';

const repository = require('../repositories/user-repository');
const md5 = require('md5');

exports.post = async (req, res) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password) + global.SALT_KEY,
            picture: req.body.picture,
            roles: 'user',
        })
        res.status(200).send({
            message: "User created."
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