const router = require("express").Router();
const bucketListController = require("../../controllers/bucketListController");

router.route("/:id")
    .get(bucketListController.findById);

router.route('/')
    .post(bucketListController.createList);

module.exports = router;