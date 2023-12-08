import React, { useEffect } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
	const currentUser = React.useContext(CurrentUserContext)

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__content">
					<div className="profile__avatar-edit" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={currentUser.avatar} alt="аватар профиля" />
					</div>
					<div className="profile__info">
						<div className="profile__block">
							<h1 className="profile__name">{currentUser.name}</h1>
							<button type="button" onClick={props.onEditProfile} className="profile__edit-button" aria-label="кнопка редактирования профиля"></button>
						</div>
						<p className="profile__job">{currentUser.about}</p>
					</div>
				</div>
				<button type="button" onClick={props.onAddPlace} className="profile__add-button" aria-label="кнопка добавления контента"></button>
			</section>
			<section className="elements">
				{props.cards.map(card => {
					return (
						<Card
							card={card}
							key={card._id}
							link={card.link}
							name={card.name}
							likes={card.likes}
							onCardClick={props.onCardClick}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete}
						/>
					)
				})}
			</section>
		</main>
	)
}

export default Main;