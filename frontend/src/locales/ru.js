const translation = {
  translation: {
    header: {
      hexlet: 'Hexlet Chat',
      exit: 'Выйти',
    },
    login: {
      enter: 'Вход',
      username: 'Ваш ник',
      password: 'Пароль',
      login: 'Войти',
      notHaveAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    chat: {
      channels: 'Каналы',
      plus: '+',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
      newMessage: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      addChannel: 'Добавить канал',
      nameChannel: 'Имя канала',
      cancel: 'Отменить',
    },
    errors: {
      wrongLogin: 'Неверные имя пользователя или пароль',
      required: 'Обязательное поле',
      minMax: 'От 3 до 20 символов',
      uniqueName: 'Должно быть уникальным',
    },
    toasts: {
      channelCreated: 'Канал создан',
      channelDeleted: 'Канал удалён',
    },
  },
};

export default translation;
