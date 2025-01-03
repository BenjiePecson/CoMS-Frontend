import React, { useEffect } from "react";
import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageFour from "../photos/page4_new.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });

const styles = StyleSheet.create({
  corporateName: {
    marginTop: 92,
    marginLeft: 120,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },
  directorsOfficer: {
    marginTop: 146,
    marginLeft: 32,
  },
  directorsOfficerInfo: {
    display: "flex",
    flexDirection: "row",
    margin: "3px",
    height: "24px",
  },
  nameAddress: {
    width: "162px",
    flexDirection: "column",
  },
  name: { fontFamily: "Times-Bold", fontSize: "8px" },
  address: {
    fontFamily: "Times-Roman",
    width: "100px",
    fontSize: "6px",
  },
  nationality: {
    width: "65px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  incr: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  board: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  gender: { width: "38px", fontFamily: "Times-Bold", fontSize: "10px" },
  stockHolder: { width: "37px", fontFamily: "Times-Bold", fontSize: "10px" },
  officer: { width: "50px", fontFamily: "Times-Bold", fontSize: "7px" },
  execCom: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  tin: { width: "", fontFamily: "Times-Bold", fontSize: "10px" },
});

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

const WrapText = (text, justifyContent, textAlign, fontSize) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: justifyContent,
      }}
    >
      {text?.match(/\w+|\W+/g)?.map((seg, i) => (
        <Text key={i} style={{ textAlign: textAlign, fontSize: fontSize }}>
          {seg}
        </Text>
      ))}
    </View>
  );
};

function PageFour({ formData, directors_or_officers, corporate_name }) {
  const baseFontSize = 12; // Base font size

  const page4_old = () => {
    return (
      <Page size="A4" style={{ position: "relative" }}>
        <Text style={styles.corporateName}>{corporate_name}</Text>
        <View style={styles.directorsOfficer}>
          {directors_or_officers.map((txt, index) => (
            <View key={index} style={styles.directorsOfficerInfo}>
              <View style={styles.nameAddress}>
                <Text style={styles.name}>{txt.name}</Text>
                <Text style={styles.address}>
                  {txt.current_residual_address}
                </Text>
              </View>
              <Text style={styles.nationality}>{txt.nationality}</Text>
              <Text style={styles.incr}>{txt.incorporator}</Text>
              <Text style={styles.board}>{txt.board}</Text>
              <Text style={styles.gender}>{txt.gender}</Text>
              <Text style={styles.stockHolder}>{txt.stock_holder}</Text>
              <Text style={styles.officer}>{txt.officer}</Text>
              <Text style={styles.execCom}>{txt.executive_committe}</Text>
              <Text style={styles.tin}>{txt.tax_id_number}</Text>
            </View>
          ))}
        </View>
        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
          }}
          src={pageFour}
        ></Image>
      </Page>
    );
  };

  const page4 = () => {
    return (
      <Page
        size="A4"
        style={{
          position: "relative",
          fontFamily: "Cambria",
          fontSize: baseFontSize,
        }}
      >
        <View>
          <View
            style={{
              marginTop: 62,
              marginLeft: 91,
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
                width: "416px",
                height: "15px",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formData.corporate_name.length,
                    76,
                    baseFontSize - 2
                  ),
                  textAlign: "center",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formData.corporate_name.toUpperCase()}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 113,
              marginLeft: 45,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {formData.directors_or_officers.map((director, index) => {
              return (
                <View
                  key={`director_${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "col",
                      width: "140px",
                      height: "30px",
                    }}
                  >
                    <View
                      style={
                        {
                          // height: "10px",
                        }
                      }
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            director.name.length,
                            36,
                            baseFontSize - 4
                          ),
                          fontFamily: "CambriaBold",
                        }}
                      >
                        {director.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        // height: "17px",
                        paddingRight: "2px",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Text
                        style={{
                          fontSize: getFontSize(
                            director.current_residual_address.length,
                            58,
                            baseFontSize - 4
                          ),
                          textAlign: "justify",
                          padding: "2px",
                        }}
                      >
                        {director.current_residual_address}
                      </Text> */}
                      {WrapText(
                        director.current_residual_address,
                        "flex-start",
                        "start",
                        getFontSize(
                          director.current_residual_address.length,
                          85,
                          baseFontSize - 5
                        )
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "62px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.nationality.length,
                          36,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.nationality}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "35px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.incorporator.length,
                          8,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.incorporator}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "32px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.board != undefined && director.board.length,
                          8,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.board != undefined && director.board}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "35px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.gender.length,
                          8,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.gender}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "44px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.stock_holder.length,
                          8,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.stock_holder}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "44px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.officer.length,
                          15,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.officer}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "31px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.executive_committe.length,
                          9,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.executive_committe}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "87px",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          director.tax_id_number.length,
                          66,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {director.tax_id_number}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
          }}
          src={pageFour}
        ></Image>
      </Page>
    );
  };

  return page4();
}

export default PageFour;
