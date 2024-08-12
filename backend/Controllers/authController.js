import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// user register
export const register = async (req, res) => {
   try {
      const { username, email, password, photo, role } = req.body;

      if (!username || !email || !password || !role) {
         return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Hashing password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
         username,
         email,
         password: hash,
         photo,
         role
      });

      await newUser.save();

      res.status(200).json({ success: true, message: "Successfully created!" });
   } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: "Failed to create! Try again." });
   }
}

// user login
export const login = async (req, res) => {
   try {
      const email = req.body.email
      const user = await User.findOne({ email })

      // if user doesn't exist
      if (!user) {
         return res.status(404).json({ success: false, message: 'User not found!' })
      }

      // if user is exist then check the passord or compare the password
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

      // if password incorrect 
      if (!checkCorrectPassword) {
         return res.status(401).json({ susccess: false, message: "Incorrect email or password!" })
      }

      const { password, ...rest } = user._doc
      // create jwt token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn:"15d" })

      // set token in the browser cookies and send the response to the client
      res.cookie('accessToken', token, {
         httpOnly: true,
         expires: token.expiresIn
      }).status(200).json({token, data:{...rest, role : user.role}, role : user.role})
   } catch (error) {
      res.status(500).json({ susccess: false, message: "Failed to login" })
   }
}