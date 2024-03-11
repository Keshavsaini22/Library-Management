const express = require('express');
const router = express.Router();

router.use("/", require("./authRoute"))
router.use("/", require("./bookRoutes"))
module.exports = router;