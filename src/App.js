import "./css/App.css";

import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import NavBar from "./js/NavBar";
import Overview from "./js/Overview";
import MyTeams from "./js/MyTeams";
import Activity from "./js/Activity";
import AddNewTeamMember from "./js/AddNewTeamMember";
import AddNewGame from "./js/AddNewGame";
import Project from "./js/Project";
import Home from "./js/Home";
import HomeNavBar from "./js/HomeNavBar";

const AppContent = () =>{
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
      <div className="App">
        {isHome ? <HomeNavBar /> : <NavBar />}
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/home" element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/my-teams" element={<MyTeams />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/add-new-team-member" element={<AddNewTeamMember />} />
          <Route path="add-new-game" element={<AddNewGame />} />
          <Route path="/project/:uuid" element={<Project />} />
        </Routes>
      </div>
  );
}


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
