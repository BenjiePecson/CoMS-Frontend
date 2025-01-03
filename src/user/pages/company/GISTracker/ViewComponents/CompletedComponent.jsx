import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecord,
  gdrivefoldersState,
} from "../../../../store/GIS/GISRecordSlice";
import { useParams } from "react-router-dom";
import FrameWrapper from "../../DashboardComponents/FrameWrapper";
import axios from "axios";

const CompletedComponent = () => {
  const { companyId, recordId } = useParams();

  const record = useSelector((state) => state.records.selectedRecord);

  const [showEdit, setShowEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  //   const [gdrivefolders, setgdrivefolders] = useState(gdrivefoldersState);

  const [openAccordion, setOpenAccordion] = useState("");
  const [gdrivefolder, setgdrivefolder] = useState("");

  const [recordData, setRecordData] = useState(record);

  const folderIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
    </svg>
  );

  const accordionContent = (accordion) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <span className="flex flex-row gap-2 items-center">
              <h1 className="poppins-bold">Attached Files </h1>
            </span>

            {accordion.gdrivefolder != null && accordion.gdrivefolder != "" && (
              <h1
                className="poppins-regular text-sm text-blue-500 cursor-pointer flex flex-row items-end"
                onClick={() => {
                  if (
                    accordion.gdrivefolder != null &&
                    accordion.gdrivefolder != ""
                  ) {
                    window.open(
                      `https://drive.google.com/drive/folders/${accordion.gdrivefolder}`,
                      "_blank"
                    );
                  } else {
                    showToast(
                      "warning",
                      "Please check again the Google Drive Folder ID."
                    );
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Go to Drive
              </h1>
            )}
          </div>
          <div className="bg-white rounded-lg">
            {accordion.gdrivefolder != undefined &&
            accordion.gdrivefolder != "" ? (
              <FrameWrapper gdrivefolder={accordion.gdrivefolder} />
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <h1 className="font-bold text-lg">No folder ID specified.</h1>
                  <p className="text-sm">
                    Please provide the Google Drive folder ID for{" "}
                    {accordion.title}.
                  </p>

                  <div
                    className="py-2"
                    onClick={() => {
                      document.getElementById("changedriveID").showModal();
                      setgdrivefolder(recordData.folder_id);
                    }}
                  >
                    <button className="btn btn-outline btn-sm">
                      Set Folder ID
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const dialogComponents = () => {
    return (
      <>
        <dialog id="changedriveID" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="poppins-semibold text-md">
                Update Google Drive Folder ID
              </h1>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Google Drive Folder ID{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.gdrivefolder && `input-error`
                  }`}
                  name="gdrivefolders"
                  value={gdrivefolder}
                  onChange={(e) => {
                    setgdrivefolder(e.target.value);
                  }}
                />
                {errors.gdrivefolders && (
                  <span className="text-[12px] text-red-500">
                    {errors.gdrivefolder}
                  </span>
                )}
              </label>

              <button
                className="btn bg-primary text-white"
                onClick={async (e) => {
                  try {
                    let response = await axios.patch(
                      `/record/record/${recordId}`,
                      {
                        folder_id: gdrivefolder,
                      }
                    );
                    if (response.status === 200) {
                      dispatch(fetchRecord(recordId));
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    document.getElementById("changedriveID").close();
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecord(recordId));
  }, []);

  useEffect(() => {
    setRecordData(record);
  }, [record]);

  return (
    <>
      {/* <div className="flex justify-center items-center">{svg}</div> */}
      <div className="py-5 px-2 sm:p-5  ">
        <div className="flex flex-col w-full">
          {accordionContent({
            title: "Attached Files",
            gdrivefolder: recordData.folder_id,
          })}
        </div>
      </div>

      <div>{dialogComponents()}</div>
    </>
  );
};

export default CompletedComponent;
