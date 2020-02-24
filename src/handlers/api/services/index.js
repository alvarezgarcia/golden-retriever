
const express = require('express');

const authRouter = require('./auth');
const commandRouter = require('./command');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/command', commandRouter);

module.exports = router;
