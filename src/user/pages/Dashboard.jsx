import React, { useEffect } from "react";
import Header from "../components/Header";

const Dashboard = () => {

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="poppins-bold text-color-2 text-[24px]">Dashboard</div>
        <div className="">
          <div className="poppins-semibold text-color-2 text-[16px]">
            Company
          </div>
          <div>
            <select className="select select-bordered" name="test" id="">
              <option value="">Company A</option>
              <option value="">Company B</option>
              <option value="">Company C</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-5 mt-5">
        <div className="card w-1/4 bg-base-100 shadow-xl cursor-pointer">
          <div className="card-body">
            <div className="flex flex-col items-center gap-2">
              <h1 className="poppins-semibold text-[24px]">Draft GIS</h1>
              <svg
                viewBox="0 0 33 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-7"
              >
                <path
                  d="M32.888 21.12H20.792V33.536H12.344V21.12H0.248V13.312H12.344V0.896H20.792V13.312H32.888V21.12Z"
                  fill="#1F384C"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="card w-1/4 shadow-xl bg-[#C7C8CC]">
          <div className="card-body ">
            <div className="flex flex-col items-center gap-2">
              <h1 className="poppins-semibold text-[24px] text-[#B4B4B8]">
                Download GIS
              </h1>
              <svg
                width="36"
                height="25"
                viewBox="0 0 36 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.7999 0.200012C2.36985 0.200012 0.399902 2.03565 0.399902 4.30001V20.7C0.399902 22.9644 2.36985 24.8 4.7999 24.8H31.1999C33.63 24.8 35.5999 22.9644 35.5999 20.7V8.40001C35.5999 6.13564 33.63 4.30001 31.1999 4.30001H20.1999L15.7999 0.200012H4.7999ZM20.1999 10.45C20.1999 9.31783 19.2149 8.40001 17.9999 8.40001C16.7849 8.40001 15.7999 9.31783 15.7999 10.45V13.7009L15.1555 13.1004C14.2964 12.2999 12.9034 12.2999 12.0443 13.1004C11.1851 13.901 11.1851 15.199 12.0443 15.9996L16.4443 20.0996C17.3034 20.9002 18.6964 20.9002 19.5555 20.0996L23.9555 15.9996C24.8147 15.199 24.8147 13.901 23.9555 13.1004C23.0964 12.2999 21.7034 12.2999 20.8443 13.1004L20.1999 13.7009V10.45Z"
                  fill="#B4B4B8"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="card w-1/4 bg-base-100 shadow-xl cursor-pointer">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center gap-2 my-auto">
              <h1 className="poppins-semibold text-[24px]">Drafts</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-5">
        <div className="poppins-semibold text-[18px]">GIS Tracking</div>
        <div className="flex flex-row w-full gap-5 items-center mt-3">
          <div className="flex flex-row bg-white rounded-[14px] justify-center items-center gap-2 h-[32px]">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-5"
            >
              <circle
                cx="7.79183"
                cy="7.79165"
                r="4.95834"
                stroke="#33363F"
                strokeWidth="2"
              />
              <path
                d="M14.1665 14.1667L12.0415 12.0417"
                stroke="#33363F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input className="mr-5" type="text" placeholder="Search File" />
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Filtering</div>
            <div>
              <select
                className="select select-bordered select-xs"
                name=""
                id=""
              >
                <option value="">All</option>
              </select>
            </div>
          </div>
          <div className="badge">Done</div>
          <div className="badge">Pending</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>GIS Name</th>
              <th>Status</th>
              <th>Files</th>
              <th className="w-[10%]">View Process</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>FSGIS 2023</td>
              <td>Approved</td>
              <td></td>
              <td>
                <button>
                  <svg
                    width="54"
                    height="38"
                    viewBox="0 0 54 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="54" height="38" rx="4" fill="#273069" />
                    <path
                      d="M27.0003 20C28.1048 20 29.0003 19.1046 29.0003 18C29.0003 16.8954 28.1048 16 27.0003 16C25.8957 16 25.0003 16.8954 25.0003 18C25.0003 19.1046 25.8957 20 27.0003 20Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.458 18C18.7323 13.9429 22.5226 11 27.0002 11C31.4778 11 35.2681 13.9429 36.5424 18C35.2682 22.0571 31.4778 25 27.0002 25C22.5226 25 18.7323 22.0571 17.458 18ZM31.0003 18C31.0003 20.2091 29.2094 22 27.0003 22C24.7911 22 23.0003 20.2091 23.0003 18C23.0003 15.7909 24.7911 14 27.0003 14C29.2094 14 31.0003 15.7909 31.0003 18Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>FSGIS 2022</td>
              <td>Completed</td>
              <td>FSGIS 2022.pdf</td>
              <td>
                <button>
                  <svg
                    width="54"
                    height="38"
                    viewBox="0 0 54 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="54" height="38" rx="4" fill="#273069" />
                    <path
                      d="M27.0003 20C28.1048 20 29.0003 19.1046 29.0003 18C29.0003 16.8954 28.1048 16 27.0003 16C25.8957 16 25.0003 16.8954 25.0003 18C25.0003 19.1046 25.8957 20 27.0003 20Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.458 18C18.7323 13.9429 22.5226 11 27.0002 11C31.4778 11 35.2681 13.9429 36.5424 18C35.2682 22.0571 31.4778 25 27.0002 25C22.5226 25 18.7323 22.0571 17.458 18ZM31.0003 18C31.0003 20.2091 29.2094 22 27.0003 22C24.7911 22 23.0003 20.2091 23.0003 18C23.0003 15.7909 24.7911 14 27.0003 14C29.2094 14 31.0003 15.7909 31.0003 18Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>FSGIS 2021</td>
              <td>Completed</td>
              <td>FSGIS 2021.pdf</td>
              <td>
                <button>
                  <svg
                    width="54"
                    height="38"
                    viewBox="0 0 54 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="54" height="38" rx="4" fill="#273069" />
                    <path
                      d="M27.0003 20C28.1048 20 29.0003 19.1046 29.0003 18C29.0003 16.8954 28.1048 16 27.0003 16C25.8957 16 25.0003 16.8954 25.0003 18C25.0003 19.1046 25.8957 20 27.0003 20Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.458 18C18.7323 13.9429 22.5226 11 27.0002 11C31.4778 11 35.2681 13.9429 36.5424 18C35.2682 22.0571 31.4778 25 27.0002 25C22.5226 25 18.7323 22.0571 17.458 18ZM31.0003 18C31.0003 20.2091 29.2094 22 27.0003 22C24.7911 22 23.0003 20.2091 23.0003 18C23.0003 15.7909 24.7911 14 27.0003 14C29.2094 14 31.0003 15.7909 31.0003 18Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
