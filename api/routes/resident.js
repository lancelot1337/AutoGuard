const express = require('express');

const router = express.Router();

const ResidentsController = require('../controller/residents');
router.get('/', ResidentsController.security);
module.exports = router;