const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 100 
  },
  ingredients: [{ 
    item: { type: String, required: true, trim: true },
    amount: { type: String, required: true, trim: true },
    unit: { type: String, trim: true }
  }],
  instructions: [{ 
    type: String, 
    required: true, 
    trim: true 
  }],
  servings: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 50 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Medium' 
  },
  prepTime: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 1440 
  },
  prepTimeUnit: { 
    type: String, 
    enum: ['minutes', 'hours'], 
    default: 'minutes' 
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isPublic: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe; 