
const express = require('express');

const { hasCode } = require('./middlewares');
const { handleOauth } = require('./handlers');

const router = express.Router();

router.get('/', hasCode, handleOauth);

module.exports = router;
