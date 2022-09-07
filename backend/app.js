const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { auth } = require('./middlewares/auth');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const cardRouter = require('./routes/card');
const userRouter = require('./routes/user');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

require('dotenv').config();

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'https://dlvov.nomoredomains.sbs',
    'https://dmitriylvov.github.io/react-mesto-auth/',
    'http://dlvov.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
// Включаем логгирование запросов
app.use(requestLogger);
// Для тестирования устойчивости (удалить)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// Незащищенные роуты
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /https?:\/\/[www]?\.?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]+/i,
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.use(auth);
// Защищенные роуты
app.use(cardRouter);
app.use(userRouter);
// Логгирование ошибок
app.use(errorLogger);
// Ощибки авторизации
app.use(errors());

// Страница 404
app.use((req, res, next) => {
  next(new NotFoundError('404 Page not found'));
});

// Центральная обработка ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(err.statusCode)
    .send({ message: statusCode === 500 ? 'Error on server' : message });
  return next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  process.stdout.write(`App listening on port ${PORT}\n`);
});
