import React from 'react';

function PopupWithForm(props) {
	return (
		<section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__container">
				<button className="popup__close-button" type="button" aria-label="кнопка закрытия" onClick={props.onClose}></button>
				<h2 className="popup__title">{props.title}</h2>
				<form className="popup__forms" name={props.name} onSubmit={props.onSubmit}>
					{props.children}
					<button className={`popup__save-button ${!props.isActive ? 'popup__save-button_disabled' : ''}`} type="submit" aria-label="кнопка сохранения изменений">{props.buttonText}</button>
				</form>
			</div>
		</section>
	)
}

export default PopupWithForm;