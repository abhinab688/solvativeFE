import GiveRewards from "./components/GiveRewards";
import NewUser from "./components/NewUser";
import P5history from "./components/P5history";
import Rewards from "./components/Rewards";
import UserListView from "./components/UserListView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<UserListView />} />
          <Route path="/new" exact element={<NewUser />} />
          <Route path="/:id" exact element={<NewUser />} />
          <Route path="/:id/p5" exact element={<P5history />} />
          <Route path="/:id/rewards" exact element={<Rewards />} />
          <Route path="/:id/rewards/new" exact element={<GiveRewards />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
