import { Router } from 'express'

export default () => {

	const api = Router()

	api.post('/btc', (req, res) => {
		res.json({ok: true})
	})


	return api

}
