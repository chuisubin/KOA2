const Koa = require("koa");
const router = require("./router/router");
const bodyParser = require("koa-body");
const koajwt = require("koa-jwt");

// const koaJwt = require("koa-jwt");
var app = new Koa();
app.use(bodyParser());
// app.use(koaJwt());

app.use(
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
);
app.use(router.routes());
console.log("项目启动http://127.0.0.1:3000");
app.listen(3000);
