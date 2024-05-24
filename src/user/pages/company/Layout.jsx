import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/company/CompanySlice.js";
import { fetchUser } from "../../store/user/UserSlice.js";

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
    <div className="flex flex-col w-full h-screen items-center justify-center gap-10">
      <div className="flex flex-col mx-auto gap-5">
        <svg
          className="w-[100%]"
          viewBox="0 0 364 355"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1345_14028)">
            <path
              d="M231.082 79.8384H133C130.765 79.8411 128.622 80.7294 127.042 82.3085C125.461 83.8876 124.572 86.0285 124.569 88.2617V306.061L123.445 306.403L99.3842 313.765C98.2438 314.112 97.0122 313.994 95.9595 313.435C94.9068 312.875 94.1192 311.922 93.7695 310.783L22.1986 77.2047C21.8503 76.0653 21.9691 74.8344 22.5287 73.7825C23.0883 72.7306 24.0431 71.9437 25.1831 71.5947L62.2613 60.2513L169.752 27.3779L206.83 16.0345C207.394 15.861 207.987 15.8004 208.575 15.8561C209.163 15.9118 209.734 16.0828 210.255 16.3593C210.777 16.6357 211.239 17.0122 211.614 17.4672C211.99 17.9221 212.272 18.4467 212.445 19.0108L230.739 78.7152L231.082 79.8384Z"
              fill="#F2F2F2"
            />
            <path
              d="M252.484 78.7151L230.435 6.75747C230.069 5.55853 229.469 4.44355 228.671 3.47626C227.872 2.50897 226.891 1.70832 225.783 1.12007C224.675 0.531819 223.462 0.167485 222.213 0.0479027C220.963 -0.0716796 219.703 0.0558329 218.503 0.423141L166.374 16.3657L58.8886 49.2447L6.75905 65.1928C4.33739 65.9358 2.3097 67.6084 1.12105 69.8435C-0.0675936 72.0787 -0.320078 74.6937 0.419028 77.1146L75.7779 323.036C76.3783 324.99 77.5898 326.701 79.2346 327.917C80.8794 329.133 82.8709 329.79 84.9169 329.792C85.8639 329.792 86.8055 329.65 87.7101 329.371L123.445 318.443L124.569 318.095V316.921L123.445 317.263L87.3786 328.298C85.241 328.949 82.9323 328.726 80.9588 327.679C78.9853 326.631 77.5082 324.845 76.8515 322.71L1.49838 76.7833C1.17301 75.7259 1.05961 74.6147 1.16467 73.5134C1.26973 72.4121 1.59118 71.3423 2.11063 70.3653C2.63008 69.3883 3.33733 68.5233 4.19186 67.8197C5.04639 67.1162 6.03142 66.588 7.09055 66.2654L59.2201 50.3173L166.706 17.4439L218.835 1.49572C219.638 1.25077 220.474 1.12587 221.314 1.12509C223.116 1.12914 224.87 1.70976 226.318 2.78192C227.767 3.85407 228.833 5.36142 229.362 7.08319L251.31 78.7151L251.658 79.8382H252.828L252.484 78.7151Z"
              fill="#3F3D56"
            />
            <path
              d="M68.9519 71.7783C67.8686 71.7775 66.8141 71.4299 65.943 70.7865C65.072 70.143 64.4302 69.2376 64.1119 68.203L56.8726 44.5774C56.6781 43.9428 56.6106 43.2761 56.674 42.6154C56.7373 41.9547 56.9304 41.313 57.242 40.7269C57.5537 40.1407 57.9778 39.6217 58.4903 39.1993C59.0028 38.777 59.5935 38.4596 60.2287 38.2654L159.114 8.018C160.397 7.6269 161.783 7.76028 162.967 8.38889C164.152 9.01749 165.038 10.0899 165.432 11.3709L172.671 34.9967C173.062 36.2784 172.929 37.6628 172.3 38.8462C171.671 40.0295 170.597 40.9153 169.315 41.309L70.4297 71.5565C69.9509 71.7033 69.4528 71.7781 68.9519 71.7783Z"
              fill="#273069"
            />
            <path
              d="M106.875 25.2445C113.083 25.2445 118.116 20.2162 118.116 14.0134C118.116 7.81068 113.083 2.78235 106.875 2.78235C100.667 2.78235 95.6338 7.81068 95.6338 14.0134C95.6338 20.2162 100.667 25.2445 106.875 25.2445Z"
              fill="#273069"
            />
            <path
              d="M106.874 21.1252C110.806 21.1252 113.992 17.9411 113.992 14.0134C113.992 10.0856 110.806 6.90149 106.874 6.90149C102.943 6.90149 99.7563 10.0856 99.7563 14.0134C99.7563 17.9411 102.943 21.1252 106.874 21.1252Z"
              fill="white"
            />
            <path
              d="M338.708 326.922H148.737C147.471 326.921 146.256 326.417 145.361 325.523C144.465 324.628 143.961 323.415 143.96 322.149V94.7195C143.961 93.454 144.465 92.2407 145.361 91.3459C146.256 90.451 147.471 89.9477 148.737 89.9463H338.708C339.975 89.9477 341.189 90.4511 342.085 91.3459C342.98 92.2408 343.484 93.454 343.486 94.7195V322.149C343.484 323.415 342.98 324.628 342.085 325.523C341.189 326.417 339.975 326.921 338.708 326.922Z"
              fill="#E6E6E6"
            />
            <path
              d="M251.31 78.7152H133C130.467 78.7188 128.039 79.7257 126.248 81.5153C124.457 83.3048 123.449 85.7309 123.445 88.2616V317.264L124.569 316.921V88.2616C124.572 86.0285 125.461 83.8875 127.042 82.3085C128.622 80.7294 130.765 79.841 133 79.8383H251.659L251.31 78.7152ZM354.445 78.7152H133C130.467 78.7188 128.039 79.7257 126.248 81.5153C124.457 83.3048 123.449 85.7309 123.445 88.2616V345.454C123.449 347.984 124.457 350.41 126.248 352.2C128.039 353.989 130.467 354.996 133 355H354.445C356.978 354.996 359.407 353.989 361.198 352.2C362.989 350.41 363.997 347.984 364 345.454V88.2616C363.997 85.7309 362.989 83.3048 361.198 81.5153C359.407 79.7257 356.978 78.7188 354.445 78.7152ZM362.876 345.454C362.873 347.687 361.984 349.828 360.404 351.407C358.823 352.986 356.68 353.874 354.445 353.877H133C130.765 353.874 128.622 352.986 127.042 351.407C125.461 349.828 124.572 347.687 124.569 345.454V88.2616C124.572 86.0285 125.461 83.8875 127.042 82.3085C128.622 80.7294 130.765 79.841 133 79.8383H354.445C356.68 79.841 358.823 80.7294 360.404 82.3085C361.984 83.8875 362.873 86.0285 362.876 88.2616V345.454Z"
              fill="#3F3D56"
            />
            <path
              d="M295.431 103.424H192.014C190.673 103.422 189.388 102.889 188.439 101.942C187.491 100.994 186.958 99.7096 186.956 98.3697V73.6613C186.958 72.3214 187.491 71.0367 188.439 70.0892C189.388 69.1418 190.673 68.6088 192.014 68.6073H295.431C296.772 68.6088 298.057 69.1418 299.006 70.0892C299.954 71.0367 300.487 72.3214 300.489 73.6613V98.3697C300.487 99.7096 299.954 100.994 299.006 101.942C298.057 102.889 296.772 103.422 295.431 103.424Z"
              fill="#273069"
            />
            <path
              d="M243.723 70.2919C249.931 70.2919 254.964 65.2636 254.964 59.0608C254.964 52.858 249.931 47.8297 243.723 47.8297C237.515 47.8297 232.482 52.858 232.482 59.0608C232.482 65.2636 237.515 70.2919 243.723 70.2919Z"
              fill="#273069"
            />
            <path
              d="M243.723 65.9017C247.504 65.9017 250.569 62.8389 250.569 59.0609C250.569 55.2828 247.504 52.2201 243.723 52.2201C239.941 52.2201 236.876 55.2828 236.876 59.0609C236.876 62.8389 239.941 65.9017 243.723 65.9017Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1345_14028">
              <rect width="364" height="355" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h1 className="text-center">Invalid Company ID</h1>
      </div>
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
    </div>
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token == null || token == undefined) {
      alert("Session expired. Please login again.");

      navigate("/login");
    } else {
      dispatch(fetchUser(token));
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
      {/* {content} */}
      {status === "pending"
        ? loading
        : status === "rejected"
        ? companyNotFound
        : content}
    </>
  );
};

export default Layout;
