import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./user/pages/Login";
import SelectCompany from "./user/pages/SelectCompany";
import Dashboard from "./user/pages/Dashboard";
import Layout from "./user/pages/Layout";
import GISTracker from "./user/pages/GISTracker";
import GIScreate from "./user/pages/GISTracker/create";
import GISview from "./user/pages/GISTracker/view";

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/company" element={<SelectCompany />} />
          <Route element={<Layout />}>
            <Route path="/user/:company" element={<Dashboard />} />
            <Route path="/user/gis-tracker" element={<GISTracker />} />
            <Route path="/user/gis-tracker/create" element={<GIScreate />} />
            <Route path="/user/gis-tracker/view/:id" element={<GISview />} />
          </Route>
          <Route path="/manager/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
