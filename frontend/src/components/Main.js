import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  handleCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  console.log(cards);
  return (
    <>
      <main>
        <section>
          <div className='profile'>
            <div className='avatar' onClick={onEditAvatar}>
              <img
                className='avatar__image'
                src={currentUser.avatar}
                alt='Аватар'
              />
              <div className='avatar__layout'></div>
            </div>
            <div className='profile__info'>
              <div className='profile__author-panel'>
                <h1 className='profile__text-field profile__text-field_type_author'>
                  {currentUser.name}
                </h1>
                <button
                  type='button'
                  className='profile__edit-button'
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className='profile__text-field profile__text-field_type_description'>
                {currentUser.about}
              </p>
            </div>
            <button
              type='button'
              className='profile__add-button'
              onClick={onAddPlace}
            ></button>
          </div>
          <ul className='elements'>
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                handleCardClick={handleCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
