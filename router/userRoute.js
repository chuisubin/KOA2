const Router = require("koa-router");
const service = require("../lib/mysql");
const controller = require("../controller/userController");
const router = new Router();
router.post("login", "/login", controller.checkLogin);
router.post("login", "/register", controller.registerUser);
router.get("login", "/checkAll", controller.checkAllUser);
module.exports = router;
