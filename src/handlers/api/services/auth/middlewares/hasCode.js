
const _ = require('lodash');

const { NoSlackCodeError } = require('../../../../../lib/errors');

const hasCode = (req, res, next) => {
  try {
    const code = _.get(req, 'query.code');
    if (!code) {
      throw new NoSlackCodeError();
    }

    _.set(req, 'auth.code', code);
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = hasCode;
