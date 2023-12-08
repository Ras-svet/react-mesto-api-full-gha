import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
	const [name, setName] = React.useState("");
	const [nameError, setNameError] = React.useState("");
	const [descriptionError, setDescriptionError] = React.useState("");
	const [isNameValid, setIsNameValid] = React.useState(true);
	const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);
	const [description, setDescription] = React.useState("");
	const currentUser = React.useContext(CurrentUserContext);
	const activeButton = isDescriptionValid && isNameValid

	function handleNameChange(evt) {
		setName(evt.target.value);
		if (!evt.target.value) {
			setNameError("Поле не может быть пустым");
			setIsNameValid(false)
		} else if (evt.target.value.length < 2 || evt.target.value.length > 40) {
			setNameError('Имя не может быть короче 2 символов или длинее 40 символов');
			setIsNameValid(false)
		} else {
			setNameError('');
			setIsNameValid(true)
		}
	}

	function handleDescriptionChange(evt) {
		setDescription(evt.target.value);
		if (!evt.target.value) {
			setDescriptionError("Поле не может быть пустым");
			setIsDescriptionValid(false)
		} if (evt.target.value.length < 2 || evt.target.value.length > 40) {
			setDescriptionError('Описание не может быть короче 2 символов или длинее 40 символов')
			setIsDescriptionValid(false)
		} else {
			setDescriptionError('')
			setIsDescriptionValid(true)
		}
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateUser({
			name,
			about: description,
		});
	}

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
		setIsNameValid(true);
		setIsDescriptionValid(true);
		setDescriptionError('');
		setNameError('')
	}, [props.isOpen, currentUser])

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="profile"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			isActive={activeButton}
		>
			<input className="popup__field popup__field_type_name" name="name" type="text" value={name || ""} onChange={handleNameChange} minLength="2" maxLength="40" placeholder="Имя" required />
			<span className="popup__field-error" id="name-error">{nameError}</span>
			<input className="popup__field popup__field_type_job" name="about" type="text" value={description || ""} onChange={handleDescriptionChange} minLength="2" maxLength="200" placeholder="О себе" required />
			<span className="popup__field-error" id="about-error">{descriptionError}</span>
		</PopupWithForm>
	)
}

export default EditProfilePopup;