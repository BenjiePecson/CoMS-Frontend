import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { convertBase64, showToast } from "../../../assets/global";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updateLetterHeader } from "../../store/company/CompanySlice";

const CompanySetting = () => {
  const { companyId } = useParams();

  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const [openAccordion, setOpenAccordion] = useState("Company Profile");
  const [errors, setErrors] = useState({});
  const [fakePath, setFakePath] = useState("");
  const letterHeaderRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Breadcrumbs
        lists={[
          { goto: "/", text: "Home" },
          {
            goto: `/company/${selectedCompany.companyId}`,
            text: `${selectedCompany.companyName}`,
          },

          { goto: "/", text: "Settings" },
        ]}
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row justify-between w-full">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Company Settings
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-between items-center">
          <div
            className={`collapse collapse-arrow z-0 ${
              openAccordion == "Company Profile"
                ? "collapse-open"
                : "collapse-close"
            }`}
          >
            <input
              type="radio"
              name="my-accordion-2"
              className="cursor-pointer"
              onClick={(ev) => {
                if (openAccordion == "Company Profile") {
                  setOpenAccordion("");
                } else {
                  setOpenAccordion("Company Profile");
                }
              }}
            />
            <div className="collapse-title text-md font-semibold bg-[#FFFFFF] m-2 flex flex-row items-center gap-3">
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
              Company Profile
            </div>
            <div className="collapse-content">
              <div className="flex flex-col gap-5 pt-3">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <span className="flex flex-row gap-2 items-center">
                      <h1 className="poppins-bold">Company Profile should appear here...</h1>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`collapse collapse-arrow z-0 ${
              openAccordion == "Company Letter Head"
                ? "collapse-open"
                : "collapse-close"
            }`}
          >
            <input
              type="radio"
              name="my-accordion-2"
              className="cursor-pointer"
              onClick={(ev) => {
                if (openAccordion == "Company Letter Head") {
                  setOpenAccordion("");
                } else {
                  setOpenAccordion("Company Letter Head");
                }
              }}
            />
            <div className="collapse-title text-md font-semibold bg-[#FFFFFF] m-2 flex flex-row items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>
              Company Letter Header
            </div>
            <div className="collapse-content">
              <div className="flex flex-col gap-5 pt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        document
                          .getElementById("updateLetterHeader")
                          .showModal();
                      }}
                    >
                      Update Letter Header
                    </button>
                  </div>
                  <div className="flex flex-col bg-white min-h-40 justify-center items-center">
                    {selectedCompany.letterHeader != "" &&
                    selectedCompany.letterHeader != null &&
                    selectedCompany.letterHeader != undefined ? (
                      <img
                        className="w-full"
                        src={selectedCompany.letterHeader}
                        alt="Letter Header"
                      />
                    ) : (
                      <span> No Letter Header found.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="updateLetterHeader" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Update Company Letter Header</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <label className="form-control w-full">
              <div className="label">
                <div className="poppins-regular">
                  Letter Header <span className="text-red-500">*</span>
                </div>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                ref={letterHeaderRef}
                onChange={async (e) => {
                  let base64 = await convertBase64(e.target.files[0]);
                  setFakePath(base64);
                }}
              />
              {errors.letterHeader && (
                <span className="text-[12px] text-red-500">
                  {errors.letterHeader}
                </span>
              )}
            </label>
            {fakePath == "" ? (
              selectedCompany.letterHeader == null ? (
                <>No Preview Available</>
              ) : (
                <img
                  className="w-full"
                  src={selectedCompany.letterHeader}
                  alt="Letter Header"
                />
              )
            ) : (
              <img className="w-full" src={fakePath} alt="Letter Header" />
            )}

            <button
              onClick={async (e) => {
                setLoading(true);
                let message = "Failed to update letter header.";
                let type = "error";
                try {
                  let response = await axios.patch(
                    `/company/${companyId}/updateLetterHeader`,
                    {
                      letterHeader: fakePath,
                      companyName: selectedCompany.companyName,
                    }
                  );
                  if (response.status === 200) {
                    message = "Letter Header was updated successfully";
                    type = "success";

                    dispatch(
                      updateLetterHeader({
                        companyId,
                        letterHeader: response.data.letterHeader,
                      })
                    );
                  }
                } catch (error) {
                  console.log(error);
                } finally {
                  document.getElementById("updateLetterHeader").close();
                  showToast(type, message);
                  setLoading(false);
                }
              }}
              className="btn bg-primary text-white mt-2"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CompanySetting;
