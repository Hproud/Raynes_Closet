const router = require('express').Router();

module.exports = router;


// ! test function
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
