const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const contactController = require("../controllers/contactController");

authRouter.route("/signup").post(authController.signUp);
authRouter.route("/login").post(authController.login);
authRouter.route("/getAllUser").get(auth.protect, authController.getAllUser);
authRouter
  .route("/contacts")
  .get(auth.protect, contactController.getContacts)
  .post(auth.protect, contactController.createContact);

authRouter
  .route("/contacts/:id")
  .patch(auth.protect, contactController.updateContact)
  .delete(auth.protect, contactController.deleteContact);

module.exports = authRouter;
