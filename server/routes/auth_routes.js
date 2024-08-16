const express = require("express");
const router = express.Router();
const auth_controller = require("../controller/auth_controller");
const validate=require("../middleware/validate_middleware");
const signupSchema = require("../validators/auth_validator");

router.route("/").get(auth_controller.home);
router.route("/register").post(validate(signupSchema), auth_controller.register);
router.route("/login").post(auth_controller.login);



module.exports = router;

// router.get("/",(req,res)=>{
//     res.status(200).send("request send 200 and you are now in auth_router")
// })
