
const redis = require('redis');
const _ = require('lodash');

const { fetchPrice } = require('../../lib/bitcoin');
const { prepareMessage, sendMessage } = require('../../lib/slack');

const { redisUrl, redisTopic } = require('../../config');

const subscriber = redis.createClient(redisUrl);

subscriber.on('message', async (channel, message) => {
  try {
    const slackPayload = JSON.parse(message);
    const responseUrl = _.get(slackPayload, 'response_url');

    if (channel !== redisTopic || !responseUrl) return;
    console.log('Message received');

    const bitcoinPriceResponse = await fetchPrice();
    const slackMessage = prepareMessage(JSON.parse(bitcoinPriceResponse));

    await sendMessage(slackMessage, responseUrl);
  } catch (error) {
    console.log(error);
  }
});

subscriber.subscribe(redisTopic);
