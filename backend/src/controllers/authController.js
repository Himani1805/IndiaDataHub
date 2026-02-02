import jwt from 'jsonwebtoken';
import config from '../config/config.js'; // Import our central config

export const login = async (req, res) => {
  const { email, password } = req.body;

  const adminUser = {
    email: 'admin@indiadatahub.com',
    password: 'password123'
  };

  try {
    if (email === adminUser.email && password === adminUser.password) {
      // Use JWT_SECRET_KEY from config to match the middleware
      const token = jwt.sign(
        { email: adminUser.email },
        config.JWT_SECRET_KEY, 
        { expiresIn: config.JWT_EXPIRES_IN || '1d' }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token: token
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};