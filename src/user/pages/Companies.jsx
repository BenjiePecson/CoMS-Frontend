import React from "react";
import Header from "../components/Header";
import Swal from "sweetalert2";

const Companies = () => {
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

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="poppins-bold text-color-2 text-[24px]">Companies</div>
        <div>
          <button
            onClick={() => document.getElementById("addModal").showModal()}
            className="flex flex-row justify-center items-center gap-1 bg-[#667A8A] text-white rounded-xl px-5 py-2 "
          >
            <svg
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0418 4.33337H7.29183V0.333374H5.7085V4.33337H0.958496V5.66671H5.7085V9.66671H7.29183V5.66671H12.0418V4.33337Z"
                fill="white"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full mt-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Logo</th>
                <th>Company Name</th>
                <th>SEC Certificate #</th>
                <th className="w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>
                  <img src="/company_logos/fs.png" alt="Logo..." />
                </td>
                <td>Company A</td>
                <td>SEC-2022-1234567890-ABCD</td>
                <td className="flex flex-row justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("addModal").showModal()
                    }
                  >
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#273069" />
                      <path
                        d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleDelete}>
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#CF0404" />
                      <path
                        d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                        stroke="white"
                        strokeWidth="1.95694"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>
                  <img src="/company_logos/fs.png" alt="Logo..." />
                </td>
                <td>Company B</td>
                <td>SEC-2022-1234567890-ABCD</td>
                <td className="flex flex-row justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("addModal").showModal()
                    }
                  >
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#273069" />
                      <path
                        d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleDelete}>
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#CF0404" />
                      <path
                        d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                        stroke="white"
                        strokeWidth="1.95694"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>
                  <img src="/company_logos/fs.png" alt="Logo..." />
                </td>
                <td>Company C</td>
                <td>SEC-2022-1234567890-ABCD</td>
                <td className="flex flex-row justify-center items-center gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("addModal").showModal()
                    }
                  >
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#273069" />
                      <path
                        d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button onClick={toggleDelete}>
                    <svg
                      width="44"
                      height="37"
                      viewBox="0 0 44 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="44" height="37" rx="10" fill="#CF0404" />
                      <path
                        d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                        stroke="white"
                        strokeWidth="1.95694"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
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
  );
};

export default Companies;
