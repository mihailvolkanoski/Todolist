import express from 'express';
import path from 'path';
import cors from 'cors';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import { errorHandler, middleware } from 'supertokens-node/framework/express';
import todoRoutes from './todoroutes.js';

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
app.use(express.json());

// Initialize SuperTokens with your configurations
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://your-connection-uri",
        apiKey: "your-api-key",
    },
    appInfo: {
        appName: "To-do List",
        apiDomain: "http://127.0.0.1:3000",
        websiteDomain: "http://127.0.0.1:5500",
        apiBasePath: "/backend/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Session.init(),
        // Add other recipes here if needed
    ],
    logLevel: "DEBUG"
});

// Middleware for SuperTokens
app.use(middleware());
app.use(Session.init());
app.use(express.static(path.join(__dirname, 'web_frontend')));

// Serve the HTML file (fixed path separator)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web_frontend', 'index.html'));  // Fixed path
});

// Use the todo routes with the correct prefix
app.use('/web_backend/todos', todoRoutes);  // Fixed route prefix

// Error handling middleware
app.use(errorHandler());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
