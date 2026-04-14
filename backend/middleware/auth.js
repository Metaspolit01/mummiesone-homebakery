const jwt = require('jsonwebtoken');

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { verifyAdminToken };
