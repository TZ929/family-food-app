const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodPostSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 500 },
  cookTime: { type: Number, required: true, min: 1, max: 1440 },
  cookTimeUnit: { type: String, enum: ['minutes', 'hours'], default: 'minutes' },
  imageUrl: { type: String, trim: true }, // Cloudinary image URL
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

const FoodPost = mongoose.model('FoodPost', foodPostSchema);
module.exports = FoodPost; 