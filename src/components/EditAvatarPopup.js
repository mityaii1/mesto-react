import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name="update-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input name="link_to_avatar" type="url" id="link-input" ref={avatarRef}
                    className="popup__input popup__input_link-to-avatar" placeholder="Ссылка на новый аватар"
                    required />
                <span className="popup__input-error" id="link-input-error"></span>
            </div>

        </PopupWithForm>
    )
}
export default EditAvatarPopup;