import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__like-button ${isLiked ? 'element__like-button_active' : ''}`
	);

	function handleClick() {
		props.onCardClick(props)
	}

	function handleLikeClick() {
		props.onCardLike(props.card)
	}

	function handleDeleteCard() {
		props.onCardDelete(props.card)
	}

	return (
		<div className="element">
			{isOwn && <button type="button" className="element__trash" aria-label="кнопка для удаления карточки" onClick={handleDeleteCard} />}
			<img className="element__image" src={props.link} alt={props.name} onClick={handleClick} />
			<div className="element__block">
				<h2 className="element__title">{props.name}</h2>
				<div className="element__like">
					<button type="button" className={cardLikeButtonClassName} aria-label="кнопка отметки нравится" onClick={handleLikeClick}></button>
					<span className="element__like-number">{props.likes.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Card;