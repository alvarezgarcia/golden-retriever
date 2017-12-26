class Cache {

	constructor() {
		this.lastTimestamp = 0
		this.cache = undefined
	}

	getLastTimestamp() {
		return this.lastTimestamp
	}

	set(value) {
		const timestamp = Math.round(new Date() / 1000)
		this.lastTimestamp = timestamp

		return this._set(value)
	}

	get() {
		return this._get()
	}

}

class SimpleCache extends Cache {

	_set(value) {
		this.cache = value
		return this.cache
	}

	_get() {
		return this.cache
	}


}

export { SimpleCache }
