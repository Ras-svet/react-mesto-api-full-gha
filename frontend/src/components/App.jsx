import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import {Routes, Route, useNavigate} from 'react-router-dom';
import auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import goodAnswer from '../images/AllRight.svg';
import badAnswer from '../images/OhBad.svg'

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
	const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [deletedCard, setDeletedCard] = React.useState(null);
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [titleStatusPopup, setTitleStatusPopup] = React.useState('');
	const [imageStatusPopup, setImageStatusPopup] = React.useState(null)
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isLoggedIn) {
			Promise.all([api.getUserInfo(), api.getCards()])
			.then(([userData, cards]) => {
				setCurrentUser(userData)
				setCards(cards)
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
		}
	}, [isLoggedIn])

	React.useEffect(() => {
		checkAuthorization();
	}, [])

	function registerUser(email, password) {
		auth.signUp(email, password)
		.then(() => {
			navigate("/sign-in");
			setIsStatusPopupOpen(true);
			setImageStatusPopup(goodAnswer);
			setTitleStatusPopup("Вы успешно зарегистрировались")
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
			setIsStatusPopupOpen(true);
			setImageStatusPopup(badAnswer);
			setTitleStatusPopup("Что-то пошло не так! Попробуйте еще раз")
		})
	}

	function loginUser(email, password) {
		auth.signIn(email, password)
		.then((res) => {
			localStorage.setItem('jwt', res.token);
			setIsLoggedIn(true);
			setEmail(email);
			navigate("/");
		})
		.catch(err => {
			setIsStatusPopupOpen(true);
			setImageStatusPopup(badAnswer);
			setTitleStatusPopup("Что-то пошло не так! Попробуйте еще раз")
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function checkAuthorization() {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			auth.checkToken(jwt)
			.then((res) => {
				setEmail(res.data.email);
				setIsLoggedIn(true);
				navigate("/");
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
		}
	}

	function logoutUser() {
		localStorage.clear();
		setEmail('');
		setIsLoggedIn(false)
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true)
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true)
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	}

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard)
	}

	function handleCardDeleteConfirm(card) {
		setDeletedCard(card);
		setIsCardDeletePopupOpen(true)
	}

	function closeAllPopups() {
		setSelectedCard(null);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsCardDeletePopupOpen(false);
		setIsStatusPopupOpen(false);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		if (!isLiked) {
			api.addLike(card._id)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
				.catch(err => {
					console.log(`Ошибка при отправке запроса ${err}`)
				})
		} else {
			api.removeLike(card._id)
				.then((newCard) => {
					setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
				})
				.catch(err => {
					console.log(`Ошибка при отправке запроса ${err}`)
				})
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
				closeAllPopups()
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
	}

	function handleUpdateUser(data) {
		api.changeUserInfo(data)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups()
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
	}

	function handleUpdateAvatar(data) {
		api.changeAvatar(data)
			.then((newAvatar) => {
				setCurrentUser(newAvatar);
				closeAllPopups()
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
	}

	function handleAddPlaceSubmit(data) {
		api.addCard(data)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups()
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="body">
				<div className="page">
					<Routes>
						<Route exact path="/sign-in" element={
							<>
							<Header title="Регистрация" link="/sign-up" />
							<Login onSubmit={loginUser} />
							</>
						} />
						<Route exact path="/sign-up" element={
							<>
							<Header title="Войти" link="/sign-in" />
							<Register onSubmit={registerUser} />
							</>
						} />
						<Route exact path="/" element={
							<>
								<Header title="Выйти" link="/sign-in" onClick={logoutUser} email={email} />
								<ProtectedRoute
									component={Main} 
									onEditProfile={handleEditProfileClick}
									onAddPlace={handleAddPlaceClick}
									onEditAvatar={handleEditAvatarClick}
									onCardClick={handleCardClick}
									onCardLike={handleCardLike}
									cards={cards}
									onCardDelete={handleCardDeleteConfirm}
									isLoggedIn={isLoggedIn}
									/>
								<Footer />
								</>
						} 
						/>
					</Routes>
					
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
					/>
					<ImagePopup
						onClose={closeAllPopups}
						card={selectedCard}
					/>
					<ConfirmDeleteCardPopup
						isOpen={isCardDeletePopupOpen}
						onClose={closeAllPopups}
						isActive={true}
						onCardDelete={handleCardDelete}
						card={deletedCard}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>
					<InfoTooltip
						isOpen={isStatusPopupOpen}
						onClose={closeAllPopups}
						title={titleStatusPopup}
						image={imageStatusPopup}
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>

	)
}

export default App;