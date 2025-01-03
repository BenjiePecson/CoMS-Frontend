import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageOne from "../photos/page1.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";
import moment from "moment/moment";

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

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });

const styles = StyleSheet.create({
  year: {
    // fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 68,
    marginLeft: 295,
    position: "absolute",
  },
  amended: {
    // fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 68,
    marginLeft: 330,
    position: "absolute",
  },
  view1: {
    // fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 305,
    marginLeft: 470,
    position: "absolute",
  },
  text1_1: {
    height: "30px",
  },
  text1_1_1: {
    height: "32px",
  },
  text1_2: {
    height: "39px",
  },
  text1_3: {
    height: "26px",
  },
  text1_4: { height: "20px" },
  text1_5: { height: "30px", width: "400px" },
  text1_6: { width: "400px" },
  text2_1_1: { height: "45px" },
  text2_2: { height: "48px" },
  text2_3: { height: "33px" },
  text2_4: { height: "30px" },
  text2_5: { height: "32px" },
  text2_6: { height: "40px" },
  view2: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 305,
    marginLeft: 60,
    position: "absolute",
  },
  view3: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 524,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  text2_1: {
    width: "51%",
  },
  //for view 5
  text3_1: {
    width: "280px",
  },
  text3_2: {
    width: "130px",
    marginBottom: 10,
  },
  //
  text2_2_1: {
    width: "140px",
  },
  view4: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 560,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  view5: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 595,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
});

function PageOne({
  formData,
  year,
  isAmended,
  corporate_name,
  business_or_trade_name,
  sec_registration_number,
  date_of_annual_meeting,
  actual_date_of_annual_meeting,
  complete_principal_office_address,
  date_registered,
  fiscal_year_end,
  corporate_tin,
  website_url_address,
  official_email_address,
  fax_number,
  alternate_phone_number,
  telephone_number,
  geographical_code,
  alternate_email_address,
  official_mobile_number,
  name_of_external_auditor,
  sec_accreditation_number,
  industry_classification,
  primary_purpose,
}) {
  const baseFontSize = 12; // Base font size

  const text =
    "To provide user support services, including but not limited to providing remote technical support services, customer support, customer careaa customer careaa customer careaa customer careaa customer careaa careaa customer careaa careaa customer careaa ";

  const textCounter = (text) => {
    console.log(text.length);
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

  return (
    <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
      <Text style={styles.year}>{year}</Text>
      <Text style={styles.amended}>{isAmended ? "AMENDED" : ""}</Text>
      {/* <View style={styles.view1}>
        <Text style={styles.text2_1_1}>{date_registered}</Text>
        <Text style={styles.text2_2}>{fiscal_year_end}</Text>
        <Text style={styles.text2_3}>{corporate_tin}</Text>
        <Text style={styles.text2_4}>{website_url_address}</Text>
        <Text style={styles.text2_5}>{official_email_address}</Text>
        <Text style={styles.text2_5}>{fax_number}</Text>
        <Text style={styles.text2_5}>{alternate_phone_number}</Text>
        <Text style={styles.text2_6}>{telephone_number}</Text>
        <Text>{geographical_code}</Text>
      </View> */}
      {/* <View style={styles.view2}>
        <Text style={styles.text1_1}>{corporate_name}</Text>
        <Text style={styles.text1_1_1}>{business_or_trade_name}</Text>
        <Text style={styles.text1_2}>{sec_registration_number}</Text>
        <Text style={styles.text1_3}>{date_of_annual_meeting}</Text>
        <Text style={styles.text1_4}>{actual_date_of_annual_meeting}</Text>
        <Text style={styles.text1_5}>{complete_principal_office_address}</Text>
        <Text style={styles.text1_5}>{complete_principal_office_address}</Text>
      </View> */}
      {/* <View style={styles.view3}>
        <Text style={styles.text2_2_1}>{official_email_address}</Text>
        <Text style={styles.text2_2_1}>{alternate_email_address}</Text>
        <Text style={styles.text2_2_1}>{official_mobile_number}</Text>
      </View> */}
      {/* <View style={styles.view4}>
        <Text style={styles.text2_1}>{name_of_external_auditor}</Text>
        <Text style={styles.text2_1}>{sec_accreditation_number}</Text>
      </View> */}
      {/* <View style={styles.view5}>
        <Text style={styles.text3_1}>{primary_purpose}</Text>
        <Text style={styles.text3_2}>{industry_classification}</Text>
      </View> */}

      <View
        style={{
          marginTop: 297,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "20px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                corporate_name.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              fontFamily: "CambriaBold",
              width: "100%",
            }}
          >
            {corporate_name.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "115px",
            padding: "2px",
            height: "32px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                moment(date_registered).format("MMMM DD, YYYY").length,
                43,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {moment(date_registered).format("MMMM DD, YYYY")}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 326,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "22px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                business_or_trade_name.length,
                104,
                baseFontSize - 2
              ),
              fontFamily: "CambriaBold",
              textAlign: "center",
              width: "100%",
            }}
          >
            {business_or_trade_name.toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 340,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "22px",
            marginTop: "17px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                sec_registration_number.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {sec_registration_number}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "36px",
            marginTop: "3px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                fiscal_year_end.length,
                43,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {fiscal_year_end}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 390,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                date_of_annual_meeting.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {date_of_annual_meeting}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "25px",
            marginTop: "3px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(corporate_tin.length, 21, baseFontSize - 2),
              textAlign: "center",
            }}
          >
            {corporate_tin}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 428,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "16px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                actual_date_of_annual_meeting.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {actual_date_of_annual_meeting}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "15px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                website_url_address.length,
                22,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {website_url_address}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 452,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "22px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                complete_principal_office_address.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {complete_principal_office_address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "18px",
            marginTop: "4",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                official_email_address.length,
                20,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {official_email_address}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 482,
          marginLeft: 18,
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
            width: "445px",
            padding: "2px",
            height: "26px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                complete_principal_office_address.length,
                104,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {complete_principal_office_address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "26px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(fax_number.length, 57, baseFontSize - 2),
              textAlign: "center",
            }}
          >
            {fax_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          fontSize: "10px",
          marginTop: 516,
          marginLeft: 18,
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
            width: "143px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                official_email_address.length,
                32,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {official_email_address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "162px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                alternate_email_address.length,
                57,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {alternate_email_address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "140px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                official_mobile_number.length,
                44,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {official_mobile_number}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "114px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                alternate_phone_number.length,
                44,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {alternate_phone_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          fontSize: "10px",
          marginTop: 553,
          marginLeft: 20,
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
            width: "300px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                name_of_external_auditor.length,
                122,
                baseFontSize - 2
              ),
              textAlign: "center",
              width: "100%",
            }}
          >
            {name_of_external_auditor}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "138px",
            padding: "2px",
            height: "28px",
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                sec_accreditation_number.length,
                57,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {sec_accreditation_number}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                telephone_number.length,
                44,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {telephone_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          fontSize: "10px",
          marginTop: 592,
          marginLeft: 20,
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
            width: "300px",
            padding: "2px",
            height: "28px",
          }}
        >
          {/* {primary_purpose != undefined && (
            <Text
              style={{
                fontSize: getFontSize(
                  primary_purpose.length,
                  131,
                  baseFontSize - 2
                ),
                // fontSize: baseFontSize -2,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {primary_purpose}
            </Text>
          )} */}
          {primary_purpose != "" &&
            primary_purpose != undefined &&
            WrapText(
              primary_purpose,
              "center",
              "center",
              getFontSize(primary_purpose.length, 131, baseFontSize - 2)
            )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "138px",
            padding: "2px",
            height: "28px",
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                industry_classification.length,
                57,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {industry_classification}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "115px",
            padding: "2px",
            height: "28px",
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(
                geographical_code.length,
                44,
                baseFontSize - 2
              ),
              textAlign: "center",
            }}
          >
            {geographical_code}
          </Text>
        </View>
      </View>

      <View
        style={{
          fontSize: "10px",
          marginTop: 647,
          marginLeft: 18,
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
            width: "215px",
            height: "17px",
          }}
        >
          {formData.affiliations.parent.name != "" &&
            formData.affiliations.parent.name != undefined && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {formData.affiliations.parent.name
                  ?.match(/\w+|\W+/g)
                  ?.map((seg, i) => (
                    <Text
                      key={i}
                      style={{
                        textAlign: "center",
                        fontSize: getFontSize(
                          formData.affiliations.parent.name.length,
                          48,
                          baseFontSize - 2
                        ),
                      }}
                    >
                      {seg}
                    </Text>
                  ))}
              </View>
            )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "125px",
            height: "17px",
          }}
        >
          {formData.affiliations.parent.sec_no != "" &&
            formData.affiliations.parent.sec_no != undefined && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {formData.affiliations.parent.sec_no
                  ?.match(/\w+|\W+/g)
                  ?.map((seg, i) => (
                    <Text
                      key={i}
                      style={{
                        textAlign: "center",
                        fontSize: getFontSize(
                          formData.affiliations.parent.sec_no.length,
                          27,
                          baseFontSize - 2
                        ),
                      }}
                    >
                      {seg}
                    </Text>
                  ))}
              </View>
            )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "220px",
            height: "17px",
          }}
        >
          {formData.affiliations.parent.address != "" &&
            formData.affiliations.parent.address != undefined && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {formData.affiliations.parent.address
                  ?.match(/\w+|\W+/g)
                  ?.map((seg, i) => (
                    <Text
                      key={i}
                      style={{
                        textAlign: "center",
                        fontSize: getFontSize(
                          formData.affiliations.parent.address.length,
                          48,
                          baseFontSize - 2
                        ),
                      }}
                    >
                      {seg}
                    </Text>
                  ))}
              </View>
            )}
        </View>
      </View>

      <View
        style={{
          fontSize: "10px",
          marginTop: 674,
          marginLeft: 18,
          position: "absolute",
          display: "flex",
          flexDirection: "col",
        }}
      >
        {formData.affiliations.subsidiary_affiliate.length != 0 &&
          formData.affiliations.subsidiary_affiliate != undefined &&
          formData.affiliations.subsidiary_affiliate
            .slice(0, 5)
            .map((affiliate, index) => {
              return (
                <View
                  key={`aff-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "215px",
                      height: "17px",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {affiliate.name?.match(/\w+|\W+/g)?.map((seg, i) => (
                        <Text
                          key={i}
                          style={{
                            textAlign: "center",
                            fontSize: getFontSize(
                              affiliate.name.length,
                              48,
                              baseFontSize - 2
                            ),
                          }}
                        >
                          {seg}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "125px",
                      height: "17px",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {affiliate.sec_no?.match(/\w+|\W+/g)?.map((seg, i) => (
                        <Text
                          key={i}
                          style={{
                            textAlign: "center",
                            fontSize: getFontSize(
                              affiliate.sec_no.length,
                              27,
                              baseFontSize - 2
                            ),
                          }}
                        >
                          {seg}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "220px",
                      height: "17px",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {affiliate.address?.match(/\w+|\W+/g)?.map((seg, i) => (
                        <Text
                          key={i}
                          style={{
                            textAlign: "center",
                            fontSize: getFontSize(
                              affiliate.address.length,
                              48,
                              baseFontSize - 2
                            ),
                          }}
                        >
                          {seg}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              );
            })}
      </View>

      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageOne}
      ></Image>
    </Page>
  );
}

PageOne.defaultProps = {
  year: "N/A",
  corporateName: "N/A",
};

export default PageOne;
