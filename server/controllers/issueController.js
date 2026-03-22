const Issue = require("../models/IssueModel");
const User = require("../models/UserModel");
const fs = require("fs");
const path = require("path");

const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "firstname lastname")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserIssues = async (req, res) => {
  try {
    const { userId } = req.params;
    const issues = await Issue.find({ user: userId });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getIssue = async (req, res) => {
  try {
    const id = req.params;
    const issue = await Issue.findByID(id);
    if (!issue) return res.status(404).json({ message: "No Issue Found" });
    res.status(issue);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createIssue = async (req, res) => {
  try {
    const { title, description, category, area, photo, coordinates } = req.body;

    const issue = new Issue({
      user: req.user.id,
      title,
      description,
      category,
      area,
      photo: req.file.filename,
      coordinates,
    });
    await issue.save();

    res.status(201).json({ message: "Issue Created", issue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const Issue = require("../models/Issue");

const voteIssue = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user.id;

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const hasVoted = issue.votes.includes(userId);

    if (hasVoted) {
      issue.votes.pull(userId);
    } else {
      issue.votes.push(userId);
    }

    await issue.save();

    res.status(200).json({
      message: hasVoted ? "Vote removed" : "Vote added",
      totalVotes: issue.votes.length,
      votes: issue.votes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const id = req.params.id;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.photo) {
      const imagePath = path.join(__dirname, "../public/uploads", issue.photo);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await Issue.findByIdAndDelete(id);
    res.json({ message: "Issue deleted." });
  } catch (error) {
    req.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getIssues,
  getUserIssues,
  getIssue,
  createIssue,
  voteIssue,
  deleteIssue,
};
