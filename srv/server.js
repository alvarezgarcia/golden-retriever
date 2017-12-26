import dotenv from 'dotenv'

if(dotenv.config().error || 
	!process.env.SLACK_CLIENT_ID || 
	!process.env.SLACK_CLIENT_SECRET) 
	throw new Error('Please check your .env file exists and has SLACK_CLIENT_ID and SLACK_CLIENT_SECRET defined')


import express from 'express'

import { SimpleCache } from './cache/'
import api from './api'


const port = 9000
const app = express()
const cache = new SimpleCache()

app.use('/api', api(cache))


app.listen(port, () => {
		console.log(`golden-retriever-server listening on ${port}`)
})
