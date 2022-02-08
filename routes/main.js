const express = require('express');
const router = express.Router();

const route = '/';

router.get('/main', (req, res) => {
    res.send('main');
})

module.exports = {route, router};