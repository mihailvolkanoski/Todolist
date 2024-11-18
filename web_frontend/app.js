import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { ThirdPartyEmailPassword } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import TodoList from './todolist';
import './todolist.css';

// Initialize SuperTokens
SuperTokens.init({
    appInfo: {
        appName: "To-do List",
        apiDomain: "http://127.0.0.1:3000",
        websiteDomain: "http://127.0.0.1:5500",
        apiBasePath: "/backend/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init()
    ]
});

const App = () => {
    return (
        <SuperTokensWrapper>
            <Router>
                <Routes>
                    <Route path="/auth" element={<ThirdPartyEmailPassword />} />
                    <Route path="/todos" element={<TodoList />} />
                </Routes>
            </Router>
        </SuperTokensWrapper>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
