import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }
    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input name="full_name" type="text" id="name-input" className="popup__input popup__input_name"
                    placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
                <span className="popup__input-error" id="name-input-error"></span>
            </div>
            <div className="popup__field">
                <input name="about_me" type="text" id="about-me-input"
                    className="popup__input popup__input_about-me"
                    placeholder="О себе" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
                <span className="popup__input-error" id="about-me-input-error"></span>
            </div>
        </PopupWithForm>
    )
}
export default EditProfilePopup;