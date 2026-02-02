import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    SALT: process.env.PORT, 
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN 
};

export default config;