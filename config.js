const CLIENT_PORT = 8888;
const SERVER_PORT = 3333;

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  CLIENT_PORT,
  SERVER_PORT,
  isDev
}
