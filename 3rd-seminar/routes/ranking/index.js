const express = require('express');
const router = express.Router();

router.get('/popular', function(req, res, next){
    res.status(200).send('인기많은순');
});

router.get('/bestreply', (req, res) => {
    res.status(200).send('댓글많은순');
});

router.get('/age', (req, res) => {
    res.status(200).send('연령별');
});

module.exports = router;


