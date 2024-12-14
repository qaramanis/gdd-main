import "./css/App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./js/auth/AuthContext";
import PrivateRoute from "./js/auth/PrivateRoute";
import Login from "./js/auth/Login.js";
import Register from "./js/auth/Register.js";

import AddNewTeamMember from "./js/AddNewTeamMember";
import Activity from "./js/Activity";
import Overview from "./js/Overview";
import Home from "./js/Home";
import MyTeams from "./js/MyTeams";
import AddNewGame from "./js/AddNewGame";
import Project from "./js/Project";
import NavBar from "./js/NavBar";

const PrivateLayout = ({ children }) => {
  return (
    <div className="App">
      <NavBar />
      {children}
    </div>
  );
};

const PrivateRouteWithNav = ({ children }) => {
  return (
    <PrivateRoute>
      <PrivateLayout>{children}</PrivateLayout>
    </PrivateRoute>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Overview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/overview"
            element={
              <PrivateRouteWithNav>
                <Overview />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/activity"
            element={
              <PrivateRouteWithNav>
                <Activity />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/my-teams"
            element={
              <PrivateRouteWithNav>
                <MyTeams />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/add-new-team-member"
            element={
              <PrivateRouteWithNav>
                <AddNewTeamMember />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/add-new-game"
            element={
              <PrivateRouteWithNav>
                <AddNewGame />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/project/:uuid"
            element={
              <PrivateRouteWithNav>
                <Project />
              </PrivateRouteWithNav>
            }
          />
          <Route
            path="/profile/user_id"
            element={
              <PrivateRouteWithNav>
                <Project />
              </PrivateRouteWithNav>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
