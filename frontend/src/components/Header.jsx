import React from 'react';
import headerLogo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header(props) {
	return (
		<header className="header">
			<img src={headerLogo} className="header__logo" alt="логотип сервиса Место" />
			<div className="header__navbar">
				<p className="header__email">{props.email}</p>
				<Link to={props.link} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
			</div>
		</header>
	)
}

export default Header;