import React from "react";

function Login(props) {
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('')

	function handleChangePassword(evt) {
		setPassword(evt.target.value)
	}

	function handleChangeEmail(evt) {
		setEmail(evt.target.value)
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onSubmit(email, password)
	}

	return (
		<section className="entry">
			<h2 className="entry__title">Вход</h2>
			<form className="entry__form" onSubmit={handleSubmit}>
				<input className="entry__input" placeholder="Email" type="email" onChange={handleChangeEmail} />
				<input className="entry__input" placeholder="Пароль" type="password" onChange={handleChangePassword} />
				<button className="entry__button" type="submit" >Войти</button>
			</form>
		</section>
	)
}

export default Login;