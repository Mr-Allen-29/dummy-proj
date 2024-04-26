// auth.js
function verifyJWT(req, res, next) {
    const token = req.cookies.jwt; // Get JWT from cookie
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Attach decoded user info to request object
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
  
  module.exports = verifyJWT;
  