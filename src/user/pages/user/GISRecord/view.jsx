import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import imagePage1 from "../../../../assets/images/page1.jpg";
import {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import Swal from "sweetalert2";

const view = () => {
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    year: {
      position: "absolute",
      margin: "5px",
      fontSize: "10px",
      fontWeight: 700,
      marginTop: 67,
      marginLeft: 290,
    },
    corporate_name: {
      position: "absolute",
      margin: "5px",
      fontSize: "10px",
      fontWeight: 700,
      marginTop: 200,
      marginLeft: 290,
    },
    image: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      width: "592px",
    },
    page: { position: "relative" },
  });

  const [comment, setComment] = useState("");

  const GISFormDocument = (
    <Document title={`GIS`}>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.year}>{"2024"}</Text>
        <Text style={styles.corporate_name}>{"FS"}</Text>
        <Text style={styles.business_or_trade_name}>{"FS"}</Text>
        <Text style={styles.sec_registration_number}>{"1234567890"}</Text>

        <Image style={styles.image} src={imagePage1}></Image>
      </Page>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.year}>{"2024"}</Text>
        <Text style={styles.corporate_name}>{"FS"}</Text>
        <Text style={styles.business_or_trade_name}>{"FS"}</Text>
        <Text style={styles.sec_registration_number}>{"1234567890"}</Text>

        <Image style={styles.image} src={imagePage1}></Image>
      </Page>
    </Document>
  );

  const toggleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to approve this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#273069",
      confirmButtonText: "Yes, approve it!",
      cancelButtonColor: "#B4B4B8",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteCompany(id);
        navigate(-1);
        Swal.fire({
          title: "Success!",
          text: "The record has been approved successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="flex flex-row gap-3 my-5 p-2 items-center w-32"
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.14081 0.260609L0.588132 6.11787L6.44539 11.6705L7.82115 10.2193L3.41512 6.0424L7.59204 1.63637L6.14081 0.260609Z"
            fill="black"
          />
        </svg>
        <span className="poppins-regular text-[16px]">Back</span>
      </button>

      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-4 justify-center items-center">
            <svg
              width="26"
              height="22"
              viewBox="0 0 26 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.00001H13.4137L10 0.586257C9.81487 0.399844 9.59458 0.252035 9.3519 0.1514C9.10922 0.050765 8.84897 -0.000693852 8.58625 7.06503e-06H2C1.46957 7.06503e-06 0.960859 0.210721 0.585786 0.585793C0.210714 0.960866 0 1.46957 0 2.00001V20.0775C0.000992028 20.5873 0.20403 21.0759 0.564625 21.4363C0.925219 21.7966 1.41396 21.9993 1.92375 22H24.1112C24.612 21.9993 25.092 21.8001 25.4461 21.4461C25.8001 21.092 25.9993 20.612 26 20.1113V6.00001C26 5.46957 25.7893 4.96087 25.4142 4.58579C25.0391 4.21072 24.5304 4.00001 24 4.00001ZM2 2.00001H8.58625L10.5863 4.00001H2V2.00001Z"
                fill="#343330"
              />
            </svg>
            <div className="flex flex-col">
              <span className="poppins-medium text-[10px]">Company</span>
              <div className="flex flex-row gap-5">
                <span className="poppins-bold text-[18px]">Fullsuite</span>
                <span className="poppins-bold text-[18px]">FS GIS 2024</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-end">
            <span className="poppins-medium text-[10px]">Created By</span>
            <span className="poppins-semibold text-[16px]">
              Michael Artiaga
            </span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row mt-5 w-full gap-2">
          <div className="w-[70%]">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div className="w-full text-start h-screen">
                  <PDFViewer
                    style={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {GISFormDocument}
                  </PDFViewer>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] flex flex-col items-center">
            <div>
              <button
                className="btn bg-primary text-white btn-wide"
                onClick={() => {
                  toggleApprove(1);
                }}
              >
                Approve
              </button>
            </div>
            <div className="mt-5">
              <button
                className="btn bg-[#6F7496] text-white btn-wide"
                onClick={() => {
                  // toggleApprove(1);
                  document.getElementById("approveModal").showModal();
                }}
              >
                Revert
              </button>
            </div>
            <div className="divider"></div>
            <label className="form-control w-full">
              <div className="label w-full">
                <span className="label-text">
                  Comments <span className="text-red-500">*</span>
                </span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                defaultValue={comment}
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      <dialog id="approveModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full items-center justify-center">
              <svg
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.3717 14.6853V29.9083M27.3717 40.0827L27.397 40.0545M27.3716 52.7433C41.3839 52.7433 52.7433 41.3839 52.7433 27.3716C52.7433 13.3593 41.3839 2 27.3716 2C13.3593 2 2 13.3593 2 27.3716C2 41.3839 13.3593 52.7433 27.3716 52.7433Z"
                  stroke="#F38F33"
                  strokeWidth="2.62921"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1 className="poppins-bold text-[15px]">
                You’re about to revert this record?
              </h1>
              <label className="form-control w-full">
                <div className="label w-full">
                  <span className="label-text">
                    Comments <span className="text-red-500">*</span>
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  defaultValue={comment}
                ></textarea>
              </label>
            </div>
            <div className="flex flex-row gap-10 items-center justify-center">
              <button
                onClick={(e) => {
                  console.log("Revert");
                  navigate(-1);
                  Swal.fire({
                    title: "Success!",
                    text: "The record has been reverted successfully.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
                className="btn bg-[#6F7496] text-white mt-2"
              >
                Revert
              </button>
              <button
                onClick={(e) => {
                  document.getElementById("approveModal").close();
                }}
                className="btn bg-[#CDCDCD] text-black mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default view;
