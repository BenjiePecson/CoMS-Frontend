import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./user/pages/Login";
import SelectCompany from "./user/pages/user/SelectCompany";
import Dashboard from "./user/pages/company/Dashboard";
import UserLayout from "./user/pages/company/Layout";
import CompanyLayout from "./user/pages/user/Layout";
import GISTracker from "./user/pages/company/GISTracker";
import GIScreate from "./user/pages/company/GISTracker/create";
import GISview from "./user/pages/company/GISTracker/view";
import Settings from "./user/pages/user/Settings";
import Hello from "./user/pages/Hello";

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/hello" element={<Hello />} />

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route element={<CompanyLayout />}>
            <Route path="/company" element={<SelectCompany />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="company/:companyId/" element={<Dashboard />} />
            <Route
              path="company/:companyId/gis-tracker"
              element={<GISTracker />}
            />
            <Route
              path="company/:companyId/gis-tracker/create/:recordId?"
              element={<GIScreate />}
            />
            <Route
              path="company/:companyId/gis-tracker/view/:id?"
              element={<GISview />}
            />
          </Route>
          <Route path="/manager/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
