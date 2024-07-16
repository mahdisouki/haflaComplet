const router = require("express").Router()

const serviceController = require("../controllers/ServiceCtrl");
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);
module.exports = router;
