import React from "react";
import Header from "../../components/Header";

const Settings = () => {
  return (
    <div>
      {/* <div>
        <Header />
      </div> */}
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="poppins-bold text-color-2 text-[24px]">Settings</div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col w-full gap-2">
              <h1 className="poppins-bold text-[15px]">Account Information</h1>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Name <span className="text-red-500">*</span>
                  </span>
                </div>
                <input type="text" className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Email Address <span className="text-red-500">*</span>
                  </span>
                </div>
                <input type="email" className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Account Type <span className="text-red-500">*</span>
                  </span>
                </div>
                <select className="select select-bordered">
                  <option disabled>
                    Select Account Type
                  </option>
                  <option>User</option>
                  <option>Manager</option>
                </select>
              </label>
              <div className="flex justify-end mt-4">
              <button className="btn bg-[#273069] text-white rounded-[10px] btn-sm px-5">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card  w-full md:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col w-full gap-2">
              <h1 className="poppins-bold text-[15px]">Change My Password</h1>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Old Password <span className="text-red-500">*</span>
                  </span>
                </div>
                <input type="password" className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    New Password <span className="text-red-500">*</span>
                  </span>
                </div>
                <input type="password" className="input input-bordered w-full" />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Confirm New Password <span className="text-red-500">*</span>
                  </span>
                </div>
                <input type="password" className="input input-bordered w-full" />
              </label>
              <div className="flex justify-end mt-4">
              <button className="btn bg-[#273069] text-white rounded-[10px] btn-sm px-5">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
