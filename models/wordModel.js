import { Schema, model } from "mongoose"



/// word entitie for user entitie
const wordSchema = new Schema({
  word: String,
  origin: String
})

const WordModel = model('Word', wordSchema)

export default WordModel