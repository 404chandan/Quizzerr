const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// controller for login
//handles registration and all fucntions for new user and routes are connected in index.js page
exports.register = async (req, res) => {
  console.log("REGISTERING NEW USER");
  console.log(req.body);
//validation of input fields  
  try {
    const { email, username, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword || !role) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all the fields" });
    }
  //validation of password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password should be same",
      });
    }
//check duplicates in email and username
    const emailExists = await User.findOne({ email });
    
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered, Please log in" });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }
    //protection against storing raw password
    const hashedPasssword = await bcrypt.hash(password, 10);
    //creation of user
    const user = await User.create({
      username,
      email,
      password: hashedPasssword,
      role,
    });
    //return 200 if user created otherwise 400
    return res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log("ERROR WHILE REGISTERING THE NEW USER : ", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//login function for exisiting users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please fill all the fields" });
    }
    //check if email really exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }
    //if exists match passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }
// generating jwt token for further use
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", //duration of jwt
      }
    );

    // create cookie and send res
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
          attemptedQuizzes: user?.attemptedQuizes || [],
        },
      },
    });
  } catch (error) {
    console.log("ERROR WHILE LOGGIN IN THE USER : ", e);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
