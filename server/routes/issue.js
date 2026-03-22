const router = require("express").Router();
const cors = require("cors");
const upload = require("../middlewares/multer");
const { protect } = require("../middlewares/authMiddleware");
const issueController = require("../controllers/issueController");

router.use(cors());

router.get("/", issueController.getIssues);
router.get("/:id", issueController.getIssue);

router.use(protect);

router.post("/", upload.single("photo"), issueController.createIssue);
router.get("/user/:userId", issueController.getUserIssues);
router.patch("/:id/vote", issueController.voteIssue);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;
