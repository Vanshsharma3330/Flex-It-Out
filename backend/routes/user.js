const express = require("express");
const router = express.Router();
const {register_user , login_user, validate_user, verify_user, google_login} = require("../controllers/user");

router.post("/register",register_user);
router.post("/login",login_user);
router.post("/validateUser" , validate_user);
router.get("/user/verify/:userId/:uniqueString" , verify_user);
router.get("/googlelogin" , google_login);

module.exports = router;