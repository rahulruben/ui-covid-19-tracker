import React from 'react'
import './Card.scss';
import { convertTorReadableFormat } from "../../base/_utils.js";

function Card({ title, cases, total, ...props }) {
    const onCardClicked = (e) => {
        let cardContainer = e.currentTarget.parentElement,
            cards = cardContainer.querySelectorAll('.card');
        cards.forEach(card => {
            if (card === e.currentTarget) {
                card.classList.add('active');
            } else {
                console.log(card)
                card.classList.remove('active');
            }
        })
        props.onClick();
    }
   
    return (
        <div onClick={onCardClicked} className="card" type={title}>
            <div className="card__header">
                <span className="card__header__icon"></span>
                <h2>{title}</h2>
            </div>
            <div className="card__content">
                <div className="card__content__wrapper">
                    <span className="card__content__wrapper__count">{convertTorReadableFormat(total) || 0}</span>
                    <div className="card__content__wrapper__today">(+{convertTorReadableFormat(cases) || 0})</div>
                </div>
            </div>
        </div>
    )
}

export default Card
