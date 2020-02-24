'use strict';

const redisPubsub = require('./redis');

const pubSub = (repo) => {
  const publish = (payload) => repo.publish(payload);

  return ({
    publish,
  });
};

module.exports = pubSub(redisPubsub);
