const User = require("../models/User.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userCtrl = {
    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    register: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret');
            res.status(201).send({ user, token });
        } catch (error) {
            res.status(400).send(error);
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: 'Invalid login credentials' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).send({ error: 'Invalid login credentials' });
            }
            const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret');
            res.send({ user, token });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = userCtrl;
