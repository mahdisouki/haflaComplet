const router = require("express").Router()

const commandeController = require("../controllers/CommandeCtrl");

router.post("/commandes", commandeController.createCommande);
router.get("/commandes", commandeController.getCommandes);
router.put("/commandes/:id", commandeController.updateCommande);
router.delete("/commandes/:id", commandeController.deleteCommande);
module.exports = router;
