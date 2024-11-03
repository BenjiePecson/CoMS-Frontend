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
import NotFound from "./user/pages/NotFound";
import Unathorized from "./user/components/Unathorized";
import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Tasks from "./user/pages/company/Tasks";
import UsersPage from "./user/pages/user/UsersPage";
import RolesPage from "./user/pages/user/RolesPage";
import PermissionsPage from "./user/pages/user/PermissionsPage";
import UserDashboard from "./user/pages/user/UserDashboard";
import CompanySetting from "./user/pages/company/CompanySetting";
import CreateNOM from "./user/pages/company/BoardMeetings/NoticeOfMeetings/CreateNOMPage";
import ViewNOMPage from "./user/pages/company/BoardMeetings/NoticeOfMeetings/ViewNOMPage";
import AddSecCert from "./user/pages/company/BoardMeetings/SecretaryCertificate/AddSecCert";
import ViewSecCert from "./user/pages/company/BoardMeetings/SecretaryCertificate/ViewSecCert";
import MainDashboard from "./user/pages/user/MainDashboard";

import BusinessRenewal from "./user/pages/company/BusinessRenewal";
import Quote from "./user/pages/user/Quote";

import MC28Form from "./user/pages/company/MC28Form";
import ViewMC28Form from "./user/pages/company/MC28Form/view";
import DocumentDrafting from "./user/pages/company/DocumentDrafting";
import ViewDocumentDrafting from "./user/pages/company/DocumentDrafting/view";


// axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.baseURL = "http://192.168.88.214:3000/";
const baseUrl =
  import.meta.env.VITE_VERCEL_ENVIRONMENT !== "development"
    ? import.meta.env.VITE_VERCEL_SERVER_URL
    : import.meta.env.VITE_VERCEL_LOCALHOST_SERVER_URL;
axios.defaults.baseURL = baseUrl;

// // http://192.168.88.214:5173/
// // http://192.168.88.214:5173
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("access_token");

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* <Route path="/" element={<Login />} /> */}

          <Route element={<CompanyLayout />}>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/company" element={<SelectCompany />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users-task" element={<UserDashboard />} />
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/permissions" element={<PermissionsPage />} />
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
            <Route path="company/:companyId/MC28Form" element={<MC28Form />} />
            <Route
              path="company/:companyId/mc28form/view/:form_id?"
              element={<ViewMC28Form />}
            />
            <Route
              path="company/:companyId/document-drafting"
              element={<DocumentDrafting />}
            />
            <Route
              path="company/:companyId/document-drafting/view/:document_id?"
              element={<ViewDocumentDrafting />}
            />
            <Route
              path="company/:companyId/gis-tracker/create/:recordId?"
              element={<GIScreate />}
            />
            <Route
              path="company/:companyId/gis-tracker/view/:recordId?"
              element={<GISview />}
            />
            <Route
              path="company/:companyId/notice-of-meeting"
              element={<NoticeOfMeetings />}
            />
            <Route
              path="company/:companyId/notice-of-meeting/create"
              element={<CreateNOM />}
            />
            <Route
              path="company/:companyId/notice-of-meeting/view/:nomId?"
              element={<ViewNOMPage />}
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
              path="company/:companyId/secretary-certificate/create"
              element={<AddSecCert />}
            />
            <Route
              path="company/:companyId/secretary-certificate/view/:seccert_id"
              element={<ViewSecCert />}
            />
            <Route
              path="company/:companyId/treasurer-certificate"
              element={<TreasurerCertificate />}
            />

            <Route path="company/:companyId/tasks" element={<Tasks />} />
            <Route
              path="company/:companyId/businessRenewalPermit"
              element={<BusinessRenewal />}
            />
            <Route
              path="company/:companyId/settings"
              element={<CompanySetting />}
            />
          </Route>
          <Route path="/manager/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
