const express = require('express');
const { Account } = require('../model/db');
const { authMiddleware } = require('../middleware/authmiddleware');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware , async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount , to} = req.body;

    // fetch acc within the transaction

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance / Invalid Account"
        })
    }

    const toAccount = await Account.findOne({
        userId: to,
    }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(411).json({
            message: "invalid account!"
        });
    }

    // transaction / transfer

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    // commit the transaction
    await session.commitTransaction();
    res.json({
        message: "transaction successful"
    });
});


module.exports = router;