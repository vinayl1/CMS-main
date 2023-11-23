const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
require("../models/users.model");
const User = Mongoose.model("User");
const { validate } = require("../models/users.model");
const bcrypt = require("bcrypt");
const Token = require("../models/token.model");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmail");
const { board } = require("../processes/main");
const Queue = require("bull");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const emailQueueProcess = require("../processes/emailQueueProcess");
const { emailQueue, redisClient } = require("../processes/main");
const Redis = require("redis");
const userControllerDao = require("../dao/userControllerDao");
const DEFAULT_EXPIRATION = 3600;
module.exports = {
  test1: (req, res) => {
    console.log("---------->reached test1");
  },
  test: (req, res) => {
    User.create({
      firstname: "abdullah",
      email: "abdullah.ahmed1001@gmail.com",
    })
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  register: async (req, res) => {
    console.log("reached---->>>>");
    try {
      const { error } = validate(req.body);
      if (error) {
        console.log("error in validation : ", error);
        return res.status(400).send({
          status: "fail",
          message: "something went wrong with validation",
        });
      }
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        return res.status(400).send({
          status: "bad request",
          message: "email already exists",
        });
      }
      // const created =  await User.create(req.body)
      const created = await userControllerDao.createUser(req.body);

      const token = await userControllerDao.createToken(created._id);
      const url = `${process.env.BASE_URL}users/${created.id}/verify/${token.token}`;
      const response = await sendEmail.emailVerification(
        created.email,
        "Verify Email",
        url
      );
      return res.status(200).send({
        status: "success",
        message: "An Email sent to your account please verify",
      });
    } catch (err) {
      console.log(err);
    }
  },

  verify: async (req, res) => {
    const userId = req.params.id;
    const temp_token = req.params.token;
    console.log("email verify reached---------->", userId, temp_token);
    try {
      const user = await User.findOne({ _id: userId });
      console.log("user1: ", user);
      if (!user) return res.status(400).send({ message: "Invalid link" });

      const token = await Token.findOne({
        userId: user._id,
        token: temp_token,
      });
      console.log("token->", token);
      if (!token) return res.status(400).send({ message: "Invalid link" });
      console.log("reached");

      const a = await User.updateOne({ _id: user._id }, { verified: true });
      await token.deleteOne({ _id: token._id });

      return res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).send({ message: "Internal Server Error", error: error });
    }
  },
  login: async (req, res) => {
    try {
      console.log(" login reached", req.body);
      // const user = await User.findOne({
      //     email:req.body.email
      // })
      const user = await userControllerDao.findUser(req.body.email);
      console.log("found user", user);
      if (!user)
        return res.status(400).send({
          status: "failure",
          message: "Invalid username or password",
        });

      const validPass = await userControllerDao.passCheck(
        req.body.password,
        user.password
      );
      
      if (!validPass) {
        return res.status(400).send({
          status: "failure",
          message: "Invalid username or password",
        });
      }

      if (!user.verified) {
        return res.status(400).send({
          status: "failure",
          message: "email is not verified",
        });
      }

      const token = jwt.sign(
        { email: user.email, id: user._id, password: user.password },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        //   expires:new Date(Date.now() + 1000)
      });
      return res.status(200).json({
        status: "success",
        message: "login sucessfull",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        status: "fail",
        message: "something went wrong",
      });
    }
  },
  me: (req, res) => {
    console.log("resssss");
    const id = res.locals.decodedId;
    return res.status(200).send({
      status: "success",
    });
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      return res.status(200).json({
        status: "success",
        message: "logout sucessfull",
      });
    } catch (err) {
      console.log(err);
    }
  },

  getAllUsersWithRedis: async (req, res) => {
    console.log("all user reached");
    try {
      redisClient.get("users", async (error, users) => {
        if (error) console.log(error);
        if (users != null) {
          return res.status(200).send({
            status: "success",
            users: JSON.parse(users),
          });
        } else {
          const users = await User.find({});
          redisClient.setex("users", DEFAULT_EXPIRATION, JSON.stringify(users));

          return res.status(200).send({
            status: "success",
            users: users,
          });
        }
      });
    } catch (err) {
      return res.status(400).send({
        status: "fail",
        message: "something went wrong",
      });
    }
  },
  getAllUsers: async (req, res) => {
    console.log("all user reached");
    try {
      const users = await User.find({});

      return res.status(200).send({
        status: "success",
        users: users,
      });
    } catch (err) {
      return res.status(400).send({
        status: "fail",
        message: "something went wrong",
      });
    }
  },

  getUserById: async (req, res) => {
    console.log("get user by Id reached---->")
    try {
      const id = res.locals.decodedId;
      const user= userControllerDao.findUserById(id)
      if (user) {
        return res.status(200).send({
          status: "success",
          user: user,
        });
      }
      return res.status(404).send({
        status: "not found",
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        message: "bad request",
      });
    }
  },

  deleteUserById: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndDelete({
        _id: userId,
      });
      if (user) {
        return res.status(200).send({
          status: "success",
          message: " User deleted successfully",
        });
      }
      return res.status(400).send({
        status: "fail",
        message: "something went wrong",
      });
    } catch (err) {
      console.log(err);
    }
  },

  SendEmailToController: async (req, res) => {
    console.log("reached send email to user route");
    try {
      // const users = await User.find();
      // board.addQueue(new BullAdapter(emailQueue))
      // console.log("----------*-------->reacheddd")
      // emailQueue.add({"firstname":users[0].firstname,"lastname":users[0].lastname,"email":users[0].email },{repeat:{cron:'* * * * *'}})
      // // emailQueue.add({})
      // .catch((err)=>{
      //     console.log(err)
      //  })
      //     console.log("checkpoint-->")
      //     emailQueue.getJobCounts()
      //     .then((counts)=>{
      //        console.log(counts)
      //     })
      //     return res.status(200).send({msg: 'true'})
      //  emailQueue.getJobCounts().then((counts)=>{
      //     console.log("job counts : ",counts)
      //  })
      // users.map(async(user)=>{
      //      board.addQueue(new BullAdapter(emailQueue)) // for adding queues to bull board
      //      console.log("reacheddddddddddddddd")
      //      await emailQueue.add(
      //      {"firstname":user.firstname,"lastname":user.lastname,"email":user.email },
      //      );
      // })
    } catch (err) {
      console.log("error is: ", err);
    }
  },

  updateProfileImage: async (req, res) => {
    console.log("update profile image controller reached");
    try {
      const id = res.locals.decodedId;
      await User.findOneAndUpdate(
        { _id: id },
        {
          image: req.body.image,
        }
      );

      return res.status(200).send({
        message: "image added successfully",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
