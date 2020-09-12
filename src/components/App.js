import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../App.css';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);

    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); }
    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(!isEditProfilePopupOpen); }
    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(!isAddPlacePopupOpen); }
    const handleCardClick = (card) => { setSelectedCard(card); }
    const handleCardDeleteClick = () => { setIsCardDeletePopupOpen(!isCardDeletePopupOpen); }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(false)
        setIsCardDeletePopupOpen(false)
    }
    return (
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDeleteClick}
            />
            <PopupWithForm name="update-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
                <>
                    <div className="popup__field">
                        <input name="link_to_avatar" type="url" id="link-input"
                            className="popup__input popup__input_link-to-avatar" placeholder="Ссылка на новый аватар"
                            required />
                        <span className="popup__input-error" id="link-input-error"></span>
                    </div>
                </>
            }
            />
            <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
                <>
                    <div className="popup__field">
                        <input name="full_name" type="text" id="name-input" className="popup__input popup__input_name"
                            placeholder="Имя" required minLength="2" maxLength="40" />
                        <span className="popup__input-error" id="name-input-error"></span>
                    </div>
                    <div className="popup__field">
                        <input name="about_me" type="text" id="about-me-input"
                            className="popup__input popup__input_about-me"
                            placeholder="О себе" required minLength="2" maxLength="200" />
                        <span className="popup__input-error" id="about-me-input-error"></span>
                    </div>
                </>
            }
            />
            <PopupWithForm name="card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
                <>
                    <div className="popup__field">
                        <input name="name_card" type="text" id="card-input"
                            className="popup__input popup__input_name-card" placeholder="Название" required
                            minLength="1" maxLength="30" />
                        <span className="popup__input-error" id="card-input-error"></span>
                    </div>
                    <div className="popup__field">
                        <input name="link_to_image" type="url" id="link-input"
                            className="popup__input popup__input_link-to-image" placeholder="Ссылка на картинку"
                            required />
                        <span className="popup__input-error" id="link-input-error"></span>
                    </div>
                </>
            }
            />
            <PopupWithForm name="remove-card" title="Вы уверены?" buttonText="Да" isOpen={isCardDeletePopupOpen} onClose={closeAllPopups}
            />
            <ImagePopup name="images" card={selectedCard} onClose={closeAllPopups} />
            <Footer />
        </div>
    );

}

export default App;
