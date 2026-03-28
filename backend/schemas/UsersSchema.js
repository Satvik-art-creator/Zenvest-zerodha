const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require("bcrypt");

const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, "Your name is required"]
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
        unique: [true, "Username must be unique"]
    },
    number: {
        type: Number,
        required: [true, "Your number is required"],
        unique: [true, "Number already exists"]
    },
    email: {
        type: String,
        required: [true, "Your email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: {
        type: String,
        default: null,
    },
    emailVerificationTokenExpiresAt: {
        type: Date,
        default: null,
    },
    emailVerifiedAt: {
        type: Date,
        default: null,
    },
    lastVerificationEmailSentAt: {
        type: Date,
        default: null,
    },
    balance: {
        type: Number,
        default: 1000,
        required: [true, "Your balance is required"],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

UsersSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports=UsersSchema;