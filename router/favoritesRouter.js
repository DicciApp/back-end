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

router.delete('/:word', async (req, res) => {
	const { token } = req.headers
	const sid = jwt.decode(token)
	const userId = sid["id"]

	// here we are using await to first find that word that matches with userid and word 
	try {
		const result = await favoriteModel.findOneAndDelete({ userId, word: req.params.word }, { _id: 1 })
		if (result) {
			res.status(200).json({ data: result })
		} else {
			res.status(404).json({
				data: null,
			})
		}
	} catch (error) {
		res.status(500).json({ message: 'error removing word' })
	}
})


router.get('/:word', async (req, res) => {
	try {
		const { token } = req.headers
		const sid = jwt.decode(token)
		const userId = sid["id"]
		const favorites = await favoriteModel.findOne({ word: req.params.word, userId }, { _id: 1 })

		res.json(favorites)
	} catch (error) {
		res.status(500).json({ message: 'error getting favorites' })
	}
})

router.get('/', async (req, res) => {
	try {
		const { token } = req.headers
		const sid = jwt.decode(token)
		const userId = sid["id"]
		const favorites = await favoriteModel.find({ userId })

		res.json(favorites)

	} catch (error) {
		res.status(500).json({
			error: error.toString(),
			message: 'error getting favorites'
		})
	}
})

export default router