import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
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
			<h2 className="entry__title">Регистрация</h2>
			<form className="entry__form" onSubmit={handleSubmit}>
				<input className="entry__input" placeholder="Email" type="email" onChange={handleChangeEmail} />
				<input className="entry__input" placeholder="Пароль" type="password" onChange={handleChangePassword} />
				<button className="entry__button" type="submit">Зарегистрироваться</button>
			</form>
			<h3 className="entry__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="entry__link">Войти</Link></h3>
		</section>
	)
}

export default Register;