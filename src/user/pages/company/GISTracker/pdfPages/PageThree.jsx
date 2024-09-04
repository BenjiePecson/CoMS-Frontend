import React, { useEffect } from "react";
import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageThree from "../photos/page3.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });
const styles = StyleSheet.create({
  corporateName: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    margin: "5px",
    marginTop: 99,
    marginLeft: 220,
    position: "absolute",
  },
  //Authorize Capital Stock
  autorizedCapitalStock: {
    marginTop: 170,
    position: "absolute",
  },
  displayFlex1: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 150,
  },
  authorizedCapitalStock1: { width: "20%" },
  authorizedCapitalStock2: { width: "25%" },
  authorizedCapitalStock3: { width: "25%" },
  authorizedCapitalStock4: { width: "25%" },

  displayFlexTotal: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 240,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 213,
    position: "absolute",
  },
  authorizedCapitalStockTotal1: {
    width: "55%",
  },
  authorizedCapitalStockTotal2: {
    width: "70%",
  },

  //Filipino Subscribe Capital
  filipinosubscribeCapitalStyle: {
    marginTop: 285,
    position: "absolute",
  },
  displayFlex2: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 50,
  },
  fcs1: {
    width: "10%",
  },
  fcs2: {
    width: "10%",
  },
  fcs3: { width: "14%" },
  fcs4: { width: "15%" },
  fcs5: { width: "10%" },
  fcs6: { width: "13%" },
  fcs7: { width: "17%" },
  fcs8: { width: "10%" },
  displayTotalFlex2: {
    marginTop: 328,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  fcs9: { width: "200px" },
  fcs10: { width: "95px" },

  //FOREIGN SUBSCRIBED CAPITAL
  foreignsubscribeCapitalStyle: {
    marginTop: 390,
    position: "absolute",
  },
  displayFlex3: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 20,
  },
  fSubCap1: {
    fontSize: "7px",
    width: "15%",
  },
  fSubCap2: {
    width: "8%",
  },
  fSubCap3: {
    width: "15%",
  },
  fSubCap4: {
    width: "15%",
  },
  fSubCap5: {
    width: "8%",
  },
  fSubCap6: {
    width: "13%",
  },
  fSubCap7: {
    width: "16%",
  },
  fSubCap8: {
    width: "10%",
  },

  //Percentage of Foreign Equity
  foreignEquity: {
    marginTop: 443,
    marginLeft: 120,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
  foreignEquityText1: {
    width: "117px",
  },
  foreignEquityText2: {
    width: "198px",
  },
  foreignEquityText3: {
    width: "104px",
  },
  foreignEquityText4: {
    width: "",
  },

  foreignEquity2: {
    marginTop: 454,
    marginLeft: 435,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
  foreignEquityText5: {
    width: "65%",
  },
  foreignEquityText6: {
    width: "60%",
  },

  //Filipino Paid-Up Capital
  filipinoPaidUpCapitalText1: {
    marginTop: 510,
    marginLeft: 530,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },

  filipinoPaidUpCapitalText2: {
    width: "65%",
  },

  foreignPaidUpCapitalText1: {
    width: "71%",
  },
  //Updated
  filipinoPaidUpCapital: {
    marginTop: 510,
    position: "absolute",
  },
  filipinoPaidUpCapitalTotal: {
    marginTop: 563,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  foreignPaidUpCapitalTotal: {
    marginTop: 638,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  foreignPaidUpCapital: {
    marginTop: 585,
    position: "absolute",
  },
  totalPaidUp: {
    marginTop: 650,
    marginLeft: 435,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
  borderStyle: {
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
  },
});

const formatNumberWithComma = (number) => {
  // Convert number to fixed 2 decimal places
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function Definitions
const formatIntegerWithComma = (integerPart) => {
  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDecimalPlaces = (decimalPart) => {
  if (decimalPart === undefined) {
    return "00"; // No decimal part, return "00"
  }

  // Truncate or round to a maximum of four decimal places
  let formattedDecimalPart = decimalPart.substring(0, 4);

  // Ensure exactly two decimal places
  if (formattedDecimalPart.length === 0) {
    return "00"; // No decimal part at all
  } else if (formattedDecimalPart.length === 1) {
    return `${formattedDecimalPart}0`; // One decimal place, append one zero
  } else if (formattedDecimalPart.length === 2) {
    return `${formattedDecimalPart}`; // Two decimal places
  } else if (formattedDecimalPart.length === 3) {
    return `${formattedDecimalPart}`; // Three decimal places
  } else {
    return formattedDecimalPart; // Four decimal places or more, no extra padding needed
  }
};

const formatNumberWithCommaAndDecimal = (number) => {
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  const formattedIntegerPart = formatIntegerWithComma(integerPart);
  const formattedDecimalPart = formatDecimalPlaces(decimalPart);
  return `${formattedIntegerPart}.${formattedDecimalPart}`;
};

const formatNumberWithCommaOnly = (number) => {
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  if (decimalPart != undefined) {
    const formattedInteger = formatIntegerWithComma(integerPart);
    const formattedDecimal = decimalPart.substring(0, 4);
    return `${formattedInteger}.${formattedDecimal}`;
  }
  return formatIntegerWithComma(integerPart);
};

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

function PageThree({
  formData,
  corporate_name,
  auth_capital_stock,
  auth_capital_stock_total_number_of_shares,
  auth_capital_stock_total_amount,
  subscribe_capital_filipino,
  subscribe_capital_foreign,
  sub_total_number_of_shares_filipino,
  sub_total_amount_filipino,
  sub_total_ownership_filipino,
  percentage_of_foreign_equity,
  sub_total_number_of_shares_foreign,
  sub_total_amount_foreign,
  sub_total_ownership_foreign,
  subscribe_capital_total_amount,
  subscribe_capital_total_percent_of_ownership,
  filipino_paid_up_capital,
  foreign_paid_up_capital,
  paid_up_sub_total_amount_filipino,
  paid_sub_total_ownership_filipino,
  paid_sub_total_number_of_shares_filipino,
  paid_up_sub_total_amount_foreign,
  paid_sub_total_ownership_foreign,
  paid_sub_total_number_of_shares_foreign,
  paid_up_capital_total_amount,
  paid_total_percent_ownership,
}) {
  const baseFontSize = 12; // Base font size

  const old_page = () => {
    return (
      <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
        <View style={styles.autorizedCapitalStock}>
          {auth_capital_stock.map((txt, index) => (
            <View key={index} style={styles.displayFlex1}>
              <Text style={styles.authorizedCapitalStock1}>
                {txt.type_of_shares}
              </Text>
              <Text style={styles.authorizedCapitalStock2}>
                {formatNumberWithComma(txt.number_of_shares)}
              </Text>
              <Text style={styles.authorizedCapitalStock3}>
                {Number(txt.par_or_stated_value).toFixed(2)}
              </Text>
              <Text style={styles.authorizedCapitalStock4}>
                {formatNumberWithComma(Number(txt.amount).toFixed(2))}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.filipinosubscribeCapitalStyle}>
          {subscribe_capital_filipino.map((txt, index) => (
            <View key={index} style={styles.displayFlex2}>
              <Text style={styles.fcs1}></Text>
              <Text style={styles.fcs2}>{txt.number_of_stock_holders}</Text>
              <Text style={styles.fcs3}>{txt.types_of_shares}</Text>
              <Text style={styles.fcs4}>
                {formatNumberWithComma(txt.number_of_shares)}
              </Text>
              <Text style={styles.fcs5}>{txt.number_of_shares_in_hands}</Text>
              <Text style={styles.fcs6}>
                {Number(txt.par_or_stated_value).toFixed(2)}
              </Text>
              <Text style={styles.fcs7}>
                {formatNumberWithComma(Number(txt.amount).toFixed(2))}
              </Text>
              <Text style={styles.fcs8}>{txt.percent_of_ownership}%</Text>
            </View>
          ))}
        </View>
        <View style={styles.foreignsubscribeCapitalStyle}>
          {subscribe_capital_foreign.map((txt, index) => (
            <View key={index} style={styles.displayFlex3}>
              <Text style={styles.fSubCap1}>{txt.nationality}</Text>
              <Text style={styles.fSubCap2}>{txt.number_of_stock_holders}</Text>
              <Text style={styles.fSubCap3}>{txt.types_of_shares}</Text>
              <Text style={styles.fSubCap4}>
                {formatNumberWithComma(txt.number_of_shares)}
              </Text>
              <Text style={styles.fSubCap5}>
                {txt.number_of_shares_in_hands}
              </Text>
              <Text style={styles.fSubCap6}>
                {Number(txt.par_or_stated_value).toFixed(2)}
              </Text>
              <Text style={styles.fSubCap7}>
                {formatNumberWithComma(Number(txt.amount).toFixed(2))}
              </Text>
              <Text style={styles.fSubCap8}>{txt.percent_of_ownership}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.corporateName}>{corporate_name}</Text>

        <View style={styles.displayFlexTotal}>
          <Text style={styles.authorizedCapitalStockTotal1}>
            {formatNumberWithComma(auth_capital_stock_total_number_of_shares)}
          </Text>
          <Text style={styles.authorizedCapitalStockTotal2}>
            {formatNumberWithComma(
              Number(auth_capital_stock_total_amount).toFixed(2)
            )}
          </Text>
        </View>

        <View style={styles.displayTotalFlex2}>
          <Text style={styles.fcs9}>
            {formatNumberWithComma(sub_total_number_of_shares_filipino)}
          </Text>
          <Text style={styles.fcs10}>
            {formatNumberWithComma(
              Number(sub_total_amount_filipino).toFixed(2)
            )}
          </Text>
          <Text>{sub_total_ownership_filipino}%</Text>
        </View>

        <View style={styles.foreignEquity}>
          <Text style={styles.foreignEquityText1}>
            {percentage_of_foreign_equity}%
          </Text>
          <Text style={styles.foreignEquityText2}>
            {formatNumberWithComma(sub_total_number_of_shares_foreign)}
          </Text>
          <Text style={styles.foreignEquityText3}>
            {formatNumberWithComma(Number(sub_total_amount_foreign).toFixed(2))}
          </Text>
          <Text style={styles.foreignEquityText4}>
            {sub_total_ownership_foreign}%
          </Text>
        </View>

        <View style={styles.foreignEquity2}>
          <Text style={styles.foreignEquityText5}>
            {formatNumberWithComma(
              Number(subscribe_capital_total_amount).toFixed(2)
            )}
          </Text>
          <Text style={styles.foreignEquityText6}>
            {subscribe_capital_total_percent_of_ownership}%
          </Text>
        </View>

        <View style={styles.filipinoPaidUpCapital}>
          {filipino_paid_up_capital.map((txt) => (
            <View key={txt.id} style={styles.displayFlex2}>
              <Text style={styles.fcs1}></Text>
              <Text style={styles.fcs2}>{txt.number_of_stock_holders}</Text>
              <Text style={styles.fcs3}>{txt.types_of_shares}</Text>
              <Text style={styles.fcs4}>
                {formatNumberWithComma(txt.number_of_shares)}
              </Text>
              <Text style={styles.fcs5}>
                {Number(txt.par_or_stated_value).toFixed(2)}
              </Text>
              <Text style={styles.fcs6}>{txt.number_of_shares_in_hands}</Text>
              <Text style={styles.fcs7}>
                {formatNumberWithComma(Number(txt.amount).toFixed(2))}
              </Text>
              <Text style={styles.fcs8}>{txt.percent_of_ownership}</Text>
            </View>
          ))}
        </View>

        <View style={styles.foreignPaidUpCapital}>
          {foreign_paid_up_capital.map((txt) => (
            <View key={txt.id} style={styles.displayFlex3}>
              <Text style={styles.fSubCap1}>{txt.nationality}</Text>
              <Text style={styles.fSubCap2}>{txt.number_of_stock_holders}</Text>
              <Text style={styles.fSubCap3}>{txt.types_of_shares}</Text>
              <Text style={styles.fSubCap4}>
                {formatNumberWithComma(txt.number_of_shares)}
              </Text>
              <Text style={styles.fSubCap5}>{txt.par_or_stated_value}</Text>
              <Text style={styles.fSubCap6}>
                {Number(txt.number_of_shares_in_hands).toFixed(2)}
              </Text>
              <Text style={styles.fSubCap7}>
                {formatNumberWithComma(Number(txt.amount).toFixed(2))}
              </Text>
              <Text style={styles.fSubCap8}>{txt.percent_of_ownership}</Text>
            </View>
          ))}
        </View>

        <View style={styles.filipinoPaidUpCapitalTotal}>
          <Text style={styles.fcs9}>
            {formatNumberWithComma(paid_sub_total_number_of_shares_filipino)}
          </Text>
          <Text style={styles.fcs10}>
            {formatNumberWithComma(
              Number(paid_up_sub_total_amount_filipino).toFixed(2)
            )}
          </Text>
          <Text>{paid_sub_total_ownership_filipino}%</Text>
        </View>

        <View style={styles.foreignPaidUpCapitalTotal}>
          <Text style={styles.fcs9}>
            {formatNumberWithComma(paid_sub_total_number_of_shares_foreign)}
          </Text>
          <Text style={styles.fcs10}>
            {formatNumberWithComma(
              Number(paid_up_sub_total_amount_foreign).toFixed(2)
            )}
          </Text>
          <Text>{paid_sub_total_ownership_foreign}%</Text>
        </View>

        <View style={styles.totalPaidUp}>
          <Text style={styles.foreignEquityText5}>
            {formatNumberWithComma(
              Number(paid_up_capital_total_amount).toFixed(2)
            )}
          </Text>
          <Text style={styles.foreignEquityText6}>
            {paid_total_percent_ownership}%
          </Text>
        </View>

        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
          }}
          src={pageThree}
        ></Image>
      </Page>
    );
  };

  const page3 = () => {
    let text =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, accusantium eveniet odit quaerat ut harum totam eligendi consequatur asperiores alias dicta repellendus natus atque esse. Animi est magnam repellat earum.";
    return (
      <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
        <View
          style={{
            marginTop: 96,
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
              padding: "2px",
              height: "20px",
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
            marginTop: 170,
            marginLeft: 18,
            position: "absolute",
            display: "flex",
            flexDirection: "col",
            height: "43px",
            justifyContent: "space-evenly",
          }}
        >
          {formData.auth_capital_stock.capital_stocks.map(
            (capital_stock, index) => {
              return (
                <View
                  key={`capital_stock_${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "111px",
                      height: "10px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize("".length, 26, baseFontSize - 2),
                        textAlign: "center",
                        fontFamily: "CambriaBold",
                        width: "100%",
                      }}
                    >
                      {""}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "93px",
                      height: "10px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          capital_stock.type_of_shares.length,
                          26,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {capital_stock.type_of_shares}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "65px",
                      height: "10px",
                    }}
                  >
                    <Text
                      style={{
                        // fontSize: getFontSize(
                        //   formatNumberWithComma(capital_stock.number_of_shares)
                        //     .length,
                        //   17,
                        //   baseFontSize - 4
                        // ),
                        fontSize: getFontSize(
                          formatNumberWithCommaOnly(
                            capital_stock.number_of_shares
                          ).length,
                          17,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {/* {formatNumberWithComma(capital_stock.number_of_shares)} */}
                      {formatNumberWithCommaOnly(
                        capital_stock.number_of_shares
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "123px",
                      height: "10px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          formatNumberWithComma(
                            capital_stock.par_or_stated_value
                          ).length,
                          30,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {formatNumberWithComma(capital_stock.par_or_stated_value)}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "167px",
                      height: "10px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          // formatNumberWithComma(capital_stock.amount.toFixed(2))
                          //   .length,
                          !isNaN(Number(capital_stock.amount))
                            ? formatNumberWithCommaAndDecimal(
                                Number(capital_stock.amount) //.toFixed(2)
                              ).length
                            : 0,
                          47,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {/* {formatNumberWithComma(capital_stock.amount.toFixed(2))} */}
                      {!isNaN(Number(capital_stock.amount)) &&
                        formatNumberWithCommaAndDecimal(
                          Number(capital_stock.amount) //.toFixed(2)
                        )}
                    </Text>
                  </View>
                </View>
              );
            }
          )}
        </View>

        <View
          style={{
            marginTop: 213,
            marginLeft: 224,
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
              width: "62px",
              height: "12px",
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(
                  formatNumberWithCommaOnly(
                    formData.auth_capital_stock.total_number_of_shares
                  ).length,
                  11,
                  baseFontSize - 4
                ),
                textAlign: "right",
                paddingRight: "2px",
                fontFamily: "CambriaBold",
                width: "100%",
              }}
            >
              {formatNumberWithCommaOnly(
                formData.auth_capital_stock.total_number_of_shares
              )}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "168px",
              height: "12px",
              marginLeft: "124px",
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(
                  formatNumberWithCommaAndDecimal(
                    formData.auth_capital_stock.total_amount
                  ).length,
                  43,
                  baseFontSize - 4
                ),
                textAlign: "center",
                fontFamily: "CambriaBold",
                width: "100%",
              }}
            >
              {formatNumberWithCommaAndDecimal(
                formData.auth_capital_stock.total_amount
              )}
            </Text>
          </View>
        </View>

        {/* Subscribe Capital */}
        <View>
          <View
            style={{
              marginTop: 286,
              marginLeft: 18,
              position: "absolute",
              display: "flex",
              flexDirection: "col",
              justifyContent: "space-evenly",
              height: "43px",
            }}
          >
            {formData.subscribe_capital.filipino.map(
              (subscribe_capital, index) => {
                return (
                  <View
                    key={`subscribe_capital_${index}`}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "10px",
                    }}
                  >
                    <View
                      style={{
                        width: "63px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            "".length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "48px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.number_of_stock_holders.length,
                            13,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.number_of_stock_holders}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "93px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.types_of_shares.length,
                            30,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.types_of_shares}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "64px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithCommaOnly(
                              subscribe_capital.number_of_shares
                            ).length,
                            18,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithCommaOnly(
                          subscribe_capital.number_of_shares
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "62px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.number_of_shares_in_hands.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.number_of_shares_in_hands}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "62px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithComma(
                              subscribe_capital.par_or_stated_value
                            ).length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithComma(
                          subscribe_capital.par_or_stated_value
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "110px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            !isNaN(Number(subscribe_capital.amount))
                              ? formatNumberWithCommaAndDecimal(
                                  Number(subscribe_capital.amount)
                                ).length
                              : 0,
                            38,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {!isNaN(Number(subscribe_capital.amount)) &&
                          formatNumberWithCommaAndDecimal(
                            Number(subscribe_capital.amount)
                          )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "58px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.percent_of_ownership.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {`${subscribe_capital.percent_of_ownership}%`}
                      </Text>
                    </View>
                  </View>
                );
              }
            )}
          </View>

          <View
            style={{
              marginTop: 329,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaOnly(
                      formData.subscribe_capital
                        .sub_total_number_of_shares_filipino
                    ).length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaOnly(
                  formData.subscribe_capital.sub_total_number_of_shares_filipino
                )}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.subscribe_capital.sub_total_amount_filipino
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.subscribe_capital.sub_total_amount_filipino
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                      2
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                  2
                )}%`}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 390,
              marginLeft: 18,
              position: "absolute",
              display: "flex",
              flexDirection: "col",
              gap: "1px",
              height: "54px",
              justifyContent: "space-evenly",
            }}
          >
            {formData.subscribe_capital.foreign.map(
              (subscribe_capital, index) => {
                return (
                  <View
                    key={`subscribe_capital_${index}`}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "10px",
                    }}
                  >
                    <View
                      style={{
                        width: "63px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.nationality.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.nationality}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "48px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.number_of_stock_holders.length,
                            13,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.number_of_stock_holders}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "93px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.types_of_shares.length,
                            30,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.types_of_shares}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "64px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithCommaOnly(
                              subscribe_capital.number_of_shares
                            ).length,
                            18,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithCommaOnly(
                          subscribe_capital.number_of_shares
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "62px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.number_of_shares_in_hands.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.number_of_shares_in_hands}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "62px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithComma(
                              subscribe_capital.par_or_stated_value
                            ).length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithComma(
                          subscribe_capital.par_or_stated_value
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "110px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            !isNaN(Number(subscribe_capital.amount))
                              ? formatNumberWithCommaAndDecimal(
                                  Number(subscribe_capital.amount)
                                ).length
                              : 0,
                            38,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {/* {formatNumberWithComma(
                          subscribe_capital.amount.toFixed(2)
                        )} */}
                        {!isNaN(Number(subscribe_capital.amount)) &&
                          formatNumberWithCommaAndDecimal(
                            Number(subscribe_capital.amount)
                          )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "58px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.percent_of_ownership.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {`${subscribe_capital.percent_of_ownership}%`}
                      </Text>
                    </View>
                  </View>
                );
              }
            )}
          </View>
          <View
            style={{
              marginTop: 443,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaOnly(
                      formData.subscribe_capital
                        .sub_total_number_of_shares_foreign
                    ).length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaOnly(
                  formData.subscribe_capital.sub_total_number_of_shares_foreign
                )}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.subscribe_capital.sub_total_amount_foreign
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.subscribe_capital.sub_total_amount_foreign
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.subscribe_capital.sub_total_ownership_foreign.toFixed(
                      2
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.subscribe_capital.sub_total_ownership_foreign.toFixed(
                  2
                )}%`}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 454,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize("".length, 17, baseFontSize - 4),
                  textAlign: "center",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {""}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.subscribe_capital.total_amount
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.subscribe_capital.total_amount
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.subscribe_capital.total_percent_of_ownership.toFixed(
                      0
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.subscribe_capital.total_percent_of_ownership.toFixed(
                  0
                )}%`}
              </Text>
            </View>
          </View>
        </View>

        {/* Paid Up Capital */}
        <View>
          <View
            style={{
              marginTop: 510,
              marginLeft: 18,
              position: "absolute",
              display: "flex",
              flexDirection: "col",
              justifyContent: "space-evenly",
              height: "54px",
            }}
          >
            {formData.paid_up_capital.filipino.map(
              (subscribe_capital, index) => {
                return (
                  <View
                    key={`paid_up_capital_${index}`}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: "10px",
                    }}
                  >
                    <View
                      style={{
                        width: "63px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            "".length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {""}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "48px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.number_of_stock_holders.length,
                            13,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.number_of_stock_holders}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "93px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.types_of_shares.length,
                            30,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {subscribe_capital.types_of_shares}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "64px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithCommaOnly(
                              subscribe_capital.number_of_shares
                            ).length,
                            18,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithCommaOnly(
                          subscribe_capital.number_of_shares
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "125px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            formatNumberWithComma(
                              subscribe_capital.par_or_stated_value
                            ).length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {formatNumberWithComma(
                          subscribe_capital.par_or_stated_value
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "110px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            // formatNumberWithComma(
                            //   subscribe_capital.amount.toFixed(2)
                            // ).length,
                            !isNaN(Number(subscribe_capital.amount))
                              ? formatNumberWithCommaAndDecimal(
                                  Number(subscribe_capital.amount)
                                ).length
                              : 0,
                            38,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {/* {formatNumberWithComma(
                          subscribe_capital.amount.toFixed(2)
                        )} */}
                        {!isNaN(Number(subscribe_capital.amount)) &&
                          formatNumberWithCommaAndDecimal(
                            Number(subscribe_capital.amount)
                          )}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "58px",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: getFontSize(
                            subscribe_capital.percent_of_ownership.length,
                            17,
                            baseFontSize - 4
                          ),
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        {`${subscribe_capital.percent_of_ownership}%`}
                      </Text>
                    </View>
                  </View>
                );
              }
            )}
          </View>
          <View
            style={{
              marginTop: 563,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaOnly(
                      formData.paid_up_capital
                        .sub_total_number_of_shares_filipino
                    ).length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaOnly(
                  formData.paid_up_capital.sub_total_number_of_shares_filipino
                )}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.paid_up_capital.sub_total_amount_filipino
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.paid_up_capital.sub_total_amount_filipino
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                      2
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                  2
                )}%`}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 585,
              marginLeft: 18,
              position: "absolute",
              display: "flex",
              flexDirection: "col",
              // gap: "1px",
              height: "54px",
              justifyContent: "space-evenly",
            }}
          >
            {formData.paid_up_capital.foreign.map((paid_up_capital, index) => {
              return (
                <View
                  key={`paid_up_capital_${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "10px",
                  }}
                >
                  <View
                    style={{
                      width: "63px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          paid_up_capital.nationality.length,
                          17,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {paid_up_capital.nationality}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "48px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          paid_up_capital.number_of_stock_holders.length,
                          13,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {paid_up_capital.number_of_stock_holders}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "93px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          paid_up_capital.types_of_shares.length,
                          30,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {paid_up_capital.types_of_shares}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "64px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          formatNumberWithCommaOnly(
                            paid_up_capital.number_of_shares
                          ).length,
                          18,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {formatNumberWithCommaOnly(
                        paid_up_capital.number_of_shares
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "124px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          formatNumberWithComma(
                            paid_up_capital.par_or_stated_value
                          ).length,
                          17,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {formatNumberWithComma(
                        paid_up_capital.par_or_stated_value
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "110px",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: getFontSize(
                          // formatNumberWithComma(
                          //   paid_up_capital.amount.toFixed(2)
                          // ).length,
                          !isNaN(Number(paid_up_capital.amount))
                            ? formatNumberWithCommaAndDecimal(
                                Number(paid_up_capital.amount)
                              ).length
                            : 0,
                          38,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {/* {formatNumberWithComma(paid_up_capital.amount.toFixed(2))} */}
                      {!isNaN(Number(paid_up_capital.amount)) &&
                        formatNumberWithCommaAndDecimal(
                          Number(paid_up_capital.amount)
                        )}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "58px",
                    }}
                  >
                    <Text
                      style={{
                        // fontSize: getFontSize(
                        //   paid_up_capital.percent_of_ownership.length,
                        //   17,
                        //   baseFontSize - 4
                        // ),
                        fontSize: getFontSize(
                          `${paid_up_capital.percent_of_ownership.toFixed(2)}%`
                            .length,
                          17,
                          baseFontSize - 4
                        ),
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {/* {`${paid_up_capital.percent_of_ownership}%`} */}
                      {`${paid_up_capital.percent_of_ownership.toFixed(2)}%`}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              marginTop: 638,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaOnly(
                      formData.paid_up_capital
                        .sub_total_number_of_shares_foreign
                    ).length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaOnly(
                  formData.paid_up_capital.sub_total_number_of_shares_foreign
                )}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.paid_up_capital.sub_total_amount_foreign
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.paid_up_capital.sub_total_amount_foreign
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.paid_up_capital.sub_total_ownership_foreign.toFixed(
                      2
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.paid_up_capital.sub_total_ownership_foreign.toFixed(
                  2
                )}%`}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 649,
              marginLeft: 222,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "64px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize("".length, 17, baseFontSize - 4),
                  textAlign: "center",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {""}
              </Text>
            </View>
            <View
              style={{
                marginLeft: "125px",
                width: "109px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    formatNumberWithCommaAndDecimal(
                      formData.paid_up_capital.total_amount
                    ).length,
                    38,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {formatNumberWithCommaAndDecimal(
                  formData.paid_up_capital.total_amount
                )}
              </Text>
            </View>
            <View
              style={{
                width: "58px",
                height: "11px",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: getFontSize(
                    `${formData.paid_up_capital.total_percent_of_ownership.toFixed(
                      2
                    )}%`.length,
                    17,
                    baseFontSize - 4
                  ),
                  textAlign: "right",
                  paddingRight: "2px",
                  fontFamily: "CambriaBold",
                  width: "100%",
                }}
              >
                {`${formData.paid_up_capital.total_percent_of_ownership.toFixed(
                  2
                )}%`}
              </Text>
            </View>
          </View>
        </View>

        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
          }}
          src={pageThree}
        ></Image>
      </Page>
    );
  };

  const page3_code = () => {
    return (
      <Page
        size="A4"
        style={{
          position: "relative",
          fontFamily: "Cambria",
          fontSize: baseFontSize,
        }}
      >
        <View style={{ margin: "30px 10px" }}>
          <View>
            <Text style={{ textAlign: "center" }}>
              GENERAL INFORMATION SHEET
            </Text>
            <Text style={{ textAlign: "center", fontSize: baseFontSize - 3 }}>
              STOCK CORPORATION
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: baseFontSize - 3,
                fontFamily: "CambriaBold",
              }}
            >
              ==================================== PLEASE PRINT LEGIBLY
              ==================================
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 3,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{ ...styles.borderStyle, width: "20%", padding: "2px" }}
              >
                <Text>Corporate Name: </Text>
              </View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "80%",
                  borderRight: "1px solid black",
                  padding: "2px",
                }}
              >
                <Text>TWITTER PHILIPPINES INC.</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 4,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{
                  ...styles.borderStyle,
                  width: "100%",
                  padding: "2px",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ textAlign: "center" }}>CAPITAL STRUCTURE</Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 4,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{
                  ...styles.borderStyle,
                  width: "100%",
                  padding: "2px",
                  borderRight: "1px solid black",
                }}
              >
                <Text style={{ textAlign: "left" }}>
                  AUTHORIZED CAPITAL STOCK
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 4,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>TYPE OF SHARES *</Text>
              </View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "10%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>NUMBER OF SHARES</Text>
              </View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>PAR/STATED VALUE</Text>
              </View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "30%",
                  padding: "2px",
                  borderRight: "1px solid black",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>AMOUNT (PhP)</Text>
                <Text style={{ textAlign: "center" }}>
                  (No. of shares X Par/Stated Value)
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 4,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "10%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  ...styles.borderStyle,
                  width: "30%",
                  padding: "2px",
                  borderRight: "1px solid black",
                  justifyContent: "center",
                }}
              ></View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                fontSize: baseFontSize - 4,
                fontFamily: "CambriaBold",
              }}
            >
              <View
                style={{
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                  borderleft: "1px solid black",
                  borderRight: "1px solid black",
                }}
              >
                <Text>test</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                  borderleft: "1px solid black",
                }}
              >
                <Text>test</Text>
              </View>
              <View
                style={{
                  width: "10%",
                  padding: "2px",
                  justifyContent: "center",
                  borderleft: "1px solid black",
                }}
              >
                <Text>test</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  padding: "2px",
                  justifyContent: "center",
                  borderleft: "1px solid black",
                }}
              >
                <Text>test</Text>
              </View>
              <View
                style={{
                  width: "30%",
                  padding: "2px",
                  borderRight: "1px solid black",
                  borderleft: "1px solid black",
                  justifyContent: "center",
                }}
              >
                <Text>test</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    );
  };

  return page3();
}

export default PageThree;
