import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageTen from "../photos/page10_new.jpg";

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

    return (
      <Page
        size="A4"
        style={{
          position: "relative",
          fontFamily: "Cambria",
          fontSize: baseFontSize,
        }}
      >
        <View style={{ position: "absolute" }}>
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
              marginTop: 623,
              marginLeft: 36,
              position: "absolute",
            }}
          >
            {formData.beneficial_ownership_declaration.map((bod, index) => {
              if (index > 2) {
                return <></>;
              }
              return (
                <View
                  key={`bod_${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "91px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.complete_name.length,
                            40,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.complete_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "84px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.specific_residual_address.length,
                            45,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.specific_residual_address}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "58px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.nationality.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.nationality}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "53px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.date_of_birth.length,
                            21,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.date_of_birth}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "61px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.tax_id_number.length,
                            13,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.tax_id_number}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "62px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.percent_of_ownership.length,
                            27,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {`${bod.percent_of_ownership}%`}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "56px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.type_of_beneficial_owner.length,
                            27,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.type_of_beneficial_owner}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "71px",
                        height: "25px",
                        display: "flex",
                        flexDirection: "col",
                        justifyContent: "center",
                        padding: "2px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            bod.category_of_beneficial_ownership.length,
                            27,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                        }}
                      >
                        {bod.category_of_beneficial_ownership}
                      </Text>
                    </View>
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
          src={pageTen}
        ></Image>
      </Page>
    );
  };

  return page10();
};

export default PageTen;
