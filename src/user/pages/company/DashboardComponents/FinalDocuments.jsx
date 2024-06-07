import { useEffect, useState } from "react";
import { convertBase64, showToast } from "../../../../assets/global";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const finalDoc = {
  fileType: "",
  files: [],
};

const FinalDocuments = ({}) => {
  const { companyId } = useParams();

  const [secCerts, setSecCerts] = useState([]);
  const [artOfInc, setArtOfInc] = useState([]);
  const [byLaws, setByLaws] = useState([]);
  const [BIROrCOR, setBIROrCOR] = useState([]);
  const [LGUBusinessPermit, setLGUBusinessPermit] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleResetClick = () => {
    setSelectedOption("");
  };

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

  useEffect(() => {
    fetchFinalDocs();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between m-1">
        <h1 className="mt-5 font-bold text-xl">Company Documents</h1>{" "}
        {/* The button to open modal */}
        <label
          className="btn bg-primary text-white  flex flex-row"
          onClick={(e) => {
            setFormData({ ...formData, fileType: "", files: [] });
            setErrors([]);
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
        </label>
      </div>

      <div className="collapse collapse-arrow bg-base-200 z-0">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold bg-[#FFFFFF] m-2 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-3"
          >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          SEC Certificates
        </div>
        <div className="collapse-content">
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
                {secCerts.length > 0 ? (
                  secCertsRow
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
      </div>
      <div className="collapse collapse-arrow bg-base-200 z-0">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold bg-[#FFFFFF] m-2 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-3"
          >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          Articles of Incorporation
        </div>
        <div className="collapse-content">
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
                {artOfInc.length > 0 ? (
                  artOfIncRow
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
      </div>
      <div className="collapse collapse-arrow bg-base-200 z-0">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold bg-[#FFFFFF] m-2 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-3"
          >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          By Laws
        </div>
        <div className="collapse-content">
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
                {byLaws.length > 0 ? (
                  byLawsRow
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
      </div>
      <div className="collapse collapse-arrow bg-base-200 z-0">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold bg-[#FFFFFF] m-2 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-3"
          >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          BIR/COR
        </div>
        <div className="collapse-content">
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
                {BIROrCOR.length > 0 ? (
                  BIROrCORRow
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
      </div>
      <div className="collapse collapse-arrow bg-base-200 z-0">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-semibold bg-[#FFFFFF] m-2 flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-3"
          >
            <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          LGU Business Permit
        </div>
        <div className="collapse-content">
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
                {LGUBusinessPermit.length > 0 ? (
                  LGUBusinessPermitRow
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
                // onChange={(handleSelectChange)}
                value={formData.fileType}
                onChange={(e) => {
                  setFormData({ ...formData, fileType: e.target.value });
                  if (e.target.value == "") {
                    setErrors({
                      ...errors,
                      fileType: "File Type is Required.",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      fileType: "",
                    });
                  }
                }}
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

                  console.log(formData);

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
                disabled={isUploading}
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
    </div>
  );
};

export default FinalDocuments;
