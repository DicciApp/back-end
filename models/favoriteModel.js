import { Schema, model } from "mongoose"


// // favorite entitie for user entitie
const favoriteSchema = new Schema({
  word: String,
  // definition: String,
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User'
   },
},
  { timestamps: true }
)

const FavoriteModel = model('Favorite', favoriteSchema)

export default FavoriteModel