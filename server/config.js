// Временная конфигурация для тестирования
export const config = {
  port: 3001,
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'your_email@gmail.com',
    pass: 'your_app_password'
  },
  mail: {
    from: 'Ruby Home <your_email@gmail.com>',
    to: 'your_email@gmail.com'
  },
  telegram: {
    botToken: '',
    chatId: ''
  }
};
