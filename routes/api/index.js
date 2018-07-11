const router = require('express').Router();
const itemRoutes = require('./items');
const listRoutes = require('./lists');
const getUserRoutes = require('./getUserInfo')

router
    .use('/items', itemRoutes)
    .use('/lists', listRoutes)
    .use('/getUserInfo', getUserRoutes)

module.exports = router;