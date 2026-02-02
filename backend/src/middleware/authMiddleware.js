import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers (Standard: Authorization: Bearer <token>)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

      // Add user info from payload to request object
      req.user = decoded;

      // Move to the next middleware or controller
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};