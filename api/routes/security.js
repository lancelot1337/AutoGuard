const express = require('express');

const router = express.Router();

const SecuritiesController = require('../controller/security');
router.get('/', SecuritiesController.security);
module.exports = router;