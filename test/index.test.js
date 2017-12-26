import chai from 'chai'

import { makeHttpRequest, extractBody, slackifyMsg } from '../helpers'       


const expect = chai.expect



chai.use(require('chai-http'))

const OK_COINDESK_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const WRONG_COINDESK_ENDPOINT = 'https://api.coindesk.com/v1/bpi/inexistent.json'


describe('Test API', () => {

	it('Check /btc post returns an object with text and mrkdwn properties', (done) => {

		 chai.request('http://localhost:9000')
			.post('/api/btc')
			.end( (err, res) => {
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('text')
				expect(res.body).to.have.property('mrkdwn')

				done()
			})

	})
})

describe('Test parsing functions for coindesk response', () => {

	it('Check coindesk API (v1) has fields that app uses', (done) => {
		makeHttpRequest(OK_COINDESK_ENDPOINT, (err, body) => {
			const jsonResponse = JSON.parse(body)

			expect(jsonResponse).to.be.an('object')
			expect(jsonResponse).to.have.property('time').to.have.property('updated')
			expect(jsonResponse).to.have.property('bpi').to.be.an('object')

			done()
		})
	})

	it('Check if coindesk API (v1) response changed, alert user and developer', (done) => {
		makeHttpRequest(OK_COINDESK_ENDPOINT, (err, body) => {
			const jsonResponse = JSON.parse(body)
			delete(jsonResponse.bpi) //Delete one of specific fields that app uses

			const extracted = extractBody(jsonResponse)

			expect(extracted).to.be.an('object')
			expect(extracted).to.have.property('ok').to.be.equal(false)
			expect(extracted).to.have.property('payload').to.have.property('msg')
			expect(extracted).to.have.property('payload').to.have.property('msgDev')

			done()
		})
	})

	it('Check wrong url request sends user and developer detailed errors msgs', (done) => {
		makeHttpRequest(WRONG_COINDESK_ENDPOINT, (err, body) => {
			expect(err).to.be.an('object')
			expect(err).to.have.property('ok').to.be.equal(false)
			expect(err).to.have.property('payload').to.have.property('msg')
			expect(err).to.have.property('payload').to.have.property('msgDev')

			done()
		})
	})

	


})
