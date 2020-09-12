import React from 'react';
import api from '../utils/api'
import Card from './Card'

function Main(props) {

    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, res]) => {
                setUserName(user.name)
                setUserDescription(user.about)
                setUserAvatar(user.avatar)
                setCards(res)

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <main className="content">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__avatar-edit" >
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__edit-form">
                        <h1 className="profile__title">{userName}</h1>
                        <button onClick={props.onEditProfile} className="profile__button profile__edit-button transparent" type="button"
                            aria-label="Редактировать">
                        </button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__button profile__add-button transparent" type="button" aria-label="Добавить">
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => <Card card={card} key={card._id} onCardClick={props.onCardClick} />)}
            </section>
        </main>
    );
}

export default Main;