const router = require("express").Router();
const bucketListController = require("../../controllers/bucketListController");

router.route('/:id')
    .put(bucketListController.update)
    .delete(bucketListController.remove);

router.route('/')
    .post(bucketListController.create);

module.exports = router