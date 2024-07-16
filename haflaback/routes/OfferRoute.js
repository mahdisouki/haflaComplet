const router = require("express").Router()

const offerController = require("../controllers/OfferCtrl");

router.post("/offers", offerController.createOffer);
router.get("/offers", offerController.getOffers);
router.put("/offers/:id", offerController.updateOffer);
router.delete("/offers/:id", offerController.deleteOffer);
module.exports = router;
