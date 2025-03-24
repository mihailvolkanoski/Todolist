import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
//import { ThirdPartyEmailPassword } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import TodoList from './todolist.jsx';

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

const ReactApp = () => {
    return (
        <SuperTokensWrapper>
            <Router>
                <Routes>
                    <Route path="/auth" element={<ThirdPartyEmailPassword />} />
                    <Route path="/todos" element={<TodoList />} />
                </Routes>
                <div> 
                    <TodoList />
                </div>
            </Router>
        </SuperTokensWrapper>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default ReactApp;    
