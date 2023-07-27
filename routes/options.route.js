const express = require('express');
const router = express.Router();

const OptionsController = require('../controllers/options.controller');
const optionsController = new OptionsController();

router.get('/options', optionsController.getOptions);
router.post('/options', optionsController.createOption);

router.delete('/options/:optionId', optionsController.deleteOption);

module.exports = router;