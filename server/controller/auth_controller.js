
const User = require("../models/User_models");
const bcrypt = require("bcrypt");
const home = async (req, res) => {
    try {
        res.status(200).send("request send 200 and you are now in auth_router in auth controller and home");
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        //const saltRound=10;
        //const hash_password = await bcrypt.hash(password, saltRound);
        const creatUser = await User.create({ username, email, phone, password });
        res.status(200).json({
            msg: `Registration Successful and password is ${password}`,
            token: await creatUser.generateToken(),
            userId: creatUser._id.toString()
        });
    } catch (error) {
        res.status(500).send({ msg: "internal server error" });


    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExist = await User.findOne({ username });
        if (!userExist) {
            return res.status(400).json({ msg: "invaild username" });
        }
        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            console.log(password);//show password in cmd
            res.status(200).json({
                msg: `login sucessfully ${password}`,
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "login unsuccessful" });
    }
}

const user = async (res, req) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(400).json({userData })
    } catch (error) {
    }
}

module.exports = { home, register, login, user };