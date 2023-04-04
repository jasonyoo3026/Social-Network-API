const { Thought, User } = require("../models");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      updatedThought
        ? res.json(updatedThought)
        : res.status(404).json({ message: "No thought by ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "No thought with this ID" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      } else {
        await User.findOneAndUpdate(
          { _id: req.body.userID },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
        res.json({ message: "Thought and association deleted!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "No thought found with that ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "No thought found with that ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
