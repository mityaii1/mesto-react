import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleCardDeleteClick() {
        props.onCardDelete(props.card);
    }
    return (
        <div className="element">
            <button className="element__button-remove transparent" onClick={handleCardDeleteClick} type="button" aria-label="Удалить"></button>
            <img src={props.card.link} className="element__image" alt={props.card.name} onClick={handleClick} />
            <h3 className="element__title">{props.card.name}</h3>
            <button className="element__button-like transparent" type="button" aria-label="Нравиться"></button>
            <span className="element__number-likes">{props.card.likes.length}</span>
        </div>
    )
}
export default Card;