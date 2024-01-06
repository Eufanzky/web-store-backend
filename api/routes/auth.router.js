const express = require('express');
const passport = require('passport');

const router = express.Router();

//Categories
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    try {
      res.json(req.user)
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
