import "./css/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./js/NavBar";
import Overview from "./js/Overview";
import MyTeams from "./js/MyTeams";
import Activity from "./js/Activity";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/my-teams" element={<MyTeams />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
