const router = require("express").Router();
const bucketListController = require("../../controllers/bucketListController");

router.route('/:id')
    .put(bucketListController.update)
    .delete(bucketListController.remove)
    .get(bucketListController.findUser);

router.route('/')
    .post(bucketListController.create);

module.exports = router