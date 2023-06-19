import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Repositories from "./components/Repositories";
import Post from "./components/Posts";
import SignupForm from "./components/Formic/SignupForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({});

function App() {
  const loggedIn = localStorage.getItem("isLoggedIn");
  return (
    <QueryClientProvider client={queryClient}>
 
    <div className="App">
      {loggedIn ? (
        <Router>
          <Routes>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/repositories" element={<Repositories />}></Route>
            <Route path="/posts" element={<Post />}></Route>
            <Route path="/SignupForm" element={<SignupForm />}></Route>

          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      )}
    </div>
      <ReactQueryDevtools initialIsOpen={true} />

    </QueryClientProvider>
  );
}

export default App;
