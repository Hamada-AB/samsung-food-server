import {
  createCommentDb,
  updateCommentDb,
  getCommentsDb,
  deleteCommentDb,
} from "../queries/comment.js";

export const createComment = async (req, res) => {
  const { content, recipeId } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required." });
  }

  try {
    const comment = await createCommentDb(content, req.user.userId, recipeId);
    res.status(201).json({ comment });
  } catch (error) {
    res.status(409).json(error);
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required." });
  }

  try {
    const comment = await updateCommentDb(Number.parseInt(id, 10), content);
    res.status(201).json({ comment });
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await getCommentsDb();
    res.status(200).json({ comments });
  } catch (error) {
    res.status(404).json({ error: "Failed to load comments." });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCommentDb(Number.parseInt(id, 10));
    res.status(200).json({ message: "Comment has been deleted successfully." });
  } catch (error) {
    res.status(404).json({ error: "Comment is not found." });
  }
};
