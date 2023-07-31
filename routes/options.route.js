const express = require('express');
const router = express.Router();

const OptionsController = require('../controllers/options.controller');
const optionsController = new OptionsController();

router.get('/cache-options', async (req, res) => {
    try {
      await optionsController.cacheAllOptionsFromDB();
      res.json({ message: 'Options cached successfully' });
    } catch (error) {
      console.error('Failed to cache options from DB:', error);
      res.status(500).json({ error: 'Failed to cache options from DB' });
    }});

router.get('/options', optionsController.getOptions);
router.post('/options', optionsController.createOption);
router.put('/options/:optionId', optionsController.updateOption);
router.delete('/options/:optionId', optionsController.deleteOption);

module.exports = router;