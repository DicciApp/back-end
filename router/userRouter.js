import Express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const router = Express.Router();
// login routes
router.post('/login', async (req, res) => {
	try {
		// here we are resqueting email and password for the user to put 
		const { email, password } = req.body
		const user = await userModel.findOne({ email });
		// here we are checking that the email and password matches the ones in the data base
		if (!user) {
			return res.status(401).json({
				error: true,
				message: "email or password are incorrect"
			})
		}

		const veryPassword =  bcrypt.compareSync(password, user.password)
		
		if (veryPassword) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })
			res.json({
				message: "user logged in successfully",
				token,
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

		const existingEmail = await userModel.findOne({ email: email });
		if (existingEmail) {
			res.status(400).json({
				data: null,
				message: 'user already exist'
			})
		}

		const salt = await bcrypt.genSalt(10)

		// here we are hashing the password
		const hashedPassword = await bcrypt.hash(password, salt)

		// here we are creating a new user with the data received
		const user = new userModel({ fullName, email, password: hashedPassword })

		// we are saving the new useer in the data base
		await user.save()

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })

		res.json({
			token,
			message: 'User registered succefully'
		})
		
	} catch (error) {
		res.json({
			token: null,
			message: error.toString()
		})
	}
})


router.get("/", async (req, res) => {
	try {
		const { token } = req.headers
		const sid = jwt.decode(token)
		const userId = sid["id"]

		console.log(userId);

		const users = await userModel.find({ _id: "66154cded61591637b7619b3" })

		console.log(users);

		res.json({ users })
	} catch (error) {
		res.status(500).json({ message: 'error getting users' })
	}
})
export default router