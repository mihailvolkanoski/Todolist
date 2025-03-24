/*import React from 'react';
import { createRoot } from 'react-dom/client';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdParty, { Github, Google, Facebook, Apple } from "supertokens-auth-react/recipe/thirdparty";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session"; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import TodoList from './todolist.jsx';
import App from './App.jsx'; 
import { Dashboard } from 'supertokens-auth-react/recipe/dashboard';

const root = createRoot(document.getElementById("root"));

// Initialize SuperTokens
SuperTokens.init({
    appInfo: {
        appName: "To-do List",
        apiDomain: "http://127.0.0.1:3000",
        websiteDomain: "http://127.0.0.1:5173",
        apiBasePath: "/backend/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    Github.init(),
                    Google.init(),
                    Facebook.init(),
                    Apple.init(),
                ]
            }
        }),
        EmailPassword.init(),
        Session.init(),
    ]
});

const MainApp = () => {
    return (
        <SuperTokensWrapper>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} /> 
                    <Route path="/auth" element={canHandleRoute() ? getRoutingComponent() : null} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/todos" element={<TodoList />} />
                </Routes>
            </Router>
        </SuperTokensWrapper>
    );
};

root.render(
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>
);

export default MainApp;*/
