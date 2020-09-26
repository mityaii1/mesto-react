import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    <button className="popup__close-icon transparent" onClick={props.onClose} type="button" aria-label="Закрыть">
                    </button>
                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}

                    <button type="submit" className="popup__button-save">{props.buttonText}</button>
                </form>
            </div>
        </section>
    )
}
export default PopupWithForm;
