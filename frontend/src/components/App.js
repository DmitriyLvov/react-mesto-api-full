import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import UserInfoPopup from './UserInfoPopup';
import Spinner from './Spinner';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import authApi from '../utils/authApi';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [tooltipData, setTooltipData] = useState({
    isOpen: false,
    isSucces: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getCards(), api.getAuthorInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser({ ...userInfo });
      })
      .catch((err) => {
        console.log(`Ошибка запроса стартовой информации: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log(currentUser);
  //Проверка пользователя
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      authApi
        .getUserInfo(token)
        .then((res) => {
          //Изменяем Header на e-mail пользователя
          setEmail(res.data.email);
          //Устанавливаем флаг авторизации
          setIsAuth(true);
          //Перенаправляем на главную
          navigate('/');
        })
        .catch((er) => navigate('/sign-in'));
    } else {
      navigate('/sign-in');
    }
  }, []);

  const resizeHandler = (e) => {
    const width = e.currentTarget.innerWidth;
    if (width > 540) {
      setIsHeaderPopupOpen(false);
    }
  };

  //Проверка видимости для popup header'a
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  //Обработчк открытия Popup для редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  //Обработчк открытия Popup для редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  //Обработчик открытия Popup для добавлеия нового места
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  //Обработчик закрытия всех Popup
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({ name: '', link: '', id: '' });
    setIsLoading(false);
    setTooltipData((prevState) => ({ ...prevState, isOpen: false }));
  };

  //Обрботчк закрытия popup по клавише ESC
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  //Перезаписываем данные пользователя из ответа сервера
  const updateUserData = (res) => {
    setCurrentUser({ ...res });
    closeAllPopups();
  };

  //Обновление данных пользователя
  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((res) => {
        updateUserData(res);
      })
      .catch((er) => console.log(`Ошибка обновления данных пользователя`, er));
  };

  //Обновление аватара
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        updateUserData(res);
      })
      .catch((er) => console.log('Ошика обновления аватара', er));
  };

  const handleCardLike = (card) => {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
          .removeLike(card._id)
          .then((newCard) =>
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            )
          )
          .catch((er) => console.log('Ошибка удаления лайка: ', er))
      : api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((er) => console.log('Ошибка добавления лайка: ', er));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .removeCard(selectedCard._id)
      .then(() => {
        setCards((prevState) =>
          prevState.filter((c) => c._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((er) => console.log('Ошибка удаления карточки: ', er));
  };

  const handleCardDeleteWithConfirm = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  };

  const handleAddPlace = (data) => {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards((prevState) => [res, ...prevState]);
        closeAllPopups();
      })
      .catch((er) => console.log('Ошибка добавления нового места', er));
  };
  //Регистрация нового пользователя
  const handleRegisterUser = (data) => {
    authApi
      .registerNewUser(data)
      .then((res) => {
        setTooltipData({ isOpen: true, isSucces: true });
        navigate('/sign-in');
      })
      .catch((er) => {
        setTooltipData({ isOpen: true, isSucces: false });
        console.log('Ошибка при регистрации нового польщователя', er);
      });
  };
  //Процедура Login на сайте
  const handleLogin = (data) => {
    authApi
      .login(data)
      .then((res) => {
        //Сохраняем токен в локальном хранилище
        localStorage.setItem('jwt', res.token);
        //Изменяем Header на e-mail пользователя
        setEmail(data.email);
        //Устанавливаем флаг авторизации
        setIsAuth(true);
        //Перенаправляем на главную
        navigate('/');
      })
      .catch((er) => {
        setTooltipData({ isOpen: true, isSucces: false });
        console.log('Ошибка при входе', er);
      });
  };
  //Процедура Logout на сайте
  const handleLogout = () => {
    //Удаляем токен регистрации
    localStorage.removeItem('jwt');
    //Устанавливаем флаг авторизации
    setIsAuth(false);
    //Перенаправляем на страницу Login
    navigate('/sign-in');
    //Закрываем popup header
    setIsHeaderPopupOpen(false);
  };
  //Процедура закрытия header
  const handleToggleHeaderPopupVisble = () => {
    setIsHeaderPopupOpen(!isHeaderPopupOpen);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <UserInfoPopup
          handleLogout={handleLogout}
          email={email}
          isVisible={isHeaderPopupOpen}
        />
        <Header
          email={email}
          handleLogout={handleLogout}
          handleToggleHeaderPopupVisble={handleToggleHeaderPopupVisble}
          isHeaderPopupOpen={isHeaderPopupOpen}
          isAuth={isAuth}
        />
        <Routes>
          <Route
            path='/sign-in'
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path='/sign-up'
            element={<Register handleRegisterUser={handleRegisterUser} />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteWithConfirm}
                path='/'
                loggedIn={isAuth}
              />
            }
          />
        </Routes>

        <InfoToolTip
          isOpen={tooltipData.isOpen}
          isSuccess={tooltipData.isSucces}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        />
        <Spinner isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
