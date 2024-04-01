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

    </div>
  );
};

export default Dashboard;
