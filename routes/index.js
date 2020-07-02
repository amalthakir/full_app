const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../modules/story");

router.get("/", ensureGuest, (req, res) => {
  res.render("loginView", { layout: "login" });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    console.log({ user: req.user.id });
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
