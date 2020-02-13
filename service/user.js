const allSqlAction = require("../lib/mysql");
// const koajwt = require('koa-jwt');
const jwt = require("jsonwebtoken");

async function checkUser(phone, password) {
  let sql = `select * from elm_user where elm_userPhone = ${phone} and elm_userPassword =${password}`;
  return allSqlAction.allSqlAction(sql).then(res => {
    if (
      res.length == 1 &&
      res[0].elm_userPhone === phone &&
      res[0].elm_userPassword === password
    ) {
      console.log(res);
      let userToken = {
        phone: res[0].elm_userPhone,
        password: res[0].elm_userPassword
      };
      return {
        msg: "登陆成功",
        code: 200,
        token: jwt.sign(
          userToken, // 加密userToken, 等同于上面解密的userToken
          "String",
          { expiresIn: "1h" } // 有效时长1小时
        )
      };
    } else {
      return { msg: "登录失败", code: 201 };
    }
  });
}
async function findUser(phone, password) {
  let sql = `select * from elm_user where elm_userPhone = ${phone}`;
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.length == 0) {
      return registerUser(phone, password);
    } else {
      return { msg: "用户已存在", code: 202 };
    }
  });
}
async function registerUser(phone, password) {
  let sql = `insert into elm_user (elm_userPhone,elm_userPassword) values ('${phone}','${password}')`;
  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.affectedRows == 1) {
      return { msg: "注册成功", code: 200 };
    } else {
      return { msg: "注册失败", code: 200 };
    }
  });
}
async function checkAll() {
  let sql = `SELECT * FROM elm_user;`;

  // let payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET);

  return allSqlAction.allSqlAction(sql).then(res => {
    if (res.length > 0) {
      console.log("r>0", res);
      return res;
    } else {
      console.log(" ERROR: ", res);
      return { msg: "error", code: 200 };
    }
  });
}

module.exports = { checkUser, findUser, registerUser, checkAll };
