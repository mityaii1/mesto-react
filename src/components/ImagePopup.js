import React from 'react';

function ImagePopup(props) {
    if (!props.card) { return false }
    else {
        return (
            <section className="popup popup_images popup_opened">
                <figure className="popup__container-image">
                    <button className="popup__close-icon popup__close-image transparent" onClick={props.onClose} type="button" aria-label="Закрыть">
                    </button>
                    <img src={props.card.link} className="popup__preview" alt={props.card.name} />
                    <figcaption className="popup__title-image">{props.card.name}</figcaption>
                </figure>
            </section>
        )
    }
}
export default ImagePopup;