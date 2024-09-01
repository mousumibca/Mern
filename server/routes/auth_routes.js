const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller");
const validate=require("../middleware/validate_middleware");
const signupSchema = require("../validators/auth_validator");
const authMiddleware=require("../middleware/authMiddleware");

router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(authMiddleware, authController.user);



module.exports = router;

// router.get("/",(req,res)=>{
//     res.status(200).send("request send 200 and you are now in auth_router")
// })
