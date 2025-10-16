import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
