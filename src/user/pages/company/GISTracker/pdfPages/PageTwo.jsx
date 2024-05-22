import React from "react";
import { Page, Text, Image, StyleSheet } from "@react-pdf/renderer";
import pageTwo from "../photos/page2.jpg";

const styles = StyleSheet.create({
  natureOfBusiness: {
    fontFamily: "Times-Bold",
    margin: "5px",
    fontSize: "10px",
    marginTop: 630,
    marginLeft: 430,
  },
});
function PageTwo({ natureOfService }) {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.natureOfBusiness}>{natureOfService}</Text>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageTwo}
      ></Image>
    </Page>
  );
}

export default PageTwo;
