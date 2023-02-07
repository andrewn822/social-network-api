const { User, Thought } = require('../models');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).exec();
        res.json(users); 
        
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const foundUser = await User.find({ _id: req.params.userId })
        .populate(['friends', 'thoughts'])
        .exec();

        res.json(foundUser);
    } catch (err) {
        res.json(500).json(err);
    }
};

const createUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        const newUser = await User.create({ username, email });

        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updatedUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: { ...req.body } },
            { new: true }
        );

        updatedUser
            ? res.json(updatedUser)
            : res.json({ message: 'No user found' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.parans.userId).exec();

        if (deletedUser) {
            await Thought.deleteMany({ username: deleteduser.username });

            res.json(deletedUser);
        } else res.json({ message: 'No user deleted' });
    } catch (err) {
        res.json(500).json(err);
    }
};

const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const results = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendsId } },
            { new: true }
        ).exec();

        restuls ? res.json(results) : res.json({ message: 'No user found' });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const results = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        ).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updatedUser,
    deleteUser,
    addFriend,
    deleteFriend,
};
