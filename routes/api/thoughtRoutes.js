const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// Set up GET all and POST at /api/thoughts
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router.route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Add and delete a reaction
router.route("/:thoughtId/reactions")
  .post(addReaction);

router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
