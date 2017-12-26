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
