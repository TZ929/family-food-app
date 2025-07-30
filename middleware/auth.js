const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    console.log('🔍 Auth middleware - JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('🔍 Auth middleware - Authorization header:', req.header('Authorization') ? 'present' : 'missing');
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.log('❌ No token found in Authorization header');
      return res.status(401).json({ msg: 'No authentication token, authorization denied.' });
    }

    console.log('🔍 Token received:', token.substring(0, 20) + '...');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified, user ID:', verified.id);
    req.user = verified.id;
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
  }
}; 