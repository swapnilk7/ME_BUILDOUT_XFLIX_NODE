const express = require("express");
const videoRouter = require("./video.routes");

const router = express.Router();

router.use("/videos", videoRouter);

module.exports = router;
