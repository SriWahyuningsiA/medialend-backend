const express = require("express");
const router = express.Router();
const alat = require("../controllers/alatController");

router.get("/", alat.getAll);
router.post("/", alat.create);
router.put("/:id", alat.update);
router.delete("/:id", alat.delete);

module.exports = router;