import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogList from "./pages/BlogList";
import SeeBlog from "./pages/SeeBlog";
import EditBlog from "./pages/EditBlog";
import AboutMe from "./pages/AboutMe";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./pages/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<SeeBlog />} />
        <Route path="/about" element={<AboutMe />} />

        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/edit-blog/:id"
          element={<PrivateRoute element={<EditBlog />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
