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
			if(error || response.statusCode !== 200) {
	
				//Simulates an object returned by extractBody
				const errorObject = {ok: false, payload: { 
							msgDev: `[${new Date()}] Could not connect to ${COINDESK_ENDPOINT}`,
							msg: 'It was impossible to fetch bitcoin price'
						}
				}

				console.error(errorObject.payload.msgDev)
				return res.json(slackifyMsg(errorObject.ok, errorObject.payload))
			}

			const extracted = extractBody(JSON.parse(body))
			const msg = slackifyMsg(extracted.ok, extracted.payload)

			if(!extracted.ok) console.error(extracted.payload.msgDev)

			res.json(cache.set(msg))
		})

	})


	return api

}
