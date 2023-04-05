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
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json({ message: "This thought has been created!", user: updatedUser });
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
        : res.status(404).json({ message: "Oops!..No thought by ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Sorry..No thought with this ID" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: "Sorry..No thought with this ID" });
      } else {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
        res.json({ message: "Congrats! you have successfully deleted the thought!" });
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
        : res.status(404).json({ message: "No thought found with the ID that you have entered"});
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
        : res.status(404).json({ message: "No thought with the ID that you have provided with" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
