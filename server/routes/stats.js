const router = require("express").Router();
const cors = require("cors");
const { protect, admin } = require("../middlewares/authMiddleware");
const statsController = require("../controllers/statsController");

router.use(cors());

// Admin only route
router.get("/", protect, admin, statsController.getAreaStats);

module.exports = router;
