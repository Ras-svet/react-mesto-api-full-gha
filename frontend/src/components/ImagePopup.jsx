import React from 'react';

function ImagePopup(props) {
	return (
		<section className={`popup popup_type_fullscreen ${props.card ? 'popup_opened' : ''}`}>
			<div className="popup__fullscreen-container">
				<button className="popup__close-button" type="button" aria-label="кнопка закрытия формы полноэкранного режима" onClick={props.onClose}></button>
				<img className="popup__picture" src={props.card?.link} alt={props.card?.name} />
				<h2 className="popup__text">{props.card?.name}</h2>
			</div>
		</section>
	)
}

export default ImagePopup;