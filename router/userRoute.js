const Router = require("koa-router");
const service = require("../lib/mysql");
const controller = require("../controller/userController");
const router = new Router();

router.post("login", "/api/login", controller.checkLogin);
router.post("login", "/api/register", controller.registerUser);
router.get("login", "/api/checkAll", controller.checkAllUser);
module.exports = router;
