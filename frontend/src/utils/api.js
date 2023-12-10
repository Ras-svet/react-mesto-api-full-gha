export class Api {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}

	_checkResponse(response) {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(`Ошибка: ${response.status}`)
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers
		}).then(this._checkResponse)
	}

	getCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers
		}).then(this._checkResponse)
	}

	addLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: this._headers
		}).then(this._checkResponse)
	}

	removeLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: this._headers
		}).then(this._checkResponse)
	}

	addCard({name, link}) {
		return fetch(`${this._url}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				link: link
			})
		}).then(this._checkResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers
		}).then(this._checkResponse)
	}

	changeAvatar(body) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify(body)
		}).then(this._checkResponse)
	}

	changeUserInfo(body) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify(body)
		}).then(this._checkResponse)
	}
}

const api = new Api({
	url: 'https://api.rassvet.nomoredomainsmonster.ru',
	headers: {
		'Content-Type': 'application/json'
	}
}
)

export default api;