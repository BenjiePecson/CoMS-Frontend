import { useEffect, useState } from "react";
import { convertBase64, showToast } from "../../../../assets/global";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FrameWrapper from "./FrameWrapper";
import { fetchCompany } from "../../../store/company/CompanySlice";

const finalDoc = {
  fileType: "",
  files: [],
};

const FinalDocuments = ({ isGridView, setIsGridView }) => {
  const { companyId } = useParams();

  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const dispatch = useDispatch();

  const [secCerts, setSecCerts] = useState([]);
  const [artOfInc, setArtOfInc] = useState([]);
  const [byLaws, setByLaws] = useState([]);
  const [BIROrCOR, setBIROrCOR] = useState([]);
  const [LGUBusinessPermit, setLGUBusinessPermit] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  /////
  const [selectedOption, setSelectedOption] = useState("");
  const [formDrive, setFormDrive] = useState(selectedCompany.gdrivefolders);

  const folderData = {
    gdrive_folder: "",
    fileType: "",
    files: [],
  };
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedDrive, setSelectedDrive] = useState(null);

  const [selectedListFolder, setSelectedListFolder] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleResetClick = () => {
    setSelectedOption("");
  };
  ///

  const secCertsRow = secCerts.map((row, index) => {
    return (
      <tr key={`secCert-${index}`}>
        <td>{row.fileName}</td>
        <td>{row.created_at}</td>
        <td className="flex flex-row gap-1">
          <a href={row.fileLink} download={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </a>
          <a href={row.fileLink} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
      </tr>
    );
  });

  const artOfIncRow = artOfInc.map((row, index) => {
    return (
      <tr key={`artOfInc-${index}`}>
        <td>{row.fileName}</td>
        <td>{row.created_at}</td>
        <td className="flex flex-row gap-1">
          <a href={row.fileLink} download={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </a>
          <a href={row.fileLink} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
      </tr>
    );
  });

  const byLawsRow = byLaws.map((row, index) => {
    return (
      <tr key={`byLaws-${index}`}>
        <td>{row.fileName}</td>
        <td>{row.created_at}</td>
        <td className="flex flex-row gap-1">
          <a href={row.fileLink} download={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </a>
          <a href={row.fileLink} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
      </tr>
    );
  });

  const BIROrCORRow = BIROrCOR.map((row, index) => {
    return (
      <tr key={`BIROrCOR-${index}`}>
        <td>{row.fileName}</td>
        <td>{row.created_at}</td>
        <td className="flex flex-row gap-1">
          <a href={row.fileLink} download={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </a>
          <a href={row.fileLink} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
      </tr>
    );
  });

  const LGUBusinessPermitRow = LGUBusinessPermit.map((row, index) => {
    return (
      <tr key={`LGUBusinessPermit-${index}`}>
        <td>{row.fileName}</td>
        <td>{row.created_at}</td>
        <td className="flex flex-row gap-1">
          <a href={row.fileLink} download={true}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="m12 16 4-5h-3V4h-2v7H8z"></path>
              <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
            </svg>
          </a>
          <a href={row.fileLink} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
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
      </tr>
    );
  });

  const folderIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="40"
      height="40"
    >
      <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
    </svg>
  );

  const gridIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const listIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const folder = (folderName, gdrivefolder) => {
    return (
      //h-28 w-48
      <div
        className="h-28 w-full border rounded-lg flex flex-col p-5 justify-between cursor-pointer hover:shadow-md bg-white"
        onClick={() => {
          document.getElementById("openDocumentsModal").showModal();
          setSelectedFolder(folderName);
          setSelectedDrive(gdrivefolder);
        }}
      >
        {folderIcon}
        <h1 className="font-bold text-xs">{folderName}</h1>
      </div>
    );
  };

  const listFolder = (folderName, folderState, folderRow, gdrivefolder) => {
    return (
      <div
        className={`collapse collapse-arrow bg-base-200 z-0 ${
          folderName == selectedListFolder ? "collapse-open" : "collapse-close"
        }`}
      >
        <input
          type="radio"
          name="my-accordion-2"
          className="cursor-pointer"
          onClick={(ev) => {
            if (selectedListFolder == folderName) {
              setSelectedListFolder("");
            } else {
              setSelectedListFolder(folderName);
            }
          }}
        />
        <div className="collapse-title text-md font-semibold bg-[#FFFFFF] m-2 flex flex-row items-center">
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-3"
            >
              <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
            </svg>
          }
          {folderName}
        </div>
        <div className="collapse-content">
          <div className="flex flex-col gap-5 pt-3">
            {/* <div className="flex flex-col gap-2">
              <div className="flex flex-row">
                <h1 className="poppins-bold">Uploaded Documents</h1>
              </div>
              <div className="bg-white p-5 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="table table-xs table-pin-rows table-pin-cols z-0">
                    <thead>
                      <tr>
                        <td>FILE NAME</td>
                        <td>DATE UPLOADED</td>
                        <td>ACTIONS</td>
                      </tr>
                    </thead>
                    <tbody>
                      {folderState.length > 0 ? (
                        folderRow
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-5">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <span className="flex flex-row gap-2 items-center">
                  <h1 className="poppins-bold">Google Drive Folder </h1>
                </span>

                {gdrivefolder != null && gdrivefolder != "" && (
                  <h1
                    className="poppins-regular text-sm text-blue-500 cursor-pointer flex flex-row items-end"
                    onClick={() => {
                      if (gdrivefolder != null && gdrivefolder != "") {
                        window.open(
                          `https://drive.google.com/drive/folders/${gdrivefolder}`,
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
              <div className="bg-white p-5 rounded-lg">
                {gdrivefolder != undefined && gdrivefolder != "" ? (
                  <FrameWrapper gdrivefolder={gdrivefolder} />
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

                      <h1 className="font-bold text-lg">
                        No folder ID specified.
                      </h1>
                      <p className="text-sm">
                        Please provide the Google Drive folder ID for{" "}
                        {folderName}.
                      </p>

                      <div
                        className="py-2"
                        onClick={() => {
                          document
                            .getElementById("updateGdriveModal")
                            .showModal();
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
          </div>
        </div>
      </div>
    );
  };

  const listView = () => {
    return (
      <div>
        {/* <div className="flex flex-row justify-end m-1"> */}
        {/* <h1 className="mt-5 font-bold text-xl">Company Documents</h1>{" "} */}
        {/* The button to open modal */}
        {/* <label
        className="btn bg-primary text-white  flex flex-row"
        onClick={(e) => {
          setFormData({
            ...formData,
            fileType: "SEC Certificates",
          });
          document.getElementById("fileUpload").value = "";
          document.getElementById("uploadModal").showModal();
        }}
      >
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
        UPLOAD FINAL DOCS
      </label> */}
        {/* </div> */}

        <div className="flex flex-col">
          {listFolder(
            "SEC Certificates",
            secCerts,
            secCertsRow,
            selectedCompany.gdrivefolders.sec_cert
          )}
          {listFolder(
            "Articles of Incorporation",
            artOfInc,
            artOfIncRow,
            selectedCompany.gdrivefolders.art_of_inc
          )}
          {listFolder(
            "By Laws",
            byLaws,
            byLawsRow,
            selectedCompany.gdrivefolders.by_laws
          )}
          {listFolder(
            "BIR/COR",
            BIROrCOR,
            BIROrCORRow,
            selectedCompany.gdrivefolders.bir_or_cor
          )}
          {listFolder(
            "LGU Business Permit",
            LGUBusinessPermit,
            LGUBusinessPermitRow,
            selectedCompany.gdrivefolders.lgu_business_permit
          )}
        </div>
      </div>
    );
  };

  const gridView = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {folder("SEC Certificates", selectedCompany.gdrivefolders.sec_cert)}
        {folder(
          "Articles of Incorporation",
          selectedCompany.gdrivefolders.art_of_inc
        )}
        {folder("By Laws", selectedCompany.gdrivefolders.by_laws)}
        {folder("BIR/COR", selectedCompany.gdrivefolders.bir_or_cor)}
        {folder(
          "LGU Business Permit",
          selectedCompany.gdrivefolders.lgu_business_permit
        )}
      </div>
    );
  };

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(finalDoc);

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.fileType == "") {
      newErrors.fileType = "File Type is required";
    }

    if (formData.files.length === 0) {
      newErrors.files = "Please attach a file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const fetchFinalDocs = async () => {
    let response = await axios.get(`/finaldocs/${companyId}`);
    let secCertList = [];
    let artOfIncList = [];
    let byLawsList = [];
    let birOrCorList = [];
    let lguBusinessPermitList = [];
    if (response.data.length >= 1) {
      response.data.map((finaldoc, index) => {
        const date = new Date(finaldoc.created_at);

        // Extract year, month, and day components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
        const day = String(date.getDate()).padStart(2, "0");

        // Construct the formatted date string
        const formattedDate = `${month}/${day}/${year}`;

        finaldoc.created_at = formattedDate;
        switch (finaldoc.fileType) {
          case "SEC Certificates":
            secCertList.push(finaldoc);
            break;
          case "Articles of Incorporation":
            artOfIncList.push(finaldoc);
            break;
          case "By Laws":
            byLawsList.push(finaldoc);
            break;
          case "BIR/COR":
            birOrCorList.push(finaldoc);
            break;
          case "LGU Business Permit":
            lguBusinessPermitList.push(finaldoc);
            break;
          default:
            break;
        }

        setSecCerts(secCertList);
        setArtOfInc(artOfIncList);
        setByLaws(byLawsList);
        setBIROrCOR(birOrCorList);
        setLGUBusinessPermit(lguBusinessPermitList);
      });
    }
  };

  function resizeIframe(obj) {
    console.log(obj.contentWindow);
    // obj.style.height =
    //   obj.contentWindow.document.documentElement.scrollHeight + "px";
  }

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchFinalDocs();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className=" poppins-bold text-color-2 text-[24px] flex items-center">
            <span
              className="flex flex-row gap-2"
              onMouseEnter={() => {
                setShowEdit(true);
              }}
              onMouseLeave={() => {
                setShowEdit(false);
              }}
            >
              Company Documents
              <button
                onClick={() => {
                  document.getElementById("updateGdriveModal").showModal();
                }}
                className={`${showEdit ? "" : "hidden"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </button>
            </span>
          </div>
          <div className="flex flex-row gap-5">
            <label className="swap">
              <input
                type="checkbox"
                onChange={() => {
                  setIsGridView(!isGridView);
                }}
              />
              <div className="swap-on">{listIcon}</div>
              <div className="swap-off">{gridIcon}</div>
            </label>
            {/* <label
              className="btn bg-primary text-white  lg:flex flex-row hidden"
              onClick={(e) => {
                setFormData({
                  ...formData,
                  fileType: "SEC Certificates",
                });
                document.getElementById("fileUpload").value = "";
                document.getElementById("uploadModal").showModal();
              }}
            >
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
              Upload Final Docs
            </label> */}
          </div>
        </div>
        {isGridView ? gridView() : listView()}
      </div>

      <dialog id="uploadModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Upload Final Document</h3>
            <form method="dialog">
              <button
                onClick={handleResetClick}
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
              >
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  File Type <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className={`select select-bordered ${
                  errors.fileType && `select-error`
                }`}
                name="fileType"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="">Select an option</option>
                <option value={"SEC Certificates"}>SEC Certificates</option>
                <option value={"Articles of Incorporation"}>
                  Articles of Incorporation
                </option>
                <option value={"By Laws"}>By Laws</option>
                <option value={"BIR/COR"}>BIR/COR</option>
                <option value={"LGU Business Permit"}>
                  LGU Business Permit
                </option>
                <option value={"Service Agreement"}>Service Agreement</option>
              </select>
              {errors.fileType && (
                <span className="text-[12px] text-red-500">
                  {errors.fileType}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  File <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="file"
                id="fileUpload"
                className={`file-input file-input-bordered w-full ${
                  errors.files && `file-input-error`
                }`}
                name="file"
                onChange={async (e) => {
                  const { name, value, files } = e.target;

                  for (let i = 0; i < files.length; i++) {
                    if (files[i].size > 5 * 1024 * 1024) {
                      setErrors({
                        ...errors,
                        files: `${files[i].name} file size exceeds 5MB. Please choose a smaller file.`,
                      });
                      return;
                    } else {
                      let file = {
                        file: await convertBase64(files[i]),
                        fileName: files[i].name,
                      };
                      formData.files = [];
                      formData.files.push(file);
                    }
                  }

                  setFormData({
                    ...formData,
                    files: formData.files,
                  });

                  let error = "";

                  if (formData.files.length == 0) {
                    error = "Please attach a file";
                    setErrors({
                      ...errors,
                      files: error,
                    });
                  } else {
                    setErrors({ ...errors, files: "" });
                  }
                }}
              />
              {errors.files && (
                <span className="text-[12px] text-red-500">{errors.files}</span>
              )}
            </label>

            <div className="flex flex-row justify-between">
              <button
                onClick={(e) => {
                  document.getElementById("uploadModal").close();
                  handleResetClick();
                }}
                className="btn mt-2"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  handleResetClick();
                  setIsUploading(true);

                  if (await isFormValid()) {
                    let type = "erorr";
                    let message =
                      "Failed to upload the file. Please try again.";
                    try {
                      let response = await axios.post(
                        `/finaldocs/${companyId}`,
                        formData
                      );

                      if (response.data.success) {
                        const date = new Date(response.data.data[0].created_at);

                        // Extract year, month, and day components
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        ); // Months are 0-indexed, so add 1
                        const day = String(date.getDate()).padStart(2, "0");

                        // Construct the formatted date string
                        const formattedDate = `${month}/${day}/${year}`;
                        let data = {
                          fileName: response.data.data[0].fileName,
                          fileLink: response.data.data[0].fileLink,
                          created_at: formattedDate,
                        };

                        switch (formData.fileType) {
                          case "SEC Certificates":
                            setSecCerts([...secCerts, data]);
                            break;
                          case "Articles of Incorporation":
                            setArtOfInc([...artOfInc, data]);
                            break;
                          case "By Laws":
                            setByLaws([...byLaws, data]);
                            break;
                          case "BIR/COR":
                            setBIROrCOR([...BIROrCOR, data]);
                            break;
                          case "LGU Business Permit":
                            setLGUBusinessPermit([...LGUBusinessPermit, data]);
                            break;
                          default:
                            break;
                        }
                        type = "success";
                        message = "Uploaded Successfully!";
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      showToast(type, message);
                      document.getElementById("uploadModal").close();
                    }
                  }

                  setIsUploading(false);
                }}
                className="btn bg-primary text-white mt-2"
                disabled={!selectedOption}
              >
                {isUploading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="openDocumentsModal" className="modal">
        <div className="modal-box max-w-none w-[75%]">
          <div className="flex flex-row justify-between">
            <h3
              className="poppins-bold text-2xl"
              onClick={() => {
                document.getElementById("updateGdriveModal").showModal();
              }}
            >
              {selectedFolder}
            </h3>
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
                onClick={() => {
                  setSelectedFolder(null);
                  setSelectedDrive(null);
                }}
              >
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2 py-5">
            <div className="flex flex-col gap-5 pt-3">
              {/* <div className="flex flex-col gap-2">
                <div className="flex flex-row">
                  <h1 className="poppins-bold">Uploaded Documents</h1>
                </div>
                <div className="bg-white p-5 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols z-0">
                      <thead>
                        <tr>
                          <td>FILE NAME</td>
                          <td>DATE UPLOADED</td>
                          <td>ACTIONS</td>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFolder == "SEC Certificates" ? (
                          secCerts.length > 0 ? (
                            secCertsRow
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center py-5">
                                No records found.
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr></tr>
                        )}
                        {selectedFolder == "Articles of Incorporation" ? (
                          artOfInc.length > 0 ? (
                            artOfIncRow
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center py-5">
                                No records found.
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr></tr>
                        )}
                        {selectedFolder == "By Laws" ? (
                          byLaws.length > 0 ? (
                            byLawsRow
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center py-5">
                                No records found.
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr></tr>
                        )}
                        {selectedFolder == "BIR/COR" ? (
                          BIROrCOR.length > 0 ? (
                            BIROrCORRow
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center py-5">
                                No records found.
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr></tr>
                        )}
                        {selectedFolder == "LGU Business Permit" ? (
                          LGUBusinessPermit.length > 0 ? (
                            LGUBusinessPermitRow
                          ) : (
                            <tr>
                              <td colSpan={3} className="text-center py-5">
                                No records found.
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <h1 className="poppins-bold">Google Drive</h1>
                  <h1
                    className="poppins-regular text-sm text-blue-500 cursor-pointer flex flex-row items-end"
                    onClick={() => {
                      if (selectedDrive != null && selectedDrive != "") {
                        window.open(
                          `https://drive.google.com/drive/folders/${selectedDrive}`,
                          "_blank"
                        );
                      } else {
                        showToast(
                          "warning",
                          "Please check again the Google Drive Folder ID."
                        );
                        document.getElementById("openDocumentsModal").close();
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
                </div>
                <div className="p-5 rounded-lg">
                  {selectedDrive != null && selectedDrive != "" ? (
                    <FrameWrapper gdrivefolder={selectedDrive} />
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

                        <h1 className="font-bold text-lg">
                          No folder ID specified.
                        </h1>
                        <p className="text-sm">
                          Please provide the Google Drive folder ID for{" "}
                          {selectedFolder}.
                        </p>
                        <div
                          className="py-2"
                          onClick={() => {
                            document
                              .getElementById("updateGdriveModal")
                              .showModal();
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
            </div>
            <div className="flex flex-row justify-end">
              <button
                onClick={(e) => {
                  document.getElementById("openDocumentsModal").close();
                  setSelectedFolder(null);
                  setSelectedDrive(null);
                }}
                className="btn mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="updateGdriveModal" className="modal">
        <div className="modal-box max-w-none w-[50%]">
          <div className="flex flex-row justify-between">
            <h3 className="poppins-bold text-xl">
              Update Google Drive Folders
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col py-5">
              <div className="flex flex-col gap-2">
                {/* <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Company Folder <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.root}
                    name="root"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.root && (
                    <span className="text-[12px] text-red-500">
                      {errors.root}
                    </span>
                  )}
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Final Documents <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.finaldocs}
                    name="finaldocs"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.finaldocs && (
                    <span className="text-[12px] text-red-500">
                      {errors.finaldocs}
                    </span>
                  )}
                </label> */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      SEC Certificates <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.sec_cert}
                    name="sec_cert"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.sec_cert && (
                    <span className="text-[12px] text-red-500">
                      {errors.sec_cert}
                    </span>
                  )}
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Articles of Incorporation{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.art_of_inc}
                    name="art_of_inc"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.art_of_inc && (
                    <span className="text-[12px] text-red-500">
                      {errors.art_of_inc}
                    </span>
                  )}
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      By Laws <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.by_laws}
                    name="by_laws"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.by_laws && (
                    <span className="text-[12px] text-red-500">
                      {errors.by_laws}
                    </span>
                  )}
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      BIR/COR <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.bir_or_cor}
                    name="bir_or_cor"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.bir_or_cor && (
                    <span className="text-[12px] text-red-500">
                      {errors.bir_or_cor}
                    </span>
                  )}
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      LGU Business Permit{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formDrive.lgu_business_permit}
                    name="lgu_business_permit"
                    onChange={(e) => {
                      setFormDrive({
                        ...formDrive,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className="input input-bordered w-full"
                  />
                  {errors.lgu_business_permit && (
                    <span className="text-[12px] text-red-500">
                      {errors.lgu_business_permit}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <button
                onClick={(e) => {
                  document.getElementById("updateGdriveModal").close();
                }}
                className="btn mt-2"
              >
                Cancel
              </button>
              <button
                onClick={async (e) => {
                  let status = "error";
                  let message = "Failed to update the record.";
                  try {
                    let response = await axios.patch(`/company/${companyId}`, {
                      gdrivefolders: formDrive,
                    });
                    if (response.status === 200) {
                      status = "success";
                      message = "Record updated successfully.";
                      dispatch(fetchCompany(companyId));
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    showToast(status, message);
                    document.getElementById("updateGdriveModal").close();
                  }
                }}
                className="btn bg-primary text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FinalDocuments;
