'use strict';

const _ = require('lodash');

const emojis = require('./emojisPerCurrency');

const extractRate = (rate, fields) => _.pick(rate, fields);

const prepareMessage = (raw) => {
  const { bpi } = raw;
  if (!bpi) {
    throw new Error('Unexpected payload shape');
  }

  const lastUpdate = _.get(raw, 'time.updated');

  const fields = ['code', 'rate', 'description'];
  const rates = Object.values(bpi).map(v => {
    const rate = extractRate(v, fields);
    const emoji = emojis[rate.code];

    return (`${emoji.symbol} (${rate.description})\n*Rate*: ${rate.rate}\n`);
  });

  const text = `*Last update: ${lastUpdate}*\n\n${rates.join('\n')}`;

  const formatted = {
    text,
    mrkdwn: true
  };

  return formatted;
};

module.exports = prepareMessage;
