import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
	const avatarRef = React.useRef();
	const [linkError, setLinkError] = React.useState('');
	const [isLinkValid, setIsLinkValid] = React.useState(true);
	const activeButton = isLinkValid;

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateAvatar({
			avatar: avatarRef.current.value
		})
	}

	function handleChangeLink(evt) {
		const linkRule = new RegExp('^http(?::\\/\\/|s:\\/\\/).*?\\.(?:gif|jpg|png)$', 'i')
		if (!avatarRef.current.value) {
			setLinkError('Неверный адрес изображения');
			setIsLinkValid(false)
		} else if (!linkRule.test(avatarRef.current.value)) {
			setLinkError('Поле не может быть пустым');
			setIsLinkValid(false)
		} else {
			setLinkError('');
			setIsLinkValid(true)
		}
	}

	React.useEffect(() => {
		avatarRef.current.value = '';
		setLinkError('');
		setIsLinkValid(false);
	}, [props.isOpen])

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			isActive={activeButton}
		>
			<input className="popup__field popup__field_type_src" name="avatar" type="url" ref={avatarRef} onChange={handleChangeLink} placeholder="Ссылка на картинку" required />
			<span className="popup__field-error" id="avatar-error">{linkError}</span>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;