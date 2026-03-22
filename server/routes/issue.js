const router = require("express").Router;
const cors = require("cors");
const upload = require('../middleware/multer');
const issueController = require("../controllers/issueController");



router.use(cors);

router.get("/", issueController.getIssues);
router.post('/', upload.single('photo'), issueController.createIssue);
router.get("/:id", issueController.getIssue);
router.get("/user/:userId", issueController.getUserIssues);
router.patch("/:id/vote", issueController.voteIssue);
router.delete("/:id", issueController.deleteIssue);

