'use strict';
const Service = require('egg').Service;
const crypto = require('crypto');
const { resolve } = require('path');

class LoginService extends Service {
  getMd5Data(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }

  verifyToken(token) {
    this.app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {
      const result = {};
      if (err) {
        result.verify = false;
        result.message = err.message;
      } else {
        result.verify = true;
        result.message = decoded;
      }
      resolve(result);
    });
  }

  async login(username, password) {
    // const psd = this.getMd5Data(password);
    const ctx = this.ctx;
    const data = await ctx.model.User.findOne({
      where: {
        name: username,
        password,
      },
    });

    const result = JSON.parse(JSON.stringify(data)); // 去除node中mysql查询数据产生的RowDataPacket
    return { result };
  }
}

module.exports = LoginService;
