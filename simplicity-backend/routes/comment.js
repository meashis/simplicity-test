const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the comment
 *         postId:
 *           type: integer
 *           description: The id of the related post
 *         user_id:
 *           type: integer
 *           description: The id of the user who made the comment
 *         comment:
 *           type: string
 *           description: The comment text
 *         commented_at:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment to a blog post
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *       500:
 *         description: Some server error
 */
router.post("/", auth, async (req, res) => {
  try {
    const pool = req.db;
    await Comment.addComment(pool, req.body.postId, req.user.id, req.body.comment);
    res.status(201).json({ msg: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the post
 *     responses:
 *       200:
 *         description: The comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/:postId", async (req, res) => {
  try {
    const pool = req.db;
    const result = await // .query('SELECT * FROM Comments WHERE post_id = @postId');
    pool.request().input("postId", req.params.postId).query(`
                SELECT
                    Comments.id AS comment_id,
                    Comments.comment,
                    Comments.post_id,
                    Comments.commented_at,
                    Users.id AS user_id,
                    Users.username
                FROM
                    Comments
                INNER JOIN
                    Users
                ON
                    Comments.user_id = Users.id
                WHERE
                    Comments.post_id = @postId;
            `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       500:
 *         description: Some server error
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const pool = req.db;
    await pool.request().input("id", req.params.id).query("DELETE FROM Comments WHERE id = @id");

    res.json({ msg: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
