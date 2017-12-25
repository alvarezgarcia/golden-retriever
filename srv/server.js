import express from 'express'

const port = 9000
const app = express()

app.listen(port, () => {
		console.log(`golden-retriever-server listening on ${port}`)
})
