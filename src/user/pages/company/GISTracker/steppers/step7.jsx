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
                  primary_purpose={formData.primary_purpose}
                />
                <PageTwo natureOfService={formData.nature_of_business} />
                <PageThree
                  corporate_name={formData.corporate_name}
                  auth_capital_stock={
                    formData.auth_capital_stock.capital_stocks
                  }
                  auth_capital_stock_total_number_of_shares={
                    formData.auth_capital_stock.total_number_of_shares
                  }
                  auth_capital_stock_total_amount={
                    formData.auth_capital_stock.total_amount
                  }
                  subscribe_capital_filipino={
                    formData.subscribe_capital.filipino
                  }
                  subscribe_capital_foreign={formData.subscribe_capital.foreign}
                  sub_total_number_of_shares_filipino={
                    formData.subscribe_capital
                      .sub_total_number_of_shares_filipino
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
                    formData.subscribe_capital
                      .sub_total_number_of_shares_foreign
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
                  paid_up_capital_total_amount={
                    formData.paid_up_capital.total_amount
                  }
                  paid_up_capital_total_percent_of_ownership={
                    formData.paid_up_capital.total_percent_of_ownership
                  }
                  paid_total_percent_ownership={
                    formData.paid_up_capital.total_percent_of_ownership
                  }
                />
                <PageFour
                  directors_or_officers={formData.directors_or_officers}
                  corporate_name={formData.corporate_name}
                />
                <PageFive
                  corporate_name={formData.corporate_name}
                  total_number_of_stockholders={
                    formData.total_number_of_stockholders
                  }
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
                  corporate_name={formData.corporate_name}
                  total_number_of_stockholders={
                    formData.total_number_of_stockholders
                  }
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
                  corporate_name={formData.corporate_name}
                  total_number_of_stockholders={
                    formData.total_number_of_stockholders
                  }
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
                <PageEight />
                <PageNine
                  corporate_secretary={formData.corporate_secretary}
                  coporate_name={formData.corporate_name}
                />
                <PageTen
                  beneficial_ownership_declaration={
                    formData.beneficial_ownership_declaration
                  }
                  year={formData.year}
                />
              </Document>
            </PDFViewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default step7;
