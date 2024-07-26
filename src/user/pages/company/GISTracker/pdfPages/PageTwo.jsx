import React from "react";
import { Page, Text, Image, StyleSheet, Font, View } from "@react-pdf/renderer";
import pageTwo from "../photos/page2.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";

const styles = StyleSheet.create({
  natureOfBusiness: {
    fontFamily: "Cambria",
    margin: "5px",
    fontSize: "10px",
    marginTop: 630,
    marginLeft: 430,
    backgroundColor: "red",
  },
});

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });

function PageTwo({ natureOfService }) {
  const baseFontSize = 10; // Base font size
  // Function to determine font size based on text length
  const getFontSize = (textLength, maxLength, baseSize) => {
    if (textLength > maxLength) {
      // Calculate the ratio of maxLength to textLength
      let ratio = maxLength / textLength;

      // Calculate the adjusted font size
      let fontSize = baseSize * ratio;

      // Ensure fontSize is not too small
      if (fontSize < baseSize * 0.5) {
        // You can adjust this threshold as needed
        fontSize = baseSize * 0.5; // Set a minimum font size to maintain readability
      }

      return fontSize;
    }
    return baseSize;
  };

  return (
    <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
      <View
        style={{
          marginTop: 615,
          marginLeft: 380,
          position: "absolute",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "197px",
            padding: "2px",
            height: "44px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(natureOfService.length, 105, baseFontSize),
              textAlign: "center",
              width: "100%",
            }}
          >
            {natureOfService}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.natureOfBusiness}>{natureOfService}</Text> */}
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
