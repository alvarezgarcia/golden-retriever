'use strict';

const errorHandler = (err, req, res) => {
  console.log(err);

  const error = {
    code: err.code,
    message: err.message,
  };

  return res.status(err.code).json({ error });
};

module.exports = errorHandler;
