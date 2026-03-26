const Issue = require("../models/IssueModel");

const getAreaStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: "$area",
          totalIssues: { $sum: 1 },
          resolvedIssues: {
            $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] }
          },
          pendingIssues: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] }
          },
          inProgressIssues: {
            $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          area: "$_id",
          totalIssues: 1,
          resolvedIssues: 1,
          pendingIssues: 1,
          inProgressIssues: 1,
          _id: 0
        }
      },
      { $sort: { totalIssues: -1 } }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching stats" });
  }
};

module.exports = { getAreaStats };
