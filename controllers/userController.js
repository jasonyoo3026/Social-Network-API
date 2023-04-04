const { Thought, User } = require("../models");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      updatedUser
        ? res.json(updatedUser)
        : res.status(404).json({ message: "No user found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      } else {
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: "User and associated thoughts deleted successfully!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      user
        ? res.json(user)
        : res.status(404).json({ message: "No user with this ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );
      user
        ? res.json(user)
        : res.status(404).json({ message: "No friend found with that ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      user
        ? res.json(user)
        : res.status(404).json({ message: "No friend found with that ID" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
