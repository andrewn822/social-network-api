const { User, Thought } = require('..//models');

const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleThought = async (req, res) => {
    try {
        const foundThought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(foundThought);
    } catch (err) {
        res.status(500).json(err);
    }
};