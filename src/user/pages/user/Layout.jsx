import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user/UserSlice";
import { googleLogout } from "@react-oauth/google";

const Layout = () => {
  const [active, setActive] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

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

  const companyIcon = (
    <svg
      width="23"
      height="26"
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.7981 0.115601C20.6634 0.115601 22.8156 2.34288 22.8156 6.15929V19.085C22.8156 22.964 20.6634 25.1412 16.7981 25.1412H6.31115C2.50725 25.1412 0.29248 22.964 0.29248 19.085V6.15929C0.29248 2.34288 2.50725 0.115601 6.31115 0.115601H16.7981ZM6.64899 17.3082C6.27361 17.2707 5.91074 17.4459 5.71053 17.7712C5.51033 18.084 5.51033 18.4969 5.71053 18.8223C5.91074 19.1351 6.27361 19.3228 6.64899 19.2727H16.459C16.9583 19.2227 17.3349 18.796 17.3349 18.2967C17.3349 17.7837 16.9583 17.3583 16.459 17.3082H6.64899ZM16.459 11.6011H6.64899C6.10969 11.6011 5.67299 12.0403 5.67299 12.5784C5.67299 13.1164 6.10969 13.5544 6.64899 13.5544H16.459C16.9971 13.5544 17.435 13.1164 17.435 12.5784C17.435 12.0403 16.9971 11.6011 16.459 11.6011ZM10.3891 5.93406H6.64899V5.94657C6.10969 5.94657 5.67299 6.38452 5.67299 6.92257C5.67299 7.46063 6.10969 7.89857 6.64899 7.89857H10.3891C10.9284 7.89857 11.3663 7.46063 11.3663 6.90881C11.3663 6.37201 10.9284 5.93406 10.3891 5.93406Z"
        fill="#EFF2F4"
      />
    </svg>
  );

  const settingsIcon = (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4511 0.23877C14.3974 0.23877 15.2542 0.764308 15.7273 1.5401C15.9575 1.91549 16.1109 2.37846 16.0726 2.86646C16.047 3.24185 16.1621 3.61723 16.3667 3.96759C17.0189 5.03118 18.4639 5.43159 19.5892 4.83097C20.8551 4.10523 22.4536 4.54318 23.1825 5.78195L24.0392 7.25846C24.7809 8.49723 24.3717 10.0864 23.093 10.7996C22.006 11.4377 21.6224 12.8517 22.2746 13.9278C22.4792 14.2656 22.7093 14.5534 23.0674 14.7286C23.515 14.9664 23.8602 15.3417 24.1032 15.7171C24.5763 16.4929 24.538 17.4439 24.0776 18.2823L23.1825 19.7838C22.7093 20.5846 21.827 21.0851 20.9191 21.0851C20.4715 21.0851 19.9728 20.96 19.5636 20.7097C19.2311 20.497 18.8475 20.4219 18.4383 20.4219C17.1723 20.4219 16.1109 21.4605 16.0726 22.6993C16.0726 24.1383 14.8961 25.2644 13.4256 25.2644H11.6865C10.2031 25.2644 9.02664 24.1383 9.02664 22.6993C9.00106 21.4605 7.93969 20.4219 6.67372 20.4219C6.25173 20.4219 5.86811 20.497 5.54842 20.7097C5.13922 20.96 4.62771 21.0851 4.19293 21.0851C3.27223 21.0851 2.38989 20.5846 1.91675 19.7838L1.03441 18.2823C0.561266 17.4689 0.53569 16.4929 1.00883 15.7171C1.21343 15.3417 1.59706 14.9664 2.03184 14.7286C2.38989 14.5534 2.62006 14.2656 2.83745 13.9278C3.47683 12.8517 3.0932 11.4377 2.00626 10.7996C0.740292 10.0864 0.331089 8.49723 1.05998 7.25846L1.91675 5.78195C2.65843 4.54318 4.24409 4.10523 5.52284 4.83097C6.63536 5.43159 8.08036 5.03118 8.73252 3.96759C8.93712 3.61723 9.05221 3.24185 9.02664 2.86646C9.00106 2.37846 9.14172 1.91549 9.38469 1.5401C9.85783 0.764308 10.7146 0.263795 11.6481 0.23877H13.4511ZM12.5688 9.22297C10.5611 9.22297 8.93712 10.7996 8.93712 12.7641C8.93712 14.7286 10.5611 16.2927 12.5688 16.2927C14.5764 16.2927 16.1621 14.7286 16.1621 12.7641C16.1621 10.7996 14.5764 9.22297 12.5688 9.22297Z"
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

  const usersIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
        clipRule="evenodd"
      />
      <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
    </svg>
  );

  const dashboardIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#EFF2F4"
      className="size-7"
    >
      <path
        fillRule="evenodd"
        d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const quoteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#EFF2F4"
      className="size-6"
    >
      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
    </svg>
  );

  const logout = async () => {
    // const token = localStorage.getItem("access_token").split(" ")[1];

    // let response = await axios.post("/validateToken", { token });
    // console.log(response.data);
    googleLogout();
    localStorage.removeItem("access_token");
    navigate("/login");
    return;
  };

  useEffect(() => {
    setActive(
      window.location.pathname.split("/")[1] === "" ||
        window.location.pathname.split("/")[1] === undefined
        ? "/dashboard"
        : `/${window.location.pathname.split("/")[1]}`
    );
  }, [window.location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token == null || token == undefined) {
      navigate("/login");
      alert("Session expired. Please login again.");
    } else {
      dispatch(fetchUser(token));
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <div className="flex justify-start bg-[#FFFFFF] shadow-md">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-ghost bg-[#f7f7f7] shadow-sm lg:hidden w-16 m-2"
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
              </div>
              <div className="flex flex-col min-h-screen p-5 w-full">
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

                <div className="container">
                  <div className="px-4 py-5">
                    <svg
                      width="37"
                      height="35"
                      viewBox="0 0 37 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.522949"
                        y="0.0307617"
                        width="35.8685"
                        height="34.9054"
                        rx="7.50769"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.6951 9.84751C13.1835 9.34317 13.1835 8.52548 13.6951 8.02114L17.5027 4.2676C18.0143 3.76326 18.8438 3.76326 19.3554 4.2676L23.163 8.02114C23.6746 8.52548 23.6746 9.34317 23.163 9.84751L19.3554 13.6011C18.8438 14.1054 18.0143 14.1054 17.5027 13.6011L13.6951 9.84751ZM17.7309 17.9513C17.4751 17.6991 17.4751 17.2903 17.7309 17.0381L17.9837 16.7888C18.2396 16.5366 18.6543 16.5366 18.9101 16.7888L19.163 17.0381C19.4188 17.2903 19.4188 17.6991 19.163 17.9513L18.9101 18.2006C18.6543 18.4528 18.2396 18.4528 17.9837 18.2006L17.7309 17.9513ZM22.6811 16.6008C22.1694 17.1052 22.1694 17.9228 22.6811 18.4272L26.4887 22.1807C27.0003 22.6851 27.8298 22.6851 28.3414 22.1807L32.149 18.4272C32.6606 17.9228 32.6606 17.1051 32.149 16.6008L28.3414 12.8473C27.8298 12.3429 27.0003 12.3429 26.4887 12.8473L22.6811 16.6008ZM4.76505 18.4176C4.25345 17.9132 4.25345 17.0955 4.76505 16.5912L8.57268 12.8376C9.08428 12.3333 9.91376 12.3333 10.4254 12.8376L14.233 16.5912C14.7446 17.0955 14.7446 17.9132 14.233 18.4176L10.4254 22.1711C9.91376 22.6754 9.08428 22.6754 8.57268 22.1711L4.76505 18.4176ZM13.6951 25.1195C13.1835 25.6238 13.1835 26.4415 13.6951 26.9459L17.5027 30.6994C18.0143 31.2037 18.8438 31.2037 19.3554 30.6994L23.163 26.9459C23.6746 26.4415 23.6746 25.6238 23.163 25.1195L19.3554 21.3659C18.8438 20.8616 18.0143 20.8616 17.5027 21.3659L13.6951 25.1195Z"
                        fill="#2196F3"
                      />
                    </svg>
                  </div>

                  <div className="px-4">
                    <Link
                      to="/"
                      onClick={() => {
                        setActive("/dashboard");
                      }}
                    >
                      <NavBar
                        isActive={active === "/dashboard"}
                        text="Dashboard"
                        icon={dashboardIcon}
                      />
                    </Link>

                    <Link
                      to="/company"
                      onClick={() => {
                        setActive("/company");
                      }}
                    >
                      <NavBar
                        isActive={active === "/company"}
                        text="Company"
                        icon={companyIcon}
                      />
                    </Link>

                    {/* <Link
                      to="/users-task"
                      onClick={() => {
                        setActive("/users-task");
                      }}
                    >
                      <NavBar
                        isActive={active === "/users-task"}
                        text="Users Task"
                        icon={companyIcon}
                      />
                    </Link> */}

                    {user.permissions.includes("View GIS Approval") && (
                      <Link
                        to="/gis"
                        onClick={() => {
                          setActive("/gis");
                        }}
                      >
                        <NavBar
                          isActive={active === "/gis"}
                          text="GIS"
                          icon={trackerIcon}
                        />
                      </Link>
                    )}

                    <Link
                      to="/quote"
                      onClick={() => {
                        setActive("/quote");
                      }}
                    >
                      <NavBar
                        isActive={active === "/quote"}
                        text="Quote"
                        icon={quoteIcon}
                      />
                    </Link>

                    <Link
                      to="/checklist"
                      onClick={() => {
                        setActive("/checklist");
                      }}
                    >
                      <NavBar
                        isActive={active === "/checklist"}
                        text="Checklist"
                        icon={quoteIcon}
                      />
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => {
                        setActive("/settings");
                      }}
                    >
                      <NavBar
                        isActive={active === "/settings"}
                        text="Profile Settings"
                        icon={settingsIcon}
                      />
                    </Link>

                    {(user.permissions.includes("View Users") ||
                      user.permissions.includes("View Roles") ||
                      user.permissions.includes("View Permissions")) && (
                      <li>
                        <details open>
                          <summary className="h-[45px] my-1 flex flex-row justify-between items-center text-white">
                            <div className="flex flex-row items-center gap-4">
                              {usersIcon} User Management
                            </div>
                          </summary>
                          <ul>
                            {user.permissions.includes("View Users") && (
                              <Link
                                to="/users"
                                onClick={() => {
                                  setActive("/users");
                                }}
                              >
                                <NavBar
                                  isActive={active === "/users"}
                                  text="Users"
                                />
                              </Link>
                            )}
                            {user.permissions.includes("View Roles") && (
                              <Link
                                to="/roles"
                                onClick={() => {
                                  setActive("/roles");
                                }}
                              >
                                <NavBar
                                  isActive={active === "/roles"}
                                  text="Roles"
                                />
                              </Link>
                            )}

                            {user.permissions.includes("View Permissions") && (
                              <Link
                                to="/permissions"
                                onClick={() => {
                                  setActive("/permissions");
                                }}
                              >
                                <NavBar
                                  isActive={active === "/permissions"}
                                  text="Permissions"
                                />
                              </Link>
                            )}
                          </ul>
                        </details>
                      </li>
                    )}
                  </div>
                </div>
                <div className="px-4">
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

                  <div
                    className="flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-4 bg-[#667A8A] cursor-pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
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
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
