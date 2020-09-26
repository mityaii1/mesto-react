import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import api from '../utils/Api'
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../App.css';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
    const [cards, setCards] = React.useState([])

    const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); }
    const handleEditProfileClick = () => { setIsEditProfilePopupOpen(!isEditProfilePopupOpen); }
    const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(!isAddPlacePopupOpen); }
    const handleCardClick = (card) => { setSelectedCard(card); }
    const handleCardDeleteClick = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => { console.log(err); });
    }
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked)
            api.addLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards);
                });
        if (isLiked)
            api.deleteLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                    setCards(newCards);
                });
    }
    const handleUpdateUser = (user) => {
        api.setUserInfo(user.name, user.about)
            .then((user) => {
                setCurrentUser({
                    ...currentUser,
                    name: user.name,
                    about: user.about,
                })
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleUpdateAvatar = (user) => {
        api.updateAvatar(user.avatar)
            .then((user) => {
                setCurrentUser({
                    ...currentUser,
                    avatar: user.avatar,
                })
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleAddPlaceSubmit = (item) => {
        api.addNewCard(item.name, item.link)
            .then((newCard) => {
                setCards(
                    [newCard, ...cards]
                );
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(false)
        setIsCardDeletePopupOpen(false)
    }
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, res]) => {
                setCurrentUser(user);
                setCards(res)

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDeleteClick}
                    onCardLike={handleCardLike}
                />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <PopupWithForm name="remove-card" title="Вы уверены?" buttonText="Да" isOpen={isCardDeletePopupOpen} onClose={closeAllPopups}
                />
                <ImagePopup name="images" card={selectedCard} onClose={closeAllPopups} />
                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );

}

export default App;
