const user = require("../service/user");

async function checkLogin(ctx, next) {
  let { phone, password } = ctx.request.body;
  let data = await user.checkUser(phone, password);
  return (ctx.response.body = data);
}
async function registerUser(ctx, next) {
  let { phone, password } = ctx.request.body;
  let data = await user.findUser(phone, password);
  return (ctx.response.body = data);
}
async function checkAllUser(ctx, next) {
  let data = await user.checkAll();
  let token = ctx.header.authorization;
  console.log("TOKEN IS : ", token);

  return (ctx.response.body = data);
}
module.exports = { checkLogin, registerUser, checkAllUser };
