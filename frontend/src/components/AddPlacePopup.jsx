import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
	const namePlaceRef = React.useRef();
	const linkPlaceRef = React.useRef();
	const [linkError, setLinkError] = React.useState('');
	const [nameError, setNameError] = React.useState('');
	const [isNameValid, setIsNameValid] = React.useState(true);
	const [isLinkValid, setIsLinkValid] = React.useState(true);
	const activeButton = isLinkValid && isNameValid

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onAddPlace({
			name: namePlaceRef.current.value,
			link: linkPlaceRef.current.value
		})
	}

	function handleNameChange(evt) {
		if (!evt.target.value) {
			setNameError("Поле не может быть пустым");
			setIsNameValid(false)
		} else if (evt.target.value.length < 2 || evt.target.value.length > 30) {
			setNameError('Название не может быть короче 2 символов или длинее 30 символов')
			setIsNameValid(false)
		} else {
			setNameError('');
			setIsNameValid(true)
			console.log(activeButton)
		}
	}

	function handleLinkChange(evt) {
		const linkRule = new RegExp('^http(?::\\/\\/|s:\\/\\/).*?\\.(?:gif|jpg|png)$', 'i')
		if (!linkPlaceRef.current.value) {
			setLinkError('Поле не может быть пустым');
			setIsLinkValid(false)
		} else if (!linkRule.test(linkPlaceRef.current.value)) {
			setLinkError('Неверный адрес изображения');
			setIsLinkValid(false)
		} else {
			setLinkError('');
			setIsLinkValid(true);
			console.log(activeButton)
		}
	}

	React.useEffect(() => {
		namePlaceRef.current.value = '';
		linkPlaceRef.current.value = '';
		setIsLinkValid(false);
		setIsNameValid(false);
		setLinkError('');
		setNameError('')
	}, [props.isOpen])

	return (
		<PopupWithForm
			title="Новое место"
			name="card"
			buttonText="Создать"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			isActive={activeButton}
		>
			<input className="popup__field popup__field_type_title" name="nameCard" ref={namePlaceRef} onChange={handleNameChange} type="text" minLength="2" maxLength="30" placeholder="Название" required />
			<span className="popup__field-error" id="nameCard-error">{nameError}</span>
			<input className="popup__field popup__field_type_src" name="link" ref={linkPlaceRef} onChange={handleLinkChange} type="url" placeholder="Ссылка на картинку" required />
			<span className="popup__field-error" id="link-error">{linkError}</span>
		</PopupWithForm>
	)
}

export default AddPlacePopup;