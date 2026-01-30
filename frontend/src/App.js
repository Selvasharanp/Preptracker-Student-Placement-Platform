import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CodingPractice from "./pages/CodingPractice";
import AptitudePractice from "./pages/AptitudePractice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopNav from "./Components/TopNav";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import Learning from "./pages/Learning";
import LearningDetails from "./pages/LearningDetails";

function Layout() {
  const location = useLocation();

  // hide navbar on login/register pages
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNav && <TopNav />}   {/* ✅ navbar only once */}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/coding-practice" element={<CodingPractice />} />
        <Route path="/aptitude-practice" element={<AptitudePractice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/learning" element={<Learning />} />
      <Route path="/learning/:id" element={<LearningDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;