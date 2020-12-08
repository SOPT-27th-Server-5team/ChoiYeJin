const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
  emailCheck: async (email) => {
    try {
      const alreadyEmail = await User.findOne({
        where: {
          email,
        }
      });
      return alreadyEmail;
    } catch (err) {
      throw err;
    }
  },
  signup: async (email, password, userName) => {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        email,
        password: hashedPassword,
        userName,
        salt,
      });
      return user;
    } catch (err) {
      throw err;
    }
  },
  signin: async (email, password, salt) => {
    try {
      const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.findOne({
        where : {
          email,
          password: inputPassword
        }
      });
      return user;
    } catch (err) {
      throw err;
    }
  },

  getUserID: async (id) => {
    try {
      const user = await User.findOne({
        where : {
           id : id
        },
        attributes: {
          exclude : ['password', 'salt']
        },
      });
      return user;
    } catch(err) {
      throw err;
    }
  },
  //로그인 할 때마다 refreshToken update
  updateRefreshToken: async (id, refreshToken) => {
    try {
      const user = await User.update(
        { refreshToken},
        { where: { id }}
      );
    } catch (err){
      throw err;
    }
  }
}