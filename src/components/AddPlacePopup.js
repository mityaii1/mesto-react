import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }
    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link,
        })
    }

    return (
        <PopupWithForm name="card" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="popup__field">
                <input name="name_card" type="text" id="card-input"
                    className="popup__input popup__input_name-card" placeholder="Название" required
                    minLength="1" maxLength="30" value={name} onChange={handleChangeName} />
                <span className="popup__input-error" id="card-input-error"></span>
            </div>
            <div className="popup__field">
                <input name="link_to_image" type="url" id="link-input"
                    className="popup__input popup__input_link-to-image" placeholder="Ссылка на картинку"
                    required value={link} onChange={handleChangeLink} />
                <span className="popup__input-error" id="link-input-error"></span>
            </div>
        </PopupWithForm>
    )
}
export default AddPlacePopup;