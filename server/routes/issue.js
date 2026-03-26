const router = require("express").Router();
const cors = require("cors");
const upload = require("../middlewares/multer");
const { protect, admin } = require("../middlewares/authMiddleware");
const issueController = require("../controllers/issueController");

router.use(cors());

router.use(protect); // protect all routes below

// Community routes
router.get("/", issueController.getIssues);

// Admin only routes
router.patch("/:id/status", admin, issueController.updateIssueStatus);
router.delete("/:id", admin, issueController.deleteIssue);

// User routes
router.get("/:id", issueController.getIssue);
router.post("/", upload.single("photo"), issueController.createIssue);
router.get("/user/:userId", issueController.getUserIssues);
router.patch("/:id/upvote", issueController.voteIssue);

module.exports = router;
