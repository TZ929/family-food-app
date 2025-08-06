const router = require('express').Router();
const FoodPost = require('../models/foodPost.model');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { upload } = require('../config/cloudinary');

// GET all food posts (for now, just user's own posts)
router.get('/', auth, async (req, res, next) => {
  try {
    const posts = await FoodPost.find({ author: req.user })
      .populate('author', 'username')
      .populate('recipe')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET single food post
router.get('/:id', auth, async (req, res, next) => {
  try {
    const post = await FoodPost.findById(req.params.id)
      .populate('author', 'username')
      .populate('recipe');
    
    if (!post) {
      return res.status(404).json({ msg: 'Food post not found' });
    }
    
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST create new food post
router.post('/', auth, upload.single('image'), [
  body('title').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters'),
  body('cookTime').isInt({ min: 1, max: 1440 }).withMessage('Cook time must be between 1 and 1440 minutes'),
  body('cookTimeUnit').optional().isIn(['minutes', 'hours']).withMessage('Cook time unit must be minutes or hours'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, cookTime, cookTimeUnit, isPublic } = req.body;
    
    const newPost = new FoodPost({
      title,
      description,
      cookTime,
      cookTimeUnit: cookTimeUnit || 'minutes',
      imageUrl: req.file ? req.file.path : null, // Cloudinary URL
      author: req.user,
      isPublic: isPublic || false
    });

    const savedPost = await newPost.save();
    const populatedPost = await FoodPost.findById(savedPost._id)
      .populate('author', 'username');
    
    res.status(201).json(populatedPost);
  } catch (err) {
    next(err);
  }
});

// PUT update food post
router.put('/:id', auth, [
  body('title').optional().isString().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('description').optional().isString().trim().isLength({ min: 1, max: 500 }).withMessage('Description must be between 1 and 500 characters'),
  body('cookTime').optional().isInt({ min: 1, max: 1440 }).withMessage('Cook time must be between 1 and 1440 minutes'),
  body('cookTimeUnit').optional().isIn(['minutes', 'hours']).withMessage('Cook time unit must be minutes or hours'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await FoodPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Food post not found' });
    }
    
    // Check if user owns the post
    if (post.author.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized to update this post' });
    }
    
    const updatedPost = await FoodPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');
    
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

// DELETE food post
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await FoodPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Food post not found' });
    }
    
    // Check if user owns the post
    if (post.author.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized to delete this post' });
    }
    
    await FoodPost.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Food post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router; 