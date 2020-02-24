'use strict';

const redis = require('redis');
const { redisUrl, redisTopic } = require('../../../config');

const publisher = redis.createClient(redisUrl);

const redisPubsub = () => {

  const publish = payload => publisher.publish(redisTopic, payload);

  return ({
    publish
  });
};

module.exports = redisPubsub();
