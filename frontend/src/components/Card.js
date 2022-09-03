import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, handleCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  //Определяем, ялвяется ли карточка нашей
  const isOwn = currentUser._id === card.owner._id;
  const deleteButtonClass = `elements__delete-button ${
    isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'
  }`;
  //Определяем, поставили ли лайк мы этой карточке
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeButtonClass = `elements__like ${
    isLiked ? 'elements__like_actived' : 'elements__like_deactivated'
  }`;
  const onClick = () => {
    //Открытие попапа для увеличения картинки
    handleCardClick(card);
  };

  const handleLikeClick = () => {
    //Отправка лайка
    onCardLike(card);
  };

  const handleDeleteCard = () => {
    onCardDelete(card);
  };
  return (
    <li className='elements__item'>
      <img
        className='elements__image'
        src={card.link}
        alt={card.name}
        onClick={onClick}
      />
      <div className='elements__description'>
        <p className='elements__title'>{card.name}</p>
        <div>
          <button
            type='button'
            className={likeButtonClass}
            onClick={handleLikeClick}></button>
          <p className='elements__like-counter'>{card.likes.length}</p>
        </div>
      </div>
      <button
        type='button'
        className={deleteButtonClass}
        onClick={handleDeleteCard}></button>
    </li>
  );
}

export default Card;
