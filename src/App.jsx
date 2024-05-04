import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import NoticeOfMeetings from "./user/pages/company/BoardMeetings/NoticeOfMeetings";
import MinutesOfMeetings from "./user/pages/company/BoardMeetings/MinutesOfMeetings";
import BoardResolutions from "./user/pages/company/BoardMeetings/BoardResolutions";
import SecretaryCertificate from "./user/pages/company/BoardMeetings/SecretaryCertificate";
import TreasurerCertificate from "./user/pages/company/BoardMeetings/TreasurerCertificate";
import GISPage from "./user/pages/user/GISPage";
import GISPageView from "./user/pages/user/GISRecord/view";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./user/store/user/UserSlice";

// axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.baseURL = "http://192.168.88.214:3000/";
axios.defaults.baseURL = import.meta.env.VITE_VERCEL_SERVER_URL;
axios.defaults.withCredentials = true;


// http://192.168.88.214:5173/
// http://192.168.88.214:5173
// axios.defaults.headers.common["Authorization"] =
//   localStorage.getItem("accessToken");



function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

console.log(getCookie("accessToken"));

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Login />} />
          <Route element={<CompanyLayout />}>
            <Route path="/company" element={<SelectCompany />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/gis" element={<GISPage />} />
            <Route path="/gis/:recordId" element={<GISPageView />} />
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
            <Route
              path="company/:companyId/notice-of-meeting"
              element={<NoticeOfMeetings />}
            />
            <Route
              path="company/:companyId/minutes-of-meeting"
              element={<MinutesOfMeetings />}
            />
            <Route
              path="company/:companyId/board-resolution"
              element={<BoardResolutions />}
            />
            <Route
              path="company/:companyId/secretary-certificate"
              element={<SecretaryCertificate />}
            />
            <Route
              path="company/:companyId/treasurer-certificate"
              element={<TreasurerCertificate />}
            />
          </Route>
          <Route path="/manager/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
