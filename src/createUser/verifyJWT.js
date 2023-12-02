const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({auth: false, message: 'Failed to authenticate token.'});

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      req.userId = decoded.id;
      next();
    }
  })
}

module.exports = verifyJWT;