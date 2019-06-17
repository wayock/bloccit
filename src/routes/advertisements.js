const express = require("express");
const router = express.Router();

const advertisementController = require("../controllers/advertisementController")

router.get("/advertisements", advertisementController.index);
router.get("/advertisements/new", advertisementController.new);
router.get("/advertisements/:id", advertisementController.show);
router.post("/advertisements/create", advertisementController.create);
router.post("/advertisements/:id/destroy", advertisementController.destroy);

module.exports = router;
