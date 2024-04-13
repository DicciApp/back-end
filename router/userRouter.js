import Express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/index.js";


const router = Express.Router();
// login routes
router.post('/login', async (req, res) => {

	try {

		// here we are resqueting email and password for the user to put 
		const { email, password } = req.body
		const user = await UserModel.findOne({ email });
		// here we are checking that the email and password matches the ones in the data base
		if (!user) {
			return res.status(401).json({
				error: true,
				message: "email or password are incorrect"
			})
		}

		if (user.password === password) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })
			res.json({
				message: "user logged in successfully",
				token
			})

		} else {
			return res.status(401).json({
				error: true,
				message: "email or password are incorrect"
			})
		}

	} catch (error) {
		return res.status(500).json({
			error: true,
			message: "Internal server error"
		})

	}



})

// logout routes
router.post('/logout', async (req, res) => {
	try {

		res.clearCookie()
		return res.json({
			message: "User logged out successfully"
		})

	} catch (error) {
		console.log('Error logging out', error)
	}
})

// signup or register routes
router.post("/signup", async (req, res) => {

	try {
		const { fullName, email, password } = req.body

		const existingEmail = await UserModel.findOne({ email: email });
		if (existingEmail) {
			return res.status(400).json({ error: 'email already exist' })
		}
		// here we are creating a new user with the data received
		const user = new UserModel({ fullName, email, password })
		// we are saving the new useer in the data base
		await user.save()

		res.json({ message: 'User registered succefully' });
	} catch (error) {
		console.error('Error registering user', error)
	}
})
export default router