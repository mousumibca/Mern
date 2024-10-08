const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

//previous call that function before userSchema exports
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                username: this.username,
                isAdmin: this.isAdmin,
            },
            process.env.TOKEN, {
            expiresIn: "30d",
        }
        );
    } catch (err) {
        const status = 422;
    const message = "Token can't be generated";
    const extraDetails = err.issues.map((curElem) => curElem.message);

    const error = {
      status,
      message,
      extraDetails,
    };

    next(error);
    }
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



const User = new mongoose.model("USER", userSchema);

module.exports = User

//npm i bcrypt
//npm i jsonwebtoken
//npm i zod