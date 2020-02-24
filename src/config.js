'use strict';

const {
  PORT,
  SLACK_OAUTH_URL,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  REDIS_URL,
  REDIS_TOPIC,
  BITCOIN_PRICE_API_URL,
} = process.env;

module.exports = {
  port: parseInt(PORT, 10) || 6060,
  slackOauthUrl: SLACK_OAUTH_URL,
  slackClientId: SLACK_CLIENT_ID,
  slackClientSecret: SLACK_CLIENT_SECRET,
  redisUrl: REDIS_URL,
  redisTopic: REDIS_TOPIC,
  bitcoinPriceApiUrl: BITCOIN_PRICE_API_URL,
};
