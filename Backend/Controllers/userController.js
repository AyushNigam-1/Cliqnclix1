const User = require('../Models/userModel');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Asset = require('../Models/assetModel');

exports.getUser = async (req, res) => {
    const { _id } = req;
    try {
        const user = await User.findOne({ _id }).populate('wishlist').populate("cart.asset").populate("assets").populate('downloads')
        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.validateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('wishlist').populate("cart.asset");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials! Try again" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials! Try again " });
        }
        const token = jwt.sign({ _id: user._id }, "Secret", { expiresIn: '48h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Please try another email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword })
        user.save().then((savedUser) => {
            const token = jwt.sign({ _id: savedUser._id }, "Secret", { expiresIn: '48h' });
            res.status(201).json({ message: "User created successfully", user: savedUser.toSafeObject(), token });
        })
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.updateUser = async (req, res) => {
    const filter = { _id: req.body.id };
    const update = req.body.update;
    const options = { new: true };
    try {
        const updatedUser = User.findOneAndUpdate(filter, update, options)
        if (updatedUser) {
            return res.status(200).json({ user: updatedUser });
        }
        else {
            return res.status(400).json({ message: "No user found" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.updateUserRole = async (req, res) => {
    const { _id } = req;
    const filter = { _id };
    let update
    update = { type: "contributor" };
    const options = { new: true };
    try {
        const updatedUser = await User.findOneAndUpdate(filter, update, options).populate("wishlist").populate("creator");
        if (updatedUser) {
            return res.status(200).json({ user: updatedUser });
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.updateWishlist = async (req, res) => {
    const { _id } = req;
    const filter = { _id };
    let update
    if (req.body.op == 1) {
        update = { $push: { wishlist: req.body.itemId } };
    }
    else {
        update = { $pull: { wishlist: req.body.itemId } };
    }
    const options = { new: true };

    try {
        const updatedUser = await User.findOneAndUpdate(filter, update, options);
        if (updatedUser) {
            return res.status(200).json({ message: "Added to Wishlist" });
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.updateCart = async (req, res) => {
    const { _id } = req;
    const filter = { _id };
    let update
    console.log(req.body)
    if (req.body.op == 1) {
        update = { $push: { cart: req.body.item } };
    }
    else {
        update = { $pull: { cart: req.body.item } };
    }
    const options = { new: true };

    try {
        const updatedCart = await User.findOneAndUpdate(filter, update, options);
        if (updatedCart) {
            return res.status(200).json({ message: 'Added to Cart' });
        } else {
            return res.status(400).json({ message: "No user found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}