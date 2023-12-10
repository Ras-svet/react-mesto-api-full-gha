export class Auth {
	constructor({url}) {
		this._url = url;
	}

	_checkResponse(response) {
		if (response.ok) {
			console.log(response.json)
			return response.json();
		}
		return Promise.reject(`Ошибка: ${response.status}`)
	}

	signUp(email, password) {
		return fetch(`${this._url}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json", 
			},
			body: JSON.stringify({ email, password }),
		}).then(this._checkResponse)
	}

	signIn(email, password) {
		return fetch(`${this._url}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({email, password})
		}).then(this._checkResponse)
	}

	checkToken(jwt) {
		return fetch(`${this._url}/users/me`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization" : `Bearer ${jwt}`
			}
		}).then(this._checkResponse)
	}
}

const auth = new Auth({
	url: 'https://api.rassvet.nomoredomainsmonster.ru',
})

export default auth;