import React from 'react';
//import api from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__avatar-edit" >
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__edit-form">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={props.onEditProfile} className="profile__button profile__edit-button transparent" type="button"
                            aria-label="Редактировать">
                        </button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__button profile__add-button transparent" type="button" aria-label="Добавить">
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card) => <Card
                    card={card}
                    key={card._id}
                    onCardClick={props.onCardClick}
                    onCardDelete={props.onCardDelete}
                    onCardLike={props.onCardLike}
                />)}
            </section>
        </main>
    );
}

export default Main;