const express = require('express');
const router = express.Router();

const route = '/';

router.get('/', (req, res) => {
    res.render('examplePage');
})

module.exports = {route, router};