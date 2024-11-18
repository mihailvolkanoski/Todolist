import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { errorHandler, middleware } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import ThirdParty from "supertokens-node/recipe/thirdparty";
import Dashboard from "supertokens-node/recipe/dashboard";
import todoRoutes from 'todoRoutes.js'; 


supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://st-dev-66537760-849e-11ef-91bf-ef1598ee3c02.aws.supertokens.io",
        apiKey: "LzNulBe3yxLiqitGAEGH4o2Uat",
    },
    appInfo: {
        appName: "To-do List",
        apiDomain: "http://127.0.0.1:3000",
        websiteDomain: "http://127.0.0.1:5500",
        apiBasePath: "/backend/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [{
                                clientId: process.env.GOOGLE_CLIENT_ID,
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET
                            }]
                        }
                    },
                    {
                        config: {
                            thirdPartyId: "github",
                            clients: [{
                                clientId: process.env.GITHUB_CLIENT_ID,
                                clientSecret: process.env.GITHUB_CLIENT_SECRET
                            }]
                        }
                    },
                ]
            }
        }),
        Session.init(),
        Dashboard.init()
    ],
    logLevel: "DEBUG"
});

const app = express();

// CORS setup
app.use(cors({
    origin: "http://127.0.0.1:5500",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));


app._router.stack.forEach(function (middleware) {
    if (middleware.route) { 
        console.log(middleware.route);
    } else if (middleware.name === 'router') { 
        middleware.handle.stack.forEach(function (handler) {
            if (handler.route) {
                console.log(handler.route);
            }
        });
    }
});


app.get("/", (req, res) => res.send("Hello World!"));

app.use(errorHandler());

app.use('/web_backend/todos', todoRoutes); 

// Custom error handler
app.use((err, req, res, next) => {
    console.error(err);
    let statusCode = err.status || 500;
    let message = err.message || "An unexpected error occurred";

    if (err.name === "UnauthorizedError") {
        statusCode = 401;
        message = "Invalid token";
    } else if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed";
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
