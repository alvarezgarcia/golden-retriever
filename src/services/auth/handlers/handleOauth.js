'use strict';

const { authorize } = require('../../../lib/slack');

const { SlackAuthorizationError } = require('../../../lib/errors');

const handleOauth = async (req, res, next) => {
  try {
    const { code } = req.auth;
    const response = await authorize(code);

    if (!response.ok) {
      throw new SlackAuthorizationError();
    }

    return res.json({ message: 'Golden Retriever succesfully installed' });
  } catch (error) {
    return next(error);
  }
};

module.exports = handleOauth;
