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
import imagePage1 from "../../../../../assets/images/page1.jpg";

const step7 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
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

  const GISFormDocument = (
    <Document title={`${formData.company_name} GIS ${formData.year}`}>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.year}>{formData.year}</Text>
        <Text style={styles.corporate_name}>{formData.corporate_name}</Text>
        <Text style={styles.business_or_trade_name}>
          {formData.business_or_trade_name}
        </Text>
        <Text style={styles.sec_registration_number}>
          {formData.sec_registration_number}
        </Text>

        <Image style={styles.image} src={imagePage1}></Image>
      </Page>
    </Document>
  );

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
              {GISFormDocument}
            </PDFViewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default step7;
