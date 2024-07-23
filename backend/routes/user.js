const express = require("express")
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require('../model/db');
const env = require('dotenv');
const { default: errorMap } = require("zod/locales/en.js");
env.config();

const router = express.Router();

const signupValidate = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post('/signup', async (req, res)=> {

    const { success } = signupValidate.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs"
        })
        return;
    };

    const existingUser = await User.findOne({
        username: req.body.username,
    });

    if (existingUser) {
        res.status(411).json({
            message: "Email already taken / Incorrect Inputs"
        })
        return;
    };

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET);

    res.status(200).json({
        message: "User Created Succesfully!",
        token: token
    })

});

const signinValidate = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const {success} = signinValidate.safeParse(req.body);

    if(!success) {
        res.status(411).json({
            message: "Incorrect Input"
        })
        return;
    };

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (!user) {
        res.status(411).json({
            message: "error while logging in!"
        })
        return;
    }

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET);

    res.status(200).json({
        message: token
    });
})

module.exports = router;