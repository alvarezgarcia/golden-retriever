import dotenv from 'dotenv'

if(dotenv.config().error || 
	!process.env.SLACK_CLIENT_ID || 
	!process.env.SLACK_CLIENT_SECRET) 
	throw new Error('Please check your .env file exists and has SLACK_CLIENT_ID and SLACK_CLIENT_SECRET defined')


import express from 'express'

import { makeValidationRequest } from '../helpers/'
import { SimpleCache } from './cache/'
import api from './api'

const OAUTH_ACCESS_URL = 'https://slack.com/api/oauth.access'

const port = 9000
const app = express()
const cache = new SimpleCache()

app.use('/api', api(cache))

app.get('/oauth', (req, res) => {
	if (!req.query.code) {
			res.status(500)
			return res.json({ok: false, msg: 'Query hasnt the code'})
	}

	const qsParam = {code: req.query.code, client_id: process.env.SLACK_CLIENT_ID, client_secret: process.env.SLACK_CLIENT_SECRET}
	makeValidationRequest(OAUTH_ACCESS_URL, qsParam, (err, response) => {
		if(err) return res.json(err)

		res.json(response)
	})
})

app.listen(port, () => {
		console.log(`golden-retriever-server listening on ${port}`)
})
