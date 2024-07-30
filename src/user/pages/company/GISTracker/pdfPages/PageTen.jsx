import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageTen from "../photos/page10_blank.jpg";
import { useEffect, useState } from "react";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";
import CambriaBoldItalic from "/fonts/CambriaBoldItalic.ttf";

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });
Font.register({ family: "CambriaBoldItalic", src: CambriaBoldItalic });

const styles = StyleSheet.create({
  header: {
    marginTop: 80,
    marginLeft: 250,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
    textAlign: "center",
  },
  year: {
    fontFamily: "Times-Bold",
    margin: "5px",
    fontSize: "10px",
    marginTop: 71,
    marginLeft: 330,
    position: "absolute",
  },

  view1: {
    marginTop: 653,
    marginLeft: 40,
  },
  view1_1: {
    fontSize: "10px",
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  text1: {
    width: "86px",
    fontFamily: "Times-Bold",
    fontSize: "10px",
  },
  text2: {
    marginTop: -4,
    width: "84px",
    fontFamily: "Times-Roman",
    fontSize: "6px",
  },
  text3: {
    width: "56px",
    fontFamily: "Times-Bold",
    fontSize: "10px",
  },
  text4: {
    width: "55px",
    fontFamily: "Times-Bold",
    fontSize: "10px",
  },
  text5: {
    width: "72px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  text6: {
    width: "60px",
    fontFamily: "Times-Bold",
    fontSize: "10px",
  },
  text7: {
    width: "60px",
    fontFamily: "Times-Bold",
    fontSize: "10px",
  },
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

// Function to format number with comma for thousands and above
const formatNumberWithComma = (number) => {
  // Convert number to fixed 2 decimal places
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PageTen = ({
  formData,
  beneficial_ownership_declaration,
  year,
  corporate_name,
  sec_registration_number,
}) => {
  const [pageWidth, setPageWidth] = useState(100);
  const [bodTOP, setBODTop] = useState(535);

  useEffect(() => {
    if (formData.corporate_name != "") {
      if (formData.beneficial_ownership_declaration.length == 1) {
        setBODTop(555);
      } else if (formData.beneficial_ownership_declaration.length == 2) {
        setBODTop(550);
      } else if (formData.beneficial_ownership_declaration.length == 3) {
        setBODTop(545);
      } else if (formData.beneficial_ownership_declaration.length == 4) {
        setBODTop(540);
      }
    }
  }, [formData]);

  const page10_old = () => {
    return (
      <Page size="A4" style={{ position: "relative" }}>
        <View style={styles.header}>
          <Text>{sec_registration_number}</Text>
          <Text>{corporate_name}</Text>
        </View>
        <Text style={styles.year}>{year}</Text>

        <View style={styles.view1}>
          {beneficial_ownership_declaration.map((text, index) => (
            <View key={index} style={styles.view1_1}>
              <Text style={styles.text1}>{text.complete_name}</Text>
              <Text style={styles.text2}>{text.specific_residual_address}</Text>
              <Text style={styles.text3}>{text.nationality}</Text>
              <Text style={styles.text4}>{text.date_of_birth}</Text>
              <Text style={styles.text5}>{text.tax_id_number}</Text>
              <Text style={styles.text6}>{text.percent_of_ownership}</Text>
              <Text style={styles.text7}>{text.type_of_beneficial_owner}</Text>
              <Text>{text.category_of_beneficial_ownership}</Text>
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
          src={pageTen}
        ></Image>
      </Page>
    );
  };

  const page10 = () => {
    const baseFontSize = 12;

    let addBorder = {
      borderTop: "1px solid black",
      borderLeft: "1px solid black",
    };

    return (
      <Page
        size="A4"
        style={{
          position: "relative",
          fontFamily: "Cambria",
          fontSize: baseFontSize,
        }}
      >
        <View style={{ position: "absolute", width: "100%" }}>
          <View
            style={{
              marginTop: 40,
              marginLeft: 320,
            }}
          >
            <View
              style={{
                width: 62,
                height: "15px",
                display: "flex",
                flexDirection: "col",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: baseFontSize - 4,
                  fontFamily: "CambriaBold",
                }}
              >
                {formData.year}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 55,
              marginLeft: 160,
              position: "absolute",
            }}
          >
            <View
              style={{
                width: 400,
                height: "12px",
                display: "flex",
                flexDirection: "col",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: baseFontSize - 4,
                  fontFamily: "CambriaBold",
                }}
              >
                {formData.sec_registration_number}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 66,
              marginLeft: 160,
              position: "absolute",
            }}
          >
            <View
              style={{
                width: 400,
                height: "12px",
                display: "flex",
                flexDirection: "col",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: baseFontSize - 4,
                  fontFamily: "CambriaBold",
                }}
              >
                {formData.corporate_name}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: `${bodTOP}px`,
              position: "absolute",
              width: "100%",
            }}
          >
            <View
              style={{
                padding: "0px 20px",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  fontSize: baseFontSize - 4,
                  display: "flex",
                  gap: "5",
                  // border: "1px solid red",
                }}
              >
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontFamily: "CambriaBold",
                    }}
                  >
                    <View
                      style={{
                        ...addBorder,
                        width: "15%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        COMPLETE NAME (Surname, Given Name, Middle Name, Name
                        Extension (i.e., Jr., Sr., III)
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "15%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        SPECIFIC RESIDENTIAL ADDRESS
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "12%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        NATIONALITY
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "12%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        DATE OF BIRTH
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "12%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        TAX IDENTIFICATION NO.
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "12%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        % OF OWNERSHIP / % OF VOTING RIGHTS
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        width: "12%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        TYPE OF BENEFICIAL OWNER Direct (D) or Indirect (I)
                      </Text>
                    </View>
                    <View
                      style={{
                        ...addBorder,
                        borderRight: "1px solid black",
                        width: "10%",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ textAlign: "center", padding: "5px" }}>
                        CATEGORY OF BENEFICIAL OWNERSHIP
                      </Text>
                    </View>
                  </View>
                  {formData.beneficial_ownership_declaration.length != 0
                    ? formData.beneficial_ownership_declaration.map(
                        (bod, index) => {
                          addBorder = {
                            ...addBorder,
                            borderBottom: `${
                              // formData.beneficial_ownership_declaration.length - 1 ==
                              // index
                              formData.beneficial_ownership_declaration.length -
                                1 ===
                              index
                                ? "1px"
                                : "0px"
                            } solid black`,
                          };

                          return (
                            <View
                              key={`bod_${index}`}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <View
                                style={{
                                  ...addBorder,
                                  width: "15%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "5px",
                                    fontSize: getFontSize(
                                      bod.complete_name.length,
                                      17,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.complete_name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "15%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "0px",
                                    fontSize: getFontSize(
                                      bod.specific_residual_address.length,
                                      38,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.specific_residual_address}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "12%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.nationality.length,
                                      15,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.nationality}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "12%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.date_of_birth.length,
                                      30,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.date_of_birth}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "12%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.tax_id_number.length,
                                      26,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.tax_id_number}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "12%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.percent_of_ownership.length,
                                      26,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {`${bod.percent_of_ownership}%`}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  width: "12%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.type_of_beneficial_owner.length,
                                      26,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.type_of_beneficial_owner}
                                </Text>
                              </View>
                              <View
                                style={{
                                  ...addBorder,
                                  borderRight: "1px solid black",
                                  width: "10%",
                                  height: "30px",
                                  display: "flex",
                                  flexDirection: "col",
                                  justifyContent: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    textAlign: "center",
                                    padding: "2px",
                                    fontSize: getFontSize(
                                      bod.category_of_beneficial_ownership
                                        .length,
                                      24,
                                      baseFontSize - 4
                                    ),
                                  }}
                                >
                                  {bod.category_of_beneficial_ownership}
                                </Text>
                              </View>
                            </View>
                          );
                        }
                      )
                    : [
                        {
                          complete_name: "",
                          specific_residual_address: "",
                          nationality: "",
                          date_of_birth: "",
                          tax_id_number: "",
                          percent_of_ownership: "",
                          type_of_beneficial_owner: "",
                          category_of_beneficial_ownership: "",
                        },
                      ].map((bod, index) => {
                        addBorder = {
                          ...addBorder,
                          borderBottom: `1px solid black`,
                        };

                        return (
                          <View
                            key={`bod_${index}`}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <View
                              style={{
                                ...addBorder,
                                width: "15%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "5px",
                                  fontSize: getFontSize(
                                    bod.complete_name.length,
                                    17,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.complete_name}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "15%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: getFontSize(
                                    bod.specific_residual_address.length,
                                    38,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.specific_residual_address}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "12%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.nationality.length,
                                    15,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.nationality}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "12%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.date_of_birth.length,
                                    30,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.date_of_birth}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "12%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.tax_id_number.length,
                                    26,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.tax_id_number}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "12%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.percent_of_ownership.length,
                                    26,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {`${bod.percent_of_ownership}`}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                width: "12%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.type_of_beneficial_owner.length,
                                    26,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.type_of_beneficial_owner}
                              </Text>
                            </View>
                            <View
                              style={{
                                ...addBorder,
                                borderRight: "1px solid black",
                                width: "10%",
                                height: "30px",
                                display: "flex",
                                flexDirection: "col",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: "2px",
                                  fontSize: getFontSize(
                                    bod.category_of_beneficial_ownership.length,
                                    24,
                                    baseFontSize - 4
                                  ),
                                }}
                              >
                                {bod.category_of_beneficial_ownership}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                </View>
                <View style={{ marginTop: `${bodTOP - 535}px` }}>
                  <Text style={{ fontFamily: "CambriaBoldItalic" }}>
                    Note: This page is not for uploading on the SEC iView.
                  </Text>
                  <View
                    style={{
                      marginLeft: "30px",
                      marginTop: `3px`,
                    }}
                  >
                    <Text>1 For Stock Corporations.</Text>
                    <Text>2 For Non-Stock Corporations</Text>
                    <Text>3 For Stock Corporations.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: `100%`,
          }}
          src={pageTen}
        ></Image>
      </Page>
    );
  };

  return page10();
};

export default PageTen;
