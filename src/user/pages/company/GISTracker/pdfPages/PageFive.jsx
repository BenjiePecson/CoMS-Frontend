import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageFive from "../photos/page5_new.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";
import { useEffect } from "react";

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });

const baseFontSize = 12; // Base font size

// Function to format number with comma for thousands and above
const formatNumberWithComma = (number) => {
  // Convert number to fixed 2 decimal places
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

const styles = StyleSheet.create({
  corporateName: {
    marginTop: 95,
    marginLeft: 120,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },

  stockHolders: {
    marginTop: 113,
    marginLeft: 170,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  totalNumberOfStockHolder: {
    width: "88%",
  },
  totalAsset: {
    marginTop: 132,
    marginLeft: 280,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },
  stockHolderInformation: {
    marginTop: 220,
    marginLeft: 52,
  },
  stockHolderInformationView: {
    display: "flex",
    flexDirection: "row",
    margin: "2px",
  },
  nameNationalityAddress: {
    display: "flex",
    flexDirection: "column",
    fontSize: "9px",
    width: "164px",
  },
  name: {
    fontFamily: "Times-Bold",
  },
  address: {
    width: "130px",
  },
  shareSubscribeView: {
    display: "flex",
    flexDirection: "column ",
    width: "180px",
  },
  shareSubscribe: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
  },
  shareSubscribeTotal: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    marginTop: 33,
    marginLeft: 50,
    textAlign: "right",
  },
  type: {
    width: "45px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  number: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "55px",
    textAlign: "right",
  },
  ammount: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "74px",
    textAlign: "right",
  },
  totalNumber: {
    fontFamily: "Times-Bold",
    width: "50px",
  },
  totalAmmount: {
    fontFamily: "Times-Bold",
    width: "75px",
  },
  shareSView: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    fontFamily: "Times-Bold",
    marginTop: 20,
  },
  percentOfOwnership: {
    width: "42px",
  },
  ammountPaid: {
    width: "48",
  },

  totalAmountSubscribeCapital: {
    marginTop: 619,
    marginLeft: 345,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    position: "absolute",
  },
  totalAmountSubscribeCapital1: {
    width: "60px",
  },
  totalAmountSubscribeCapital2: {
    width: "60px",
  },
  totalAmountSubscribeCapital3: {
    padding: "1px",
    width: "25px",
  },
});

const PageFive = ({
  formData,
  stock_holders_information,
  corporate_name,
  total_number_of_stockholders,
  number_of_stockholders_with_more_shares_each,
  total_assets_based_on_latest_audited,
  subscribe_capital_total_amount,
  subscribe_capital_total_percent_of_ownership,
}) => {
  const styles_new = StyleSheet.create({
    page: {
      position: "relative",
      fontFamily: "Cambria",
      fontSize: baseFontSize,
    },
    image: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      width: "100%",
    },
    corporate_name_view_outer: {
      marginTop: 83,
      marginLeft: 116,
      position: "absolute",
      display: "flex",
      flexDirection: "row",
    },
    corporate_name_view_inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "416px",
      height: "18px",
    },
    corporate_name_text: {
      textAlign: "center",
      fontSize: getFontSize(
        formData.corporate_name.length,
        87,
        baseFontSize - 2
      ),
      fontFamily: "CambriaBold",
      width: "100%",
    },

    no_stockholder_view_outer: {
      marginTop: 100,
      marginLeft: 150,
      position: "absolute",
      display: "flex",
      flexDirection: "row",
    },
    no_stockholder_view_inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "143px",
      height: "18px",
    },
    no_stockholder_text: {
      textAlign: "center",
      fontSize: getFontSize(
        formData.total_number_of_stockholders.length,
        20,
        baseFontSize - 4
      ),
      fontFamily: "CambriaBold",
      width: "100%",
    },

    no_stockholder_100_or_more_view_inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "96px",
      height: "18px",
      marginLeft: "187px",
    },
    no_stockholder_100_or_more_text: {
      textAlign: "center",
      fontSize: getFontSize(
        formData.number_of_stockholders_with_more_shares_each.length,
        17,
        baseFontSize - 4
      ),
      fontFamily: "CambriaBold",
      width: "100%",
    },

    total_assets_view_outer: {
      marginTop: 118,
      marginLeft: 248,
      position: "absolute",
      display: "flex",
      flexDirection: "row",
    },
    total_assets_view_inner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "328px",
      height: "18px",
    },
    total_assets_text: {
      textAlign: "center",
      fontSize: getFontSize(
        formData.total_assets_based_on_latest_audited.length,
        64,
        baseFontSize - 4
      ),
      fontFamily: "CambriaBold",
      width: "100%",
    },

    stockholders_info_view_outer: {
      marginTop: 200,
      marginLeft: 48,
      position: "absolute",
      display: "flex",
      flexDirection: "col",
    },
    stockholders_info_name_view_outer: {
      display: "flex",
      flexDirection: "row",
      // alignItems: "center",
      height: "51px",
      // border: "1px solid green",
      justifyContent: "space-evenly",
    },
    stockholders_info_name_view_inner: {
      display: "flex",
      flexDirection: "row",
      marginTop: "3px",
      width: "145px",
      height: "10px",
      // border: "1px solid red",
    },
    stockholders_info_nationality_inner: {
      display: "flex",
      flexDirection: "row",
      width: "145px",
      height: "10px",
      // border: "1px solid red",
    },
    stockholders_info_address_view_inner: {
      display: "flex",
      flexDirection: "row",
      width: "145px",
      height: "29px",
      // border: "1px solid red",
      alignItems: "center",
    },
    stockholders_info_name_text: {
      fontFamily: "CambriaBold",
      width: "100%",
    },
    stockholders_info_nationality_text: {
      width: "100%",
    },
    stockholders_info_address_text: {
      fontSize: baseFontSize - 4,
      paddingRight: "3px",
      width: "100%",
    },
  });

  const page5_old = () => {
    return (
      <Page size="A4" style={{ position: "relative" }}>
        <Text style={styles.corporateName}>{corporate_name}</Text>
        <View style={styles.stockHolders}>
          <Text style={styles.totalNumberOfStockHolder}>
            {total_number_of_stockholders}
          </Text>
          <Text>{number_of_stockholders_with_more_shares_each}</Text>
        </View>
        <Text style={styles.totalAsset}>
          {formatNumberWithComma(total_assets_based_on_latest_audited)}
        </Text>

        <View style={styles.stockHolderInformation}>
          {stock_holders_information.slice(0, 7).map((txt, index) => (
            <View key={index} style={styles.stockHolderInformationView}>
              <View style={styles.nameNationalityAddress}>
                <Text style={styles.name}>{txt.name}</Text>
                <Text>{txt.nationality}</Text>
                <Text style={styles.address}>
                  {txt.current_residual_address}
                </Text>
              </View>
              <View style={styles.shareSubscribeView}>
                <View style={styles.shareSubscribe}>
                  <Text style={styles.type}>{txt.type}</Text>
                  <Text style={styles.number}>
                    {formatNumberWithComma(txt.number)}
                  </Text>
                  <Text style={styles.ammount}>
                    {formatNumberWithComma(Number(txt.amount).toFixed(2))}
                  </Text>
                </View>
                <View style={styles.shareSubscribeTotal}>
                  <Text style={styles.totalNumber}>{txt.total_number}</Text>
                  <Text style={styles.totalAmmount}>{txt.total_amount}</Text>
                </View>
              </View>

              <View style={styles.shareSView}>
                <Text style={styles.percentOfOwnership}>
                  {txt.percent_of_ownership}%
                </Text>
                <Text style={styles.ammountPaid}>
                  {formatNumberWithComma(Number(txt.amount_paid).toFixed(2))}
                </Text>
                <Text>{txt.tax_id_number}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalAmountSubscribeCapital}>
          <Text style={styles.totalAmountSubscribeCapital1}>
            {formatNumberWithComma(
              Number(subscribe_capital_total_amount).toFixed(2)
            )}
          </Text>
          <Text style={styles.totalAmountSubscribeCapital2}>
            {subscribe_capital_total_percent_of_ownership}%
          </Text>
          <Text style={styles.totalAmountSubscribeCapital3}></Text>
        </View>
        <Image
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            width: "100%",
          }}
          src={pageFive}
        ></Image>
      </Page>
    );
  };

  let page5TotalAmount = 0;
  let page5PercentageOfOwnership = 0;

  const page5 = () => {
    return (
      <Page size="A4" style={styles_new.page}>
        <View>
          <View style={styles_new.corporate_name_view_outer}>
            <View style={styles_new.corporate_name_view_inner}>
              <Text style={styles_new.corporate_name_text}>
                {formData.corporate_name.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles_new.no_stockholder_view_outer}>
            <View style={styles_new.no_stockholder_view_inner}>
              <Text style={styles_new.no_stockholder_text}>
                {formData.total_number_of_stockholders}
              </Text>
            </View>
            <View style={styles_new.no_stockholder_100_or_more_view_inner}>
              <Text style={styles_new.no_stockholder_100_or_more_text}>
                {formData.number_of_stockholders_with_more_shares_each}
              </Text>
            </View>
          </View>
          <View style={styles_new.total_assets_view_outer}>
            <View style={styles_new.total_assets_view_inner}>
              <Text style={styles_new.total_assets_text}>
                {formData.total_assets_based_on_latest_audited}
              </Text>
            </View>
          </View>

          <View style={styles_new.stockholders_info_view_outer}>
            {formData.stock_holders_information.information.map(
              (stockholder, index) => {
                if (!isNaN(Number(stockholder.amount))) {
                  page5TotalAmount += Number(stockholder.amount);
                }
                if (!isNaN(Number(stockholder.percent_of_ownership))) {
                  page5PercentageOfOwnership += Number(
                    stockholder.percent_of_ownership
                  );
                }

                if (index >= 0 && index <= 6) {
                  return (
                    <View key={`stockholder_${index}`}>
                      <View
                        style={styles_new.stockholders_info_name_view_outer}
                      >
                        <View>
                          <View
                            style={styles_new.stockholders_info_name_view_inner}
                          >
                            <Text
                              style={{
                                ...styles_new.stockholders_info_name_text,
                                fontSize: getFontSize(
                                  stockholder.name.length,
                                  36,
                                  baseFontSize - 4
                                ),
                              }}
                            >
                              {stockholder.name}
                            </Text>
                          </View>
                          <View
                            style={
                              styles_new.stockholders_info_nationality_inner
                            }
                          >
                            <Text
                              style={{
                                ...styles_new.stockholders_info_nationality_text,
                                fontSize: getFontSize(
                                  stockholder.nationality.length,
                                  36,
                                  baseFontSize - 4
                                ),
                              }}
                            >
                              {stockholder.nationality}
                            </Text>
                          </View>
                          <View
                            style={
                              styles_new.stockholders_info_address_view_inner
                            }
                          >
                            <Text
                              style={{
                                ...styles_new.stockholders_info_address_text,
                                fontSize: getFontSize(
                                  stockholder.current_residual_address.length,
                                  117,
                                  baseFontSize - 4
                                ),
                              }}
                            >
                              {stockholder.current_residual_address}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: "42px",
                            height: "13px",
                            marginTop: "1px",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: getFontSize(
                                stockholder.type.length,
                                10,
                                baseFontSize - 4
                              ),
                              textAlign: "center",
                              marginTop: "1px",
                            }}
                          >
                            {stockholder.type}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "58px",
                            height: "52px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ height: "13px" }}>
                            <Text
                              style={{
                                fontSize: getFontSize(
                                  !isNaN(Number(stockholder.number))
                                    ? formatNumberWithComma(
                                        Number(stockholder.number)
                                      ).length
                                    : 0,
                                  13,
                                  baseFontSize - 4
                                ),
                                textAlign: "right",
                                paddingRight: "2px",
                                marginTop: "1px",
                              }}
                            >
                              {!isNaN(Number(stockholder.number)) &&
                                formatNumberWithComma(
                                  Number(stockholder.number)
                                )}
                            </Text>
                          </View>
                          <View style={{ height: "13px" }}>
                            <Text
                              style={{
                                fontSize: getFontSize(
                                  !isNaN(Number(stockholder.number))
                                    ? formatNumberWithComma(
                                        Number(stockholder.number)
                                      ).length
                                    : 0,
                                  13,
                                  baseFontSize - 4
                                ),
                                textAlign: "right",
                                paddingRight: "2px",
                                fontFamily: "CambriaBold",
                              }}
                            >
                              {!isNaN(Number(stockholder.number)) &&
                                formatNumberWithComma(
                                  Number(stockholder.number)
                                )}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "69px",
                            height: "52px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ height: "13px" }}>
                            <Text
                              style={{
                                fontSize: getFontSize(
                                  !isNaN(Number(stockholder.amount))
                                    ? formatNumberWithComma(
                                        Number(stockholder.amount).toFixed(2)
                                      ).length
                                    : 0,
                                  17,
                                  baseFontSize - 4
                                ),
                                textAlign: "right",
                                paddingRight: "2px",
                                marginTop: "1px",
                              }}
                            >
                              {!isNaN(Number(stockholder.amount)) &&
                                formatNumberWithComma(
                                  Number(stockholder.amount).toFixed(2)
                                )}
                            </Text>
                          </View>

                          <View style={{ height: "13px" }}>
                            <Text
                              style={{
                                fontSize: getFontSize(
                                  !isNaN(Number(stockholder.amount))
                                    ? formatNumberWithComma(
                                        Number(stockholder.amount).toFixed(2)
                                      ).length
                                    : 0,
                                  17,
                                  baseFontSize - 4
                                ),
                                textAlign: "right",
                                paddingRight: "2px",
                                fontFamily: "CambriaBold",
                              }}
                            >
                              {!isNaN(Number(stockholder.amount)) &&
                                formatNumberWithComma(
                                  Number(stockholder.amount).toFixed(2)
                                )}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <View style={{ height: "13px" }}>
                            <Text
                              style={{
                                fontSize: getFontSize(
                                  !isNaN(
                                    Number(stockholder.percent_of_ownership)
                                  )
                                    ? // `${formatNumberWithComma(
                                      //     Number(
                                      //       stockholder.percent_of_ownership
                                      //     ).toFixed(2)
                                      //   )}%`.length
                                      `${Number(
                                        stockholder.percent_of_ownership
                                      ).toFixed(4)}%`.length
                                    : 0,
                                  17,
                                  baseFontSize - 4
                                ),
                                textAlign: "center",
                              }}
                            >
                              {!isNaN(
                                Number(stockholder.percent_of_ownership)
                              ) &&
                                // `${formatNumberWithComma(
                                //   Number(
                                //     stockholder.percent_of_ownership
                                //   ).toFixed(2)
                                // )}%`
                                `${Number(
                                  stockholder.percent_of_ownership
                                ).toFixed(4)}%`}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "89px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: getFontSize(
                                !isNaN(Number(stockholder.amount_paid))
                                  ? `${formatNumberWithComma(
                                      Number(stockholder.amount_paid).toFixed(2)
                                    )}`.length
                                  : 0,
                                17,
                                baseFontSize - 4
                              ),
                              textAlign: "center",
                            }}
                          >
                            {!isNaN(Number(stockholder.amount_paid)) &&
                              `${formatNumberWithComma(
                                Number(stockholder.amount_paid).toFixed(2)
                              )}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "85px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: getFontSize(
                                stockholder.tax_id_number.length,
                                17,
                                baseFontSize - 4
                              ),
                              textAlign: "center",
                            }}
                          >
                            {stockholder.tax_id_number}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View key={`stockholder_${index}`}>
                      <Text></Text>
                    </View>
                  );
                }
              }
            )}
          </View>

          {formData.stock_holders_information.information.length >= 1 &&
          formData.stock_holders_information.information.length <= 7 ? (
            <View
              style={{
                marginTop: 556,
                marginLeft: 292,
                position: "absolute",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "70px",
                  height: "15px",
                  fontSize: getFontSize(
                    formatNumberWithComma(page5TotalAmount.toFixed(2)).length,
                    18,
                    baseFontSize - 4
                  ),
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "right", paddingRight: "2px" }}>
                  {formatNumberWithComma(page5TotalAmount.toFixed(2))}
                </Text>
              </View>
              <View
                style={{
                  width: "40px",
                  height: "15px",
                  fontSize: getFontSize(
                    `${page5PercentageOfOwnership.toFixed(2)}%`.length,
                    8,
                    baseFontSize - 4
                  ),
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", fontFamily: "CambriaBold" }}
                >
                  {`${page5PercentageOfOwnership.toFixed(2)}%`}
                </Text>
              </View>
              <View
                style={{
                  width: "172px",
                  height: "30px",
                  fontSize: getFontSize(
                    formatNumberWithComma(page5TotalAmount.toFixed(2)).length,
                    18,
                    baseFontSize - 4
                  ),
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", fontFamily: "CambriaBold" }}
                >
                  {formatNumberWithComma(page5TotalAmount.toFixed(2))}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Image style={styles_new.image} src={pageFive}></Image>
      </Page>
    );
  };

  return page5();
};

export default PageFive;
