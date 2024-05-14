import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/company/CompanySlice.js";

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [active, setActive] = useState("dashboard");
  const { companyId } = useParams();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const status = useSelector((state) => state.company.status);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const loading = (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    </>
  );

  const dashboardIcon = (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.96897 23.4833V19.6572C8.96897 18.6806 9.76653 17.8888 10.7504 17.8888H14.3468C14.8192 17.8888 15.2723 18.0751 15.6064 18.4068C15.9405 18.7384 16.1282 19.1882 16.1282 19.6572V23.4833C16.1252 23.8894 16.2856 24.2798 16.5738 24.568C16.8619 24.8561 17.254 25.0182 17.6631 25.0182H20.1167C21.2626 25.0212 22.3627 24.5713 23.174 23.7679C23.9854 22.9646 24.4413 21.8737 24.4413 20.7361V9.83623C24.4413 8.91729 24.031 8.04562 23.321 7.45605L14.9742 0.838272C13.5222 -0.322051 11.4419 -0.284587 10.0333 0.92725L1.877 7.45605C1.1334 8.02824 0.688955 8.90249 0.666992 9.83623V20.725C0.666992 23.0961 2.6032 25.0182 4.99164 25.0182H7.38924C8.23878 25.0182 8.9292 24.3378 8.93536 23.4944L8.96897 23.4833Z"
        fill="#EFF2F4"
      />
    </svg>
  );

  const trackerIcon = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3914 0.06704C20.1914 -0.045459 21.9664 0.579535 23.3039 1.80452C24.5289 3.14201 25.1539 4.917 25.0539 6.72948V18.4044C25.1664 20.2169 24.5289 21.9918 23.3164 23.3293C21.9789 24.5543 20.1914 25.1793 18.3914 25.0668H6.71644C4.90394 25.1793 3.12895 24.5543 1.79145 23.3293C0.566448 21.9918 -0.0585518 20.2169 0.053948 18.4044V6.72948C-0.0585518 4.917 0.566448 3.14201 1.79145 1.80452C3.12895 0.579535 4.90394 -0.045459 6.71644 0.06704H18.3914ZM18.0664 5.77949C17.2914 5.0045 16.0414 5.0045 15.2664 5.77949L14.4289 6.62948C14.3039 6.75448 14.3039 6.96698 14.4289 7.09198C14.4289 7.09198 14.4535 7.11636 14.4971 7.15977L14.8046 7.46556C14.9825 7.64251 15.2045 7.8635 15.4274 8.08572L16.1833 8.84124C16.341 8.99968 16.4456 9.10585 16.4539 9.11696C16.5914 9.26696 16.6789 9.46696 16.6789 9.69195C16.6789 10.1419 16.3164 10.5169 15.8539 10.5169C15.6414 10.5169 15.4414 10.4294 15.3039 10.2919L13.2164 8.21697C13.1164 8.11697 12.9414 8.11697 12.8414 8.21697L6.87894 14.1794C6.46644 14.5919 6.22894 15.1419 6.21644 15.7294L6.14144 18.6919C6.14144 18.8544 6.19144 19.0044 6.30394 19.1169C6.41644 19.2294 6.56644 19.2919 6.72894 19.2919H9.66644C10.2664 19.2919 10.8414 19.0544 11.2789 18.6294L19.6914 10.1919C20.4539 9.41696 20.4539 8.16697 19.6914 7.40447L18.0664 5.77949Z"
        fill="white"
      />
    </svg>
  );

  const meetingIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
    </svg>
  );

  const lightMode = (
    <>
      <svg
        className="fill-white w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>
      <span className="poppins-regular text-[15px]">Light Mode</span>
    </>
  );

  const darkMode = (
    <>
      <svg
        width="27"
        height="31"
        viewBox="0 0 27 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.1497 30.8923C19.7811 30.8923 24.011 28.7851 26.8134 25.3324C27.228 24.8216 26.7759 24.0754 26.1352 24.1974C18.8502 25.5848 12.1603 19.9992 12.1603 12.6453C12.1603 8.40921 14.4279 4.51383 18.1135 2.41642C18.6816 2.09312 18.5387 1.23179 17.8932 1.11255C16.9882 0.945675 16.0699 0.861648 15.1497 0.861511C6.86134 0.861511 0.134277 7.57802 0.134277 15.8769C0.134277 24.1652 6.85079 30.8923 15.1497 30.8923Z"
          fill="#EFF2F4"
        />
      </svg>
      <span className="poppins-regular text-[15px]">Dark Mode</span>
    </>
  );

  const arrowBack = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const content = (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col w-full min-h-screen">
          <div className="flex w-full justify-between items-center bg-[#FFFFFF] shadow-md">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost bg-[#f7f7f7] lg:hidden shadow-sm w-16 m-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <div className="w-full flex-col justify-center items-center text-center">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="" className="btn btn-ghost m-2">
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <img
                      className="w-12 aspect-square object-contain rounded-full border p-2"
                      src={selectedCompany.logo}
                      alt=""
                    />
                    <h1 className="poppins-bold text-[15px]">
                      {selectedCompany.companyName}
                    </h1>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-white border"
                >
                  <div className="card-body flex flex-col gap-5 text-center justify-center items-center">
                    <img
                      className="w-24 aspect-square object-contain rounded-full border p-2"
                      src={selectedCompany.logo}
                      alt=""
                    />
                    <h1 className="poppins-bold text-[20px]">
                      {selectedCompany.companyName}
                    </h1>
                    <p className="poppins-medium text-[15px]">
                      {selectedCompany.secNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pt-5 px-2 md:px-5 min-h-screen">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu m-0 p-0 w-80 min-h-full bg-[#031C30] pt-4 text-base-content flex flex-col justify-between">
            {/* Sidebar content here */}

            <div className="flex flex-col divide-y-[.1px] gap-4">
              <div className="px-4">
                <Link to={"/company"}>
                  <button className="btn btn-sm btn-ghost flex flex-row gap-2 items-center text-white">
                    {arrowBack} Back
                  </button>
                </Link>
              </div>

              {/* <div className="">
                <svg
                  width="37"
                  height="35"
                  viewBox="0 0 37 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.522949"
                    y="0.0307693"
                    width="35.8685"
                    height="34.9054"
                    rx="7.50769"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.6951 9.8475C13.1835 9.34316 13.1835 8.52546 13.6951 8.02112L17.5027 4.26758C18.0143 3.76324 18.8438 3.76324 19.3554 4.26758L23.163 8.02112C23.6746 8.52546 23.6746 9.34316 23.163 9.8475L19.3554 13.601C18.8438 14.1054 18.0143 14.1054 17.5027 13.601L13.6951 9.8475ZM17.7309 17.9513C17.4751 17.6991 17.4751 17.2902 17.7309 17.0381L17.9837 16.7888C18.2396 16.5366 18.6543 16.5366 18.9101 16.7888L19.163 17.0381C19.4188 17.2902 19.4188 17.6991 19.163 17.9513L18.9101 18.2006C18.6543 18.4527 18.2396 18.4527 17.9837 18.2006L17.7309 17.9513ZM22.6811 16.6008C22.1694 17.1051 22.1694 17.9228 22.6811 18.4272L26.4887 22.1807C27.0003 22.6851 27.8298 22.6851 28.3414 22.1807L32.149 18.4272C32.6606 17.9228 32.6606 17.1051 32.149 16.6008L28.3414 12.8473C27.8298 12.3429 27.0003 12.3429 26.4887 12.8473L22.6811 16.6008ZM4.76505 18.4175C4.25345 17.9132 4.25345 17.0955 4.76505 16.5912L8.57268 12.8376C9.08428 12.3333 9.91376 12.3333 10.4254 12.8376L14.233 16.5912C14.7446 17.0955 14.7446 17.9132 14.233 18.4175L10.4254 22.1711C9.91376 22.6754 9.08428 22.6754 8.57268 22.1711L4.76505 18.4175ZM13.6951 25.1194C13.1835 25.6238 13.1835 26.4415 13.6951 26.9458L17.5027 30.6994C18.0143 31.2037 18.8438 31.2037 19.3554 30.6994L23.163 26.9458C23.6746 26.4415 23.6746 25.6238 23.163 25.1194L19.3554 21.3659C18.8438 20.8616 18.0143 20.8616 17.5027 21.3659L13.6951 25.1194Z"
                    fill="#2196F3"
                  />
                </svg>
              </div> */}
              <div className="px-4">
                {/* <Link
                  to={`/company/${companyId}/`}
                  onClick={() => {
                    setActive("dashboard");
                  }}
                >
                  <NavBar
                    isActive={active === "dashboard"}
                    text="Dashboard"
                    icon={dashboardIcon}
                  />
                </Link>

                <Link
                  to={`/company/${companyId}/gis-tracker`}
                  onClick={() => {
                    setActive("gis-tracker");
                  }}
                >
                  <NavBar
                    isActive={active === "gis-tracker"}
                    text="GIS Tracker"
                    icon={trackerIcon}
                  />
                </Link>

                <NavBar
                  isActive={false}
                  text="Board Meetings"
                  icon={trackerIcon}
                /> */}

                <div>
                  <ul className="menu w-full rounded-box text-white">
                    <Link
                      className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                        active === "dashboard" ? "bg-[#667A8A]" : ""
                      } ${
                        active === "dashboard"
                          ? "poppins-semibold"
                          : "poppins-regular"
                      } text-white`}
                      to={`/company/${companyId}/`}
                      onClick={() => {
                        setActive("dashboard");
                      }}
                    >
                      <div className="flex flex-row px-4 items-center">
                        <div className="pr-4">{dashboardIcon}</div>
                        <div className="text-white">Dashboard</div>
                      </div>
                    </Link>

                    <Link
                      className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                        active === "gis-tracker" ? "bg-[#667A8A]" : ""
                      } ${
                        active === "gis-tracker"
                          ? "poppins-semibold"
                          : "poppins-regular"
                      } text-white`}
                      to={`/company/${companyId}/gis-tracker`}
                      onClick={() => {
                        setActive("gis-tracker");
                      }}
                    >
                      <div className="flex flex-row px-4 items-center">
                        <div className="pr-4">{trackerIcon}</div>
                        <h1 className="text-white">GIS Tracker</h1>
                      </div>
                    </Link>
                    <li>
                      <details open>
                        <summary className="h-[45px] my-1 flex flex-row justify-between items-center">
                          <div className="flex flex-row items-center gap-4">
                            {meetingIcon} Board Meetings
                          </div>
                        </summary>
                        <ul>
                          <Link
                            className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                              active === "notice-of-meeting"
                                ? "bg-[#667A8A]"
                                : ""
                            } ${
                              active === "notice-of-meeting"
                                ? "poppins-semibold"
                                : "poppins-regular"
                            } text-white`}
                            to={`/company/${companyId}/notice-of-meeting`}
                            onClick={() => {
                              setActive("notice-of-meeting");
                            }}
                          >
                            <div className="flex flex-row px-4 items-center">
                              <h1 className="text-white">Notice of Meeting</h1>
                            </div>
                          </Link>
                          <Link
                            className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                              active === "minutes-of-meeting"
                                ? "bg-[#667A8A]"
                                : ""
                            } ${
                              active === "minutes-of-meeting"
                                ? "poppins-semibold"
                                : "poppins-regular"
                            } text-white`}
                            to={`/company/${companyId}/minutes-of-meeting`}
                            onClick={() => {
                              setActive("minutes-of-meeting");
                            }}
                          >
                            <div className="flex flex-row px-4 items-center">
                              <h1 className="text-white">Minutes of Meeting</h1>
                            </div>
                          </Link>
                          <Link
                            className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                              active === "board-resolution"
                                ? "bg-[#667A8A]"
                                : ""
                            } ${
                              active === "board-resolution"
                                ? "poppins-semibold"
                                : "poppins-regular"
                            } text-white`}
                            to={`/company/${companyId}/board-resolution`}
                            onClick={() => {
                              setActive("board-resolution");
                            }}
                          >
                            <div className="flex flex-row px-4 items-center">
                              <h1 className="text-white">Board Resolutions</h1>
                            </div>
                          </Link>
                          <Link
                            className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                              active === "secretary-certificate"
                                ? "bg-[#667A8A]"
                                : ""
                            } ${
                              active === "secretary-certificate"
                                ? "poppins-semibold"
                                : "poppins-regular"
                            } text-white`}
                            to={`/company/${companyId}/secretary-certificate`}
                            onClick={() => {
                              setActive("secretary-certificate");
                            }}
                          >
                            <div className="flex flex-row px-4 items-center">
                              <h1 className="text-white">
                                Secretary Certificate
                              </h1>
                            </div>
                          </Link>
                          <Link
                            className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-1 ${
                              active === "treasurer-certificate"
                                ? "bg-[#667A8A]"
                                : ""
                            } ${
                              active === "treasurer-certificate"
                                ? "poppins-semibold"
                                : "poppins-regular"
                            } text-white`}
                            to={`/company/${companyId}/treasurer-certificate`}
                            onClick={() => {
                              setActive("treasurer-certificate");
                            }}
                          >
                            <div className="flex flex-row px-4 items-center">
                              <h1 className="text-white">
                                Treasurer Certificate
                              </h1>
                            </div>
                          </Link>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <div className="px-4">
              <div className="flex flex-row text-white justify-between items-center">
                <div className="flex flex-row items-center gap-5">
                  {lightMode}
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="toggle"
                    onChange={() => {
                      setIsDarkMode(!isDarkMode);
                    }}
                    value={isDarkMode}
                  />
                </div>
              </div>

              <div className="flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-4 bg-[#667A8A]">
                <div className="px-5">
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9191 0.933289C15.0255 0.933289 17.559 3.42334 17.559 6.48898V12.4826H9.92032C9.37289 12.4826 8.94003 12.9081 8.94003 13.4461C8.94003 13.9716 9.37289 14.4096 9.92032 14.4096H17.559V20.3907C17.559 23.4564 15.0255 25.9589 11.8936 25.9589H5.69361C2.5745 25.9589 0.0410156 23.4689 0.0410156 20.4032V6.50149C0.0410156 3.42334 2.58723 0.933289 5.70634 0.933289H11.9191ZM20.7375 9.12944C21.1129 8.74154 21.726 8.74154 22.1014 9.11692L25.7551 12.7582C25.9428 12.9458 26.0429 13.1836 26.0429 13.4464C26.0429 13.6966 25.9428 13.9469 25.7551 14.1221L22.1014 17.7633C21.9137 17.951 21.6634 18.0511 21.4257 18.0511C21.1754 18.0511 20.9252 17.951 20.7375 17.7633C20.3621 17.3879 20.3621 16.7748 20.7375 16.3994L22.7395 14.4098H17.5592V12.4829H22.7395L20.7375 10.4933C20.3621 10.1179 20.3621 9.50482 20.7375 9.12944Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={"poppins-semibold text-white"}>Logout</div>
              </div>
            </div> */}
          </ul>
        </div>
      </div>
      {/* <div className="min-h-screen flex flex-row text-[15px]">
        <div className="w-1/4 bg-[#031C30] min-h-screen max-h-screen px-5 py-[30px] flex flex-col justify-between">
          <div className="">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go back
              </button>
            </div>
            <div className="">
              <svg
                width="37"
                height="35"
                viewBox="0 0 37 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.522949"
                  y="0.0307693"
                  width="35.8685"
                  height="34.9054"
                  rx="7.50769"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6951 9.8475C13.1835 9.34316 13.1835 8.52546 13.6951 8.02112L17.5027 4.26758C18.0143 3.76324 18.8438 3.76324 19.3554 4.26758L23.163 8.02112C23.6746 8.52546 23.6746 9.34316 23.163 9.8475L19.3554 13.601C18.8438 14.1054 18.0143 14.1054 17.5027 13.601L13.6951 9.8475ZM17.7309 17.9513C17.4751 17.6991 17.4751 17.2902 17.7309 17.0381L17.9837 16.7888C18.2396 16.5366 18.6543 16.5366 18.9101 16.7888L19.163 17.0381C19.4188 17.2902 19.4188 17.6991 19.163 17.9513L18.9101 18.2006C18.6543 18.4527 18.2396 18.4527 17.9837 18.2006L17.7309 17.9513ZM22.6811 16.6008C22.1694 17.1051 22.1694 17.9228 22.6811 18.4272L26.4887 22.1807C27.0003 22.6851 27.8298 22.6851 28.3414 22.1807L32.149 18.4272C32.6606 17.9228 32.6606 17.1051 32.149 16.6008L28.3414 12.8473C27.8298 12.3429 27.0003 12.3429 26.4887 12.8473L22.6811 16.6008ZM4.76505 18.4175C4.25345 17.9132 4.25345 17.0955 4.76505 16.5912L8.57268 12.8376C9.08428 12.3333 9.91376 12.3333 10.4254 12.8376L14.233 16.5912C14.7446 17.0955 14.7446 17.9132 14.233 18.4175L10.4254 22.1711C9.91376 22.6754 9.08428 22.6754 8.57268 22.1711L4.76505 18.4175ZM13.6951 25.1194C13.1835 25.6238 13.1835 26.4415 13.6951 26.9458L17.5027 30.6994C18.0143 31.2037 18.8438 31.2037 19.3554 30.6994L23.163 26.9458C23.6746 26.4415 23.6746 25.6238 23.163 25.1194L19.3554 21.3659C18.8438 20.8616 18.0143 20.8616 17.5027 21.3659L13.6951 25.1194Z"
                  fill="#2196F3"
                />
              </svg>
            </div>
            <div className="mt-10">
              <Link
                to="/user/"
                onClick={() => {
                  setActive("dashboard");
                }}
              >
                <NavBar
                  isActive={active === "dashboard"}
                  text="Dashboard"
                  icon={dashboardIcon}
                />
              </Link>

              <Link
                to="/user/gis-tracker"
                onClick={() => {
                  setActive("gis-tracker");
                }}
              >
                <NavBar
                  isActive={active === "gis-tracker"}
                  text="GIS Tracker"
                  icon={trackerIcon}
                />
              </Link>
            </div>
          </div>
          <div className="">
            <div className="flex flex-row text-white justify-between items-center">
              <div className="flex flex-row items-center gap-5">
                {isDarkMode ? darkMode : lightMode}
              </div>
              <div>
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={() => {
                    setIsDarkMode(!isDarkMode);
                  }}
                  value={isDarkMode}
                />
              </div>
            </div>

            <div className="flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-4 bg-[#667A8A]">
              <div className="px-5">
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9191 0.933289C15.0255 0.933289 17.559 3.42334 17.559 6.48898V12.4826H9.92032C9.37289 12.4826 8.94003 12.9081 8.94003 13.4461C8.94003 13.9716 9.37289 14.4096 9.92032 14.4096H17.559V20.3907C17.559 23.4564 15.0255 25.9589 11.8936 25.9589H5.69361C2.5745 25.9589 0.0410156 23.4689 0.0410156 20.4032V6.50149C0.0410156 3.42334 2.58723 0.933289 5.70634 0.933289H11.9191ZM20.7375 9.12944C21.1129 8.74154 21.726 8.74154 22.1014 9.11692L25.7551 12.7582C25.9428 12.9458 26.0429 13.1836 26.0429 13.4464C26.0429 13.6966 25.9428 13.9469 25.7551 14.1221L22.1014 17.7633C21.9137 17.951 21.6634 18.0511 21.4257 18.0511C21.1754 18.0511 20.9252 17.951 20.7375 17.7633C20.3621 17.3879 20.3621 16.7748 20.7375 16.3994L22.7395 14.4098H17.5592V12.4829H22.7395L20.7375 10.4933C20.3621 10.1179 20.3621 9.50482 20.7375 9.12944Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={"poppins-semibold text-white"}>Logout</div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );

  const companyNotFound = (
    <>
      <div>Company not found.</div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
    </>
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token == null || token == undefined) {
      alert("Session expired. Please login again.");

      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCompany(companyId));
  }, []);

  useEffect(() => {
    setActive(
      window.location.pathname.split("/")[3] === "" ||
        window.location.pathname.split("/")[3] === undefined
        ? "dashboard"
        : window.location.pathname.split("/")[3]
    );
  }, [window.location.pathname]);

  return (
    <>
      {content}
      {/* {status === "pending"
        ? loading
        : status === "rejected"
        ? companyNotFound
        : content} */}
    </>
  );
};

export default Layout;
