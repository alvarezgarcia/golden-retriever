
const request = require('superagent');
const {
  slackOauthUrl,
  slackClientId,
  slackClientSecret,
} = require('../../config');


const authorize = async (code) => {
  const response = await request
    .get(slackOauthUrl)
    .query(
      {
        code,
        client_id: slackClientId,
        client_secret: slackClientSecret,
      },
    );

  return response.body;
};

module.exports = authorize;
