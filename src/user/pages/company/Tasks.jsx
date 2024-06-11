import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";

const Tasks = () => {
  const { companyId } = useParams();
  const records = [];

  useEffect(() => {}, []);

  return (
    <div>
      <div></div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Tasks
          </div>
          <div>
            <label htmlFor="my_modal_6" className="btn bg-primary text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Add Task
            </label>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Add Task</h3>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Upload Service Agreement</span>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </label>
                <div>
                  <div className="overflow-x-auto">
                    <div className="flex justify-end my-2">
                      <button className="btn btn-outline btn-primary">
                        ADD ROW
                      </button>
                    </div>
                    <table className="table table-xs z-0 table-pin-rows table-pin-cols">
                      <thead>
                        <tr>
                          <td>TASK</td>
                          <td>TARGET DATE</td>
                          <td>STATUS</td>
                          <td>ASSIGNEE</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              placeholder="Type here"
                              className="input input-bordered w-full max-w-xs"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              placeholder="Type here"
                              className="input input-bordered w-full max-w-xs"
                            />
                          </td>
                          <td>
                            <select className="select select-bordered w-full max-w-xs">
                              <option disabled selected>
                                Select Task
                              </option>
                              <option>To Do</option>
                              <option>Draft</option>
                              <option>In Progress</option>
                              <option>For Review</option>
                              <option>Approved</option>
                              <option>On Hold</option>
                              <option>Done</option>
                            </select>
                          </td>
                          <td>
                            <select className="select select-bordered w-full max-w-xs">
                              <option disabled selected>
                                Select Assignee
                              </option>
                              <option>Karen</option>
                              <option>Shyne</option>
                              <option>Hazel</option>
                              <option>Christina</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="modal-action">
                  <button className="btn btn-primary">Submit</button>
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto mt-3">
          <table className="table table-xs z-0 table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <td>SERVICE AGREEMENT</td>
                <td>TASK</td>
                <td>TARGET DATE</td>
                <td>STATUS</td>
                <td>ASSIGNEE</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex flex-row" colSpan={3}>
                  Service Agreement 2024.pdf
                  <a href="#" download={true}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
                      <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
                    </svg>
                  </a>
                  <a href="#" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </td>

                <td className="w-[45%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
                <td>06/24/24</td>
                <td>
                  <select className="select select-ghost w-full max-w-xs">
                    <option>To Do</option>
                    <option>Draft</option>
                    <option>In Progress</option>
                    <option>For Review</option>
                    <option>Approved</option>
                    <option>On Hold</option>
                    <option>Done</option>
                  </select>
                </td>
                <td className="flex flex-row">
                  <button
                    className="btn btn-xs m-1"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Karen
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <div className="overflow-x-auto border">
                        <h1 className="font-bold text-xl mb-3">
                          Karen Task List
                        </h1>
                        <table className="table border">
                          {/* head */}
                          <thead>
                            <tr>
                              <th>Company</th>
                              <th>Task</th>
                              <th>Target Date</th>
                              <th>Assignee</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* row 1 */}
                            <tr>
                              <th>Fullsuite</th>
                              <td>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                              </td>
                              <td>09/24/24</td>
                              <td>Hazel</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button
                    className="btn btn-xs m-1"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Hazel
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg">Hazel Task List</h3>

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="w-[45%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
                <td>06/24/24</td>
                <td>
                  <select className="select select-ghost w-full max-w-xs">
                    <option>To Do</option>
                    <option>Draft</option>
                    <option>In Progress</option>
                    <option>For Review</option>
                    <option>Approved</option>
                    <option>On Hold</option>
                    <option>Done</option>
                  </select>
                </td>
                <td className="flex flex-row">
                  <button className="btn btn-xs m-1">Karen</button>
                  <button className="btn btn-xs m-1">Hazel</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="w-[45%]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </td>
                <td>06/24/24</td>
                <td>
                  <select className="select select-ghost w-full max-w-xs">
                    <option>To Do</option>
                    <option>Draft</option>
                    <option>In Progress</option>
                    <option>For Review</option>
                    <option>Approved</option>
                    <option>On Hold</option>
                    <option>Done</option>
                  </select>
                </td>
                <td className="flex flex-row">
                  <button className="btn btn-xs m-1">Karen</button>
                  <button className="btn btn-xs m-1">Hazel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
