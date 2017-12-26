import { Router } from 'express'
import request from 'request'

import { extractBody, slackifyMsg } from '../../helpers'

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

		request(COINDESK_ENDPOINT, (error, response, body) => {
			const extracted = extractBody(JSON.parse(body))
			if(!extracted.ok) return res.json(extracted)

			const msg = slackifyMsg(extracted.payload)

			res.json(cache.set(msg))
		})

	})


	return api

}
