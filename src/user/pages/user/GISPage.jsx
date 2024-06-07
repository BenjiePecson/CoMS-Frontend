import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords } from "../../store/GIS/GISRecordSlice";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const GISPage = () => {
  // const companyRecords = useSelector((state) => state.records.records);
  const recordState = useSelector((state) => state.records.record);

  const dispatch = useDispatch();

  const [companyRecords, setCompanyRecords] = useState([]);

  const alert = () => {
    Swal.fire({
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const toggleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CF0404",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#B4B4B8",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "The record has been deleted successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    setCompanyRecords([...companyRecords, recordState, recordState]);
  }, []);

  return (
    <>
      <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            { goto: "/gis", text: "GIS" },
          ]}
        />
      </div>
      <div>
        {/* <div>
          <Header />
        </div> */}
        <div className="flex flex-row w-full justify-between items-center">
          <div className="poppins-bold text-color-2 text-[24px]">GIS</div>
          <div></div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th className="w-[10%]">Link to Record</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>October 2, 2024</th>
                  <td>Offshore Concept BPO Services Inc.</td>
                  <td>
                    <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                      Pending for Approval
                    </div>
                  </td>
                  <td className="flex flex-row justify-center items-center gap-2">
                    <Link to={`/gis/${1}`}>
                      <svg
                        width="43"
                        height="37"
                        viewBox="0 0 43 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="42.24"
                          height="37"
                          rx="10"
                          fill="#273069"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                          fill="#F7F7F7"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>October 2, 2024</th>
                  <td>CloudEats Ph, Inc.</td>
                  <td>
                    <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                      Pending for Approval
                    </div>
                  </td>
                  <td className="flex flex-row justify-center items-center gap-2">
                    <Link to={`/gis/${2}`}>
                      <svg
                        width="43"
                        height="37"
                        viewBox="0 0 43 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="42.24"
                          height="37"
                          rx="10"
                          fill="#273069"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                          fill="#F7F7F7"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>October 2, 2024</th>
                  <td>Teetalk.PH, Inc.</td>
                  <td>
                    <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                      Pending for Approval
                    </div>
                  </td>
                  <td className="flex flex-row justify-center items-center gap-2">
                    <Link to={`/gis/${3}`}>
                      <svg
                        width="43"
                        height="37"
                        viewBox="0 0 43 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="42.24"
                          height="37"
                          rx="10"
                          fill="#273069"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                          fill="#F7F7F7"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <dialog id="addModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>

        <dialog id="editModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default GISPage;
