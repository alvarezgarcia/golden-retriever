import request from 'request'
const emojis = require('./currency-emojis.json')

const currencyToEmoji = (currencyName) => emojis.find( e => e.currencyName === currencyName)

function extractRates(obj) {
	if(!obj.bpi) return undefined

	const currencies = Object.keys(obj.bpi)

	const rates = currencies.map( c => { 
		const { rate } = obj.bpi[c]
		return Object.assign({}, {currencyName: c}, {rate})
	})

	return rates
}

function extractTime(obj) {
	if(!obj.time) return undefined

	return obj.time.updated
}

function slackifyMsgErr(data) {

	const slackMsg = {
		text: `:x:*${data}*:x:`,
    mrkdwn: true
	}

	return slackMsg
}

function slackifyMsgOk(data) {

	const timeString = `*Last update:* ${data.time}`
	const ratesStrings = data.rates.reduce( (acc, rate) => {
		const emojiInfo = currencyToEmoji(rate.currencyName)
		const str = `${emojiInfo.emojiFlag} - ${rate.currencyName}\n*Rate:* ${emojiInfo.emojiSymbol} ${rate.rate}\n\n`

		return acc.concat(str)
	}, []).join('')

	const slackMsg = {
		text: `${timeString}\n${ratesStrings}`,
    mrkdwn: true
	}

	return slackMsg
}

export function extractBody(response) {

	const time = extractTime(response)
	const rates = extractRates(response)

	if(!time || !rates) 
		return {ok: false, payload: { 
				msgDev: `[${new Date()}] Could not build response properly, maybe coindesk api changed`,
				msg: 'It was impossible to fetch bitcoin price'
			}
		}

	const ret = Object.assign({}, {ok: true}, { payload: {data: {time, rates} } })

	return ret
}

export function slackifyMsg(okOperation, payload) {
	const msg = okOperation? slackifyMsgOk(payload.data): slackifyMsgErr(payload.msg)
	return msg
}

export function makeHttpRequest(url, cb) {

	request(url, (error, response, body) => {
		if(error || response.statusCode !== 200) {
			const errorObject = { ok: false, payload: {
								msgDev: `[${new Date()}] Could not connect to ${url}`,
								msg: 'It was impossible to fetch bitcoin price'
							}
			}

			return cb(errorObject)
		}

		cb(undefined, body)

	})
}

export function makeValidationRequest(url, qs, cb) {

	request({url, qs}, (error, response, body) => {
		if (error || response.statusCode !== 200) return cb({ok: false, msg: error})

		cb(undefined, {ok: true, msg: 'golden-retriever was successfully added to your workspace!'})
	})


}
