const emojis = require('./currency-emojis.json')

const currencyToEmoji = (currencyName) => emojis.find( e => e.currencyName === currencyName)

function extractRates(obj) {
	if(!obj.bpi) return undefined

	const currencies = Object.keys(obj.bpi)

	const rates = currencies.map( c => { 
		const { symbol, rate_float: rate } = obj.bpi[c]
		return Object.assign({}, {currencyName: c}, {symbol, rate})
	})

	return rates
}

function extractTime(obj) {
	if(!obj.time) return undefined

	return obj.time.updated
}

export function extractBody(response) {

	const time = extractTime(response)
	const rates = extractRates(response)

	if(!time || !rates) return {ok: false, msg: 'Could not build response properly, maybe coindesk api changed' }

	const ret = Object.assign({}, {ok: true}, {msg: 'Information was succesfully fetched'}, { payload: {time, rates} })

	return ret
}

export function slackifyMsg(payload) {

	const timeString = `*Last update:* ${payload.time}`
	const ratesStrings = payload.rates.reduce( (acc, rate) => {
		const emojiInfo = currencyToEmoji(rate.currencyName)
		const str = `${emojiInfo.emoji}\n*Currency:* ${rate.currencyName}\n*Rate:* ${rate.rate}\n\n`

		return acc.concat(str)
	}, []).join('')

	const slackMsg = {
		text: `${timeString}\n${ratesStrings}`,
    mrkdwn: true
	}

	return slackMsg
}
