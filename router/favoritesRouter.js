import { Router } from "express"
import favoriteModel from "../models/favoriteModel.js"
import jwt from "jsonwebtoken";


const router = Router()
// here is the route to add a word to favorites
router.post('/', async (req, res) => {
	try {
		const { token, word } = req.body;
		const sid = jwt.decode(token)
		const userId = sid["id"]

		const existingFavorite = await favoriteModel.findOne({ userId, word })

		if (!!existingFavorite) {
			res.json({
				error: true,
				message: "word already in favorites"
			})

		} else {
			const newFavorite = new favoriteModel({ userId, word });
			await newFavorite.save();

			res.json({
				error: false,
				message: 'Word added to favorites successfully',
				newFavorite
			});
		}

	} catch (error) {
		res.status(500).json({
			error: error.toString(),
			message: "error adding word to favorite"
		})
	}
})

router.post('/delete', async (req, res) => {
	const { userId, word } = req.body;

	// here we are using await to first find that word that matches with userid and word 
	try {
		const result = await favoriteModel.findOneAndDelete({ userId, word })
		if (result) {
			res.status(200).json({ message: 'word removed from favorites succefully' })
		} else {
			res.status(404).json({ message: 'word not found' })
		}
	} catch (error) {
		res.status(500).json({ message: 'error removing word' })
	}
})

export default router