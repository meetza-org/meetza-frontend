import * as user from './user';
import * as room from './room';
import * as room from './socket';

module.exports = {
  ...user,
  ...room,
  ...socket
};