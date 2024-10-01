import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { useDispatch, useSelector } from "react-redux";
import { fetchRecord } from "../../../store/GIS/GISRecordSlice";
import PageOne from "../../company/GISTracker/pdfPages/PageOne";
import PageOneSpecial from "../../company/GISTracker/pdfPages/PageOneSpecial";
import PageTwo from "../../company/GISTracker/pdfPages/PageTwo";
import PageThree from "../../company/GISTracker/pdfPages/PageThree";
import PageFour from "../../company/GISTracker/pdfPages/PageFour";
import PageFive from "../../company/GISTracker/pdfPages/PageFive";
import PageSix from "../../company/GISTracker/pdfPages/PageSix";
import PageSeven from "../../company/GISTracker/pdfPages/PageSeven";
import PageEight from "../../company/GISTracker/pdfPages/PageEight";
import PageNine from "../../company/GISTracker/pdfPages/PageNine";
import PageTen from "../../company/GISTracker/pdfPages/PageTen";
import { showToast } from "../../../../assets/global";
import axios from "axios";

const view = () => {
  const { recordId } = useParams();
  const selectedRecord = useSelector((state) => state.records.selectedRecord);
  const currentUser = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState(selectedRecord.draftingInput);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        let type = "error";
        let message = "Failed to approve the record.";
        try {
          const modified_by = `${currentUser.first_name} ${currentUser.last_name}`;

          let response = await axios.patch(`/record/record/${recordId}`, {
            status: "Approved",
            modified_by,
          });

          if (response.status === 200) {
            type = "success";
            message = "The record has been approved successfully.";
            navigate("/gis");
          }
        } catch (error) {
          console.log(error);
        } finally {
          showToast(type, message);
        }
        // Swal.fire({
        //   title: "Success!",
        //   text: "The record has been approved successfully.",
        //   icon: "success",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      }
    });
  };

  const revertBtn = async () => {
    if (comment == "") {
      setErrors({ ...errors, comments: "Comment is required." });
      return;
    }

    let type = "error";
    let message = "Failed to revert this record.";
    try {
      let response = await axios.patch(`/record/record/${recordId}`, {
        comments: comment,
        status: "Reverted",
      });
      if (response.status === 200) {
        type = "success";
        message = "The record has been reverted successfully.";
        navigate("/gis");
      }
    } catch (error) {
      console.log(error);
    } finally {
      showToast(type, message);
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
    if (e.target.value != "") {
      setErrors({ ...errors, comments: "" });
    } else {
      setErrors({ ...errors, comments: "Comment is required." });
    }
  };

  const PDFViewerComponent = () => {
    if (Object.keys(formData).length == 0) {
      return;
    }
    return (
      <PDFViewer
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
        }}
      >
        <Document title={`${formData.corporate_name} GIS ${formData.year}`}>
          {formData.isSpecialMeeting != undefined ? (
            !formData.isSpecialMeeting ? (
              <PageOne
                //view1
                formData={formData}
                year={formData.year}
                isAmended={formData.isAmended}
                corporate_name={formData.corporate_name}
                business_or_trade_name={formData.business_or_trade_name}
                sec_registration_number={formData.sec_registration_number}
                date_of_annual_meeting={formData.date_of_annual_meeting}
                actual_date_of_annual_meeting={
                  formData.actual_date_of_annual_meeting
                }
                complete_principal_office_address={
                  formData.complete_principal_office_address
                }
                //view2
                date_registered={formData.date_registered}
                fiscal_year_end={formData.fiscal_year_end}
                corporate_tin={formData.corporate_tin}
                website_url_address={formData.website_url_address}
                official_email_address={formData.official_email_address}
                fax_number={formData.fax_number}
                alternate_phone_number={formData.alternate_phone_number}
                telephone_number={formData.telephone_number}
                geographical_code={formData.geographical_code}
                //view3
                alternate_email_address={formData.alternate_email_address}
                official_mobile_number={formData.official_mobile_number}
                name_of_external_auditor={formData.name_of_external_auditor}
                sec_accreditation_number={formData.sec_accreditation_number}
                industry_classification={formData.industry_classification}
                primary_purpose={formData.primary_purpose}
              />
            ) : (
              <PageOneSpecial //view1
                formData={formData}
                year={formData.year}
                isAmended={formData.isAmended}
                corporate_name={formData.corporate_name}
                business_or_trade_name={formData.business_or_trade_name}
                sec_registration_number={formData.sec_registration_number}
                date_of_annual_meeting={formData.date_of_annual_meeting}
                actual_date_of_annual_meeting={
                  formData.actual_date_of_annual_meeting
                }
                complete_principal_office_address={
                  formData.complete_principal_office_address
                }
                //view2
                date_registered={formData.date_registered}
                fiscal_year_end={formData.fiscal_year_end}
                corporate_tin={formData.corporate_tin}
                website_url_address={formData.website_url_address}
                official_email_address={formData.official_email_address}
                fax_number={formData.fax_number}
                alternate_phone_number={formData.alternate_phone_number}
                telephone_number={formData.telephone_number}
                geographical_code={formData.geographical_code}
                //view3
                alternate_email_address={formData.alternate_email_address}
                official_mobile_number={formData.official_mobile_number}
                name_of_external_auditor={formData.name_of_external_auditor}
                sec_accreditation_number={formData.sec_accreditation_number}
                industry_classification={formData.industry_classification}
                primary_purpose={formData.primary_purpose}
              />
            )
          ) : (
            <PageOne
              //view1
              formData={formData}
              year={formData.year}
              amended={formData.amended}
              corporate_name={formData.corporate_name}
              business_or_trade_name={formData.business_or_trade_name}
              sec_registration_number={formData.sec_registration_number}
              date_of_annual_meeting={formData.date_of_annual_meeting}
              actual_date_of_annual_meeting={
                formData.actual_date_of_annual_meeting
              }
              complete_principal_office_address={
                formData.complete_principal_office_address
              }
              //view2
              date_registered={formData.date_registered}
              fiscal_year_end={formData.fiscal_year_end}
              corporate_tin={formData.corporate_tin}
              website_url_address={formData.website_url_address}
              official_email_address={formData.official_email_address}
              fax_number={formData.fax_number}
              alternate_phone_number={formData.alternate_phone_number}
              telephone_number={formData.telephone_number}
              geographical_code={formData.geographical_code}
              //view3
              alternate_email_address={formData.alternate_email_address}
              official_mobile_number={formData.official_mobile_number}
              name_of_external_auditor={formData.name_of_external_auditor}
              sec_accreditation_number={formData.sec_accreditation_number}
              industry_classification={formData.industry_classification}
              primary_purpose={formData.primary_purpose}
            />
          )}
          <PageTwo natureOfService={formData.nature_of_business} />
          <PageThree
            formData={formData}
            corporate_name={formData.corporate_name}
            auth_capital_stock={formData.auth_capital_stock.capital_stocks}
            auth_capital_stock_total_number_of_shares={
              formData.auth_capital_stock.total_number_of_shares
            }
            auth_capital_stock_total_amount={
              formData.auth_capital_stock.total_amount
            }
            subscribe_capital_filipino={formData.subscribe_capital.filipino}
            subscribe_capital_foreign={formData.subscribe_capital.foreign}
            sub_total_number_of_shares_filipino={
              formData.subscribe_capital.sub_total_number_of_shares_filipino
            }
            sub_total_amount_filipino={
              formData.subscribe_capital.sub_total_amount_filipino
            }
            sub_total_ownership_filipino={
              formData.subscribe_capital.sub_total_ownership_filipino
            }
            percentage_of_foreign_equity={
              formData.subscribe_capital.percentage_of_foreign_equity
            }
            sub_total_number_of_shares_foreign={
              formData.subscribe_capital.sub_total_number_of_shares_foreign
            }
            sub_total_amount_foreign={
              formData.subscribe_capital.sub_total_amount_foreign
            }
            sub_total_ownership_foreign={
              formData.subscribe_capital.sub_total_ownership_foreign
            }
            subscribe_capital_total_amount={
              formData.subscribe_capital.total_amount
            }
            subscribe_capital_total_percent_of_ownership={
              formData.subscribe_capital.total_percent_of_ownership
            }
            filipino_paid_up_capital={formData.paid_up_capital.filipino}
            foreign_paid_up_capital={formData.paid_up_capital.foreign}
            paid_up_sub_total_amount_filipino={
              formData.paid_up_capital.sub_total_amount_filipino
            }
            paid_sub_total_ownership_filipino={
              formData.paid_up_capital.sub_total_ownership_filipino
            }
            paid_sub_total_number_of_shares_filipino={
              formData.paid_up_capital.sub_total_number_of_shares_filipino
            }
            paid_up_sub_total_amount_foreign={
              formData.paid_up_capital.sub_total_amount_foreign
            }
            paid_sub_total_ownership_foreign={
              formData.paid_up_capital.sub_total_ownership_foreign
            }
            paid_sub_total_number_of_shares_foreign={
              formData.paid_up_capital.sub_total_number_of_shares_foreign
            }
            paid_up_capital_total_amount={formData.paid_up_capital.total_amount}
            paid_up_capital_total_percent_of_ownership={
              formData.paid_up_capital.total_percent_of_ownership
            }
            paid_total_percent_ownership={
              formData.paid_up_capital.total_percent_of_ownership
            }
          />
          <PageFour
            formData={formData}
            directors_or_officers={formData.directors_or_officers}
            corporate_name={formData.corporate_name}
          />
          <PageFive
            formData={formData}
            corporate_name={formData.corporate_name}
            total_number_of_stockholders={formData.total_number_of_stockholders}
            number_of_stockholders_with_more_shares_each={
              formData.number_of_stockholders_with_more_shares_each
            }
            total_assets_based_on_latest_audited={
              formData.total_assets_based_on_latest_audited
            }
            stock_holders_information={
              formData.stock_holders_information.information
            }
            subscribe_capital_total_amount={
              formData.subscribe_capital.total_amount
            }
            subscribe_capital_total_percent_of_ownership={
              formData.subscribe_capital.total_percent_of_ownership
            }
          />
          <PageSix
            formData={formData}
            corporate_name={formData.corporate_name}
            total_number_of_stockholders={formData.total_number_of_stockholders}
            number_of_stockholders_with_more_shares_each={
              formData.number_of_stockholders_with_more_shares_each
            }
            total_assets_based_on_latest_audited={
              formData.total_assets_based_on_latest_audited
            }
            stock_holders_information={
              formData.stock_holders_information.information
            }
            subscribe_capital_total_amount={
              formData.subscribe_capital.total_amount
            }
            subscribe_capital_total_percent_of_ownership={
              formData.subscribe_capital.total_percent_of_ownership
            }
          />
          <PageSeven
            formData={formData}
            corporate_name={formData.corporate_name}
            total_number_of_stockholders={formData.total_number_of_stockholders}
            number_of_stockholders_with_more_shares_each={
              formData.number_of_stockholders_with_more_shares_each
            }
            total_assets_based_on_latest_audited={
              formData.total_assets_based_on_latest_audited
            }
            stock_holders_information={
              formData.stock_holders_information.information
            }
            subscribe_capital_total_amount={
              formData.subscribe_capital.total_amount
            }
            subscribe_capital_total_percent_of_ownership={
              formData.subscribe_capital.total_percent_of_ownership
            }
          />
          <PageEight corporate_name={formData.corporate_name} />
          <PageNine
            formData={formData}
            corporate_secretary={formData.corporate_secretary}
            coporate_name={formData.corporate_name}
          />
          <PageTen
            formData={formData}
            corporate_name={formData.corporate_name}
            sec_registration_number={formData.sec_registration_number}
            beneficial_ownership_declaration={
              formData.beneficial_ownership_declaration
            }
            year={formData.year}
          />
        </Document>
      </PDFViewer>
    );
  };

  useEffect(() => {
    dispatch(fetchRecord(recordId));
  }, []);

  useEffect(() => {
    setFormData(selectedRecord.draftingInput);
  }, [selectedRecord]);

  return (
    <>
      <button
        onClick={() => {
          navigate("/gis");
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
                <span className="poppins-bold text-[18px]">
                  {selectedRecord.companyName}
                </span>
                {/* <span className="poppins-bold text-[18px]">{selectedRecord.recordName}</span> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col text-end">
            <span className="poppins-medium text-[10px]">Last Modified By</span>
            <span className="poppins-semibold text-[16px]">
              {selectedRecord.modified_by}
            </span>
          </div>
        </div>
        <hr />
        <div className="flex flex-row mt-5 w-full gap-2">
          <div className="w-[70%]">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div className="w-full text-start h-screen">
                  {PDFViewerComponent()}
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
                  document.getElementById("revertModal").showModal();
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
                className={`textarea textarea-bordered h-24 ${
                  errors.comments && " textarea-error"
                }`}
                onChange={(e) => {
                  handleChangeComment(e);
                }}
                value={comment}
              ></textarea>
              {errors.comments && (
                <span className="text-[12px] text-red-500">
                  {errors.comments}
                </span>
              )}
            </label>
          </div>
        </div>
      </div>

      <dialog id="revertModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full items-center justify-center gap-2">
              <svg
                className="w-24 aspect-auto"
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
                  className={`textarea textarea-bordered h-24 ${
                    errors.comments && " textarea-error"
                  }`}
                  onChange={(e) => {
                    handleChangeComment(e);
                  }}
                  value={comment}
                ></textarea>
                {errors.comments && (
                  <span className="text-[12px] text-red-500">
                    {errors.comments}
                  </span>
                )}
              </label>
            </div>
            <div className="flex flex-row gap-10 items-center justify-center">
              <button
                onClick={(e) => {
                  revertBtn();
                }}
                className="btn bg-[#6F7496] text-white mt-2"
              >
                Revert
              </button>
              <button
                onClick={(e) => {
                  document.getElementById("revertModal").close();
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
