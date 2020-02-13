const Koa = require("koa");
const router = require("./router/router");
const bodyParser = require("koa-body");
const koajwt = require("koa-jwt");

// const koaJwt = require("koa-jwt");
var app = new Koa();
app.use(bodyParser());
// app.use(koaJwt());

app.use(
  //記得要放係ROUTER前面
  (checkToken = (ctx, next) => {
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          body: null,
          message: "TOKEN無效",
          status: false
        };
      } else {
        throw err;
      }
    });
  })
);
app.use(
  koajwt({ secret: "String" }).unless({
    // 登录接口不需要验证
    path: [/^\/api\/login/, /^\/api\/register/]
  })
); //  解密,,,,要放係後面
app.use(router.routes()); //放最後
console.log("项目启动http://127.0.0.1:3000");
app.listen(3000);
