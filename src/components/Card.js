import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__button-like ${isLiked ? 'element__button-like_active' : ''}`);

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleCardDeleteClick() {
        props.onCardDelete(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <div className="element">
            {isOwn ? (<button className="element__button-remove transparent" onClick={handleCardDeleteClick} type="button" aria-label="Удалить"></button>) : ('')}
            <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleClick} />
            <h3 className="element__title">{props.card.name}</h3>
            <button className={`card__like ${cardLikeButtonClassName} transparent`} onClick={handleLikeClick} type="button" aria-label="Нравиться"></button>
            <span className="element__number-likes">{props.card.likes.length}</span>
        </div>
    )
}
export default Card;