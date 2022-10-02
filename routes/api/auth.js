const express = require("express");
const ctrl = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const {  validationBody,  authenticate} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/refresh", controllerWrapper(ctrl.refreshToken));

router.post("/register",
    validationBody(schemas.userAddSchema),
    controllerWrapper(ctrl.register));

router.post("/login",
    validationBody(schemas.userLoginSchema),
    controllerWrapper(ctrl.login));

    
router.get("/logout",
    authenticate,
    controllerWrapper(ctrl.logout));

router.get("/current",
    authenticate,
    controllerWrapper(ctrl.currentUser));

router.get("/google", controllerWrapper(ctrl.googleAuth));

router.get("/google-redirect", controllerWrapper(ctrl.googleRedirect));

module.exports = router;
