import app from './app.js';
import config from './config/config.js'; // This now looks for the 'default' object
import { connectDB } from './config/db.js';

const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = config.PORT;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();