import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import PageTwo from "../pdfPages/PageTwo";
import PageThree from "../pdfPages/PageThree";
import PageFour from "../pdfPages/PageFour";
import PageFive from "../pdfPages/PageFive";
import PageOne from "../pdfPages/PageOne";
import PageSix from "../pdfPages/PageSix";
import PageSeven from "../pdfPages/PageSeven";
import PageEight from "../pdfPages/PageEight";
import PageNine from "../pdfPages/PageNine";
import PageTen from "../pdfPages/PageTen";

const step7 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  console.log(formData);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full p-5">
          <div className="my-5 w-full text-start h-screen">
            <PDFViewer
              style={{
                position: "relative",
                height: "100vh",
                width: "100%",
              }}
            >
              <Document title={`${formData.company_name} GIS ${formData.year}`}>
                <PageOne
                  //view1
                  year={formData.year}
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
                />
                <PageTwo natureOfService={formData.nature_of_business} />
                {/* <PageThree
                  auth_capital_stocks={formData.auth_capital_stocks}
                  auth_capital_total_number_of_shares={
                    formData.auth_capital_total_number_of_shares
                  }
                  auth_capital_total_amount={formData.auth_capital_total_amount}
                /> */}
                <PageFour />
                <PageFive />
                <PageSix />
                <PageSeven />
                <PageEight />
                <PageNine />
                <PageTen />
              </Document>
            </PDFViewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default step7;
