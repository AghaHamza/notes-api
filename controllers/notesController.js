const AppError = require("../middlewares/AppError");
const pool = require("../db");

async function getNotes(req, res, next) {
  try {
    const notes = await pool.query("SELECT * FROM notes WHERE user_id = $1", [
      req.user.userId,
    ]);
    res.json(notes.rows);
  } catch (err) {
    next(err);
  }
}
async function createNote(req, res, next) {
  try {
    const { title, content } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, req.user.userId],
    );
    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateNote(req, res, next) {
  try {
    const { title, content } = req.body;
    const updatedNote = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, content, req.params.id, req.user.userId],
    );
    if (updatedNote.rows.length === 0) {
      throw new AppError("Note not found", 404);
    }
    res.json(updatedNote.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteNote(req, res, next) {
  try {
    const deletedNote = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user.userId],
    );
    if (deletedNote.rows.length === 0) {
      throw new AppError("Note not found", 404);
    }
    res.json({
      message: "Note deleted successfully",
      note: deletedNote.rows[0].title,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
