import { Router } from 'express'

import { makeHttpRequest, extractBody, slackifyMsg } from '../../helpers'

const now = () => Math.round(new Date() / 1000)

const COINDESK_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const EXPIRY_TIME = 10

export default (cache) => {

	const api = Router()

	api.post('/btc', (req, res) => {

		const lastCacheTimestamp = cache.getLastTimestamp()
		const currentTimestamp = now()

		if(lastCacheTimestamp && (currentTimestamp - lastCacheTimestamp) <= EXPIRY_TIME) {
			return res.json(cache.get())
		}

		makeHttpRequest(COINDESK_ENDPOINT, (err, body) => {
			if(err) {
				console.error(err.payload.msgDev)
				return res.json(slackifyMsg(err.ok, err.payload))
			}

			const extracted = extractBody(JSON.parse(body))
			const msg = slackifyMsg(extracted.ok, extracted.payload)

			const jsonResponse = extracted.ok?
														( cache.set(msg) ): //Set msg on cache and returns it
														( console.error(extracted.payload.msgDev), msg ) //Alert developer and set msg

			res.json(jsonResponse)

		})

	})


	return api

}
