const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token)
      return res.status(401).json({ msg: 'No authentication token, authorization denied.' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
  }
}; 