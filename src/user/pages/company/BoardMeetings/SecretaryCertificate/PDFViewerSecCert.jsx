import {
  Document,
  Font,
  Image,
  Line,
  PDFViewer,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";

import ProximaNova from "/fonts/ProximaNova.ttf";
import ProximaNovaBlack from "/fonts/ProximaNovaSemiBold.ttf";
import { useSelector } from "react-redux";

const removeTrailingPeriod = (input) => {
  // Check if the last character is a period and remove it if true
  if (input.endsWith(".")) {
    return input.slice(0, -1);
  }
  // Return the input unchanged if the last character is not a period
  return input;
};

const PDFViewerSecCert = ({ previewData, formData, selectedSecCertType }) => {
  // Register font
  Font.register({ family: "ProximaNova", src: ProximaNova });
  Font.register({ family: "ProximaNovaBlack", src: ProximaNovaBlack });

  let font_size = 11;
  let margin_top = 20;

  // Reference font
  const styles = StyleSheet.create({
    document: {
      fontFamily: "ProximaNova",
      fontSize: font_size,
    },
    table: {
      width: "14%",
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      padding: "10px",
      fontSize: "10px",
    },
  });

  const formatAppointees = (appointees) => {
    let text = "";
    if (appointees.length == 1) {
      text = `${appointees[0].name}, ${appointees[0].position}`;
    } else if (appointees.length == 2) {
      text = `${appointees[0].name}, ${appointees[0].position} and/or ${appointees[1].name}, ${appointees[1].position}`;
    } else {
      appointees.map((appointee, index) => {
        if (appointees.length - 1 == index) {
          text += `and/or ${appointee.name}, ${appointee.position}`;
        } else {
          text += ` ${appointee.name}, ${appointee.position}; `;
        }
      });
    }

    return text;
  };

  const higlightStyle = (name, form) => {
    if (form == "") {
      return {
        backgroundColor: "yellow",
      };
    }
    return {
      backgroundColor: "",
    };
  };

  const preEmptiveRightsDocument = () => {
    return (
      <Document style={styles.document} title={selectedSecCertType}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I,{" "}
                <Text style={higlightStyle("name", previewData.name)}>
                  {previewData.name == "" ? `<< Name >>` : previewData.name}
                </Text>
                , of legal age, a resident of{" "}
                <Text style={higlightStyle("address", previewData.address)}>
                  {previewData.address == ""
                    ? `<< Address >>`
                    : previewData.address}
                </Text>
                , being duly sworn, depose and state that:
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I am the duly elected Corporate Secretary of{" "}
                <Text style={higlightStyle("company", previewData.company)}>
                  {previewData.company == ""
                    ? `<< Company Name >>`
                    : removeTrailingPeriod(previewData.company)}
                </Text>
                .
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text
                style={{
                  textIndent: "40px",
                }}
              >
                At a meeting held on{" "}
                <Text
                  style={higlightStyle(
                    "meeting_date",
                    previewData.meeting_date
                  )}
                >
                  {previewData.meeting_date == ""
                    ? `<< Meeting Date >>`
                    : moment(previewData.meeting_date).format("MMMM DD, YYYY")}
                </Text>{" "}
                at{" "}
                <Text
                  style={higlightStyle(
                    "place_of_meeting",
                    previewData.place_of_meeting
                  )}
                >
                  {previewData.place_of_meeting == ""
                    ? `<< Meeting Place >>`
                    : previewData.place_of_meeting}
                </Text>
                , the board of directors of the Corporation have approved the
                increase in the authorized capital stock of the Corporation from{" "}
                <Text
                  style={higlightStyle(
                    "increase_from",
                    previewData.increase_from
                  )}
                >
                  {previewData.increase_from == ""
                    ? `<< Increase From >>`
                    : previewData.increase_from}
                </Text>{" "}
                divided into{" "}
                <Text
                  style={higlightStyle(
                    "divided_into",
                    previewData.divided_into
                  )}
                >
                  {previewData.divided_into == ""
                    ? `<< Divided Into >>`
                    : previewData.divided_into}
                </Text>{" "}
                with a par value each of{" "}
                <Text
                  style={higlightStyle(
                    "par_value_of",
                    previewData.par_value_of
                  )}
                >
                  {previewData.par_value_of == ""
                    ? `<< Par Value Of >>`
                    : previewData.par_value_of}
                </Text>{" "}
                to{" "}
                <Text
                  style={higlightStyle(
                    "par_value_to",
                    previewData.par_value_to
                  )}
                >
                  {previewData.par_value_to == ""
                    ? `<< Par Value Each To >>`
                    : previewData.par_value_to}
                </Text>{" "}
                divided into{" "}
                <Text
                  style={higlightStyle(
                    "par_value_divided_into",
                    previewData.par_value_divided_into
                  )}
                >
                  {previewData.par_value_divided_into == ""
                    ? `<< Par Value Divided Into >>`
                    : previewData.par_value_divided_into}
                </Text>{" "}
                with a par value each of{" "}
                <Text
                  style={higlightStyle(
                    "par_value_each_of",
                    previewData.par_value_each_of
                  )}
                >
                  {previewData.par_value_each_of == ""
                    ? `<< Par Value Each Of >>`
                    : previewData.par_value_each_of}
                </Text>
                .
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                In connection with the said increase of capital, I hereby
                certify that all non-subscribing stockholder(s) have waived
                their pre-emptive right(s) to subscribe.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                I further certify that from the time of such stockholders and
                directors' approval of the increase in capital stock up to the
                filing of the application for the increase of capital stock with
                the Commission, to the best of my knowledge, no action or
                proceeding has been filed or is pending before any Court
                involving an intra-corporate dispute and/or claim by any person
                or group against the Board of Directors, individual directors
                and/or major corporate officers of the Corporation as its duly
                elected and/or appointed directors or officers or vice versa.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                IN WITNESS WHEREOF, I have hereunto set my hand on this ____ of
                __________, ____ in ___________________, Philippines.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    ...higlightStyle("name", previewData.name),
                    fontFamily: "ProximaNovaBlack",
                    textAlign: "center",
                  }}
                >
                  {previewData.name == ""
                    ? `<< Name >>`
                    : previewData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    ...higlightStyle(
                      "tax_id_number",
                      previewData.tax_id_number
                    ),
                    fontFamily: "ProximaNovaBlack",
                    textAlign: "center",
                  }}
                >
                  {previewData.tax_id_number == ""
                    ? `<< Tax ID Number >>`
                    : previewData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const noDisputeDocument = () => {
    return (
      <Document style={styles.document} title={selectedSecCertType}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I,{" "}
                <Text style={higlightStyle("name", previewData.name)}>
                  {previewData.name == ""
                    ? `<< Name >>`
                    : previewData.name.toUpperCase()}
                </Text>
                , of legal age, Filipino with residence address at{" "}
                <Text style={higlightStyle("address", previewData.address)}>
                  {previewData.address == ""
                    ? `<< Address >>`
                    : previewData.address}
                </Text>
                , after having been duly sworn to in accordance with law, do
                hereby depose and state that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the Corporate Secretary of {previewData.company} duly
                  organized and existing under and by virtue of the laws of the
                  Republic of the Philippines, with principal office at{" "}
                  {previewData.principal_office}.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  To the best of my knowledge, NO ACTION OR PROCEEDING has been
                  filed or is pending before any Court involving an
                  intra-corporate dispute and/or claim by any person or group
                  against the Board of Directors, individual directors and/or
                  major corporate officers of the Corporation as its duly
                  elected and/or appointed directors or officers or vice versa.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>3.</Text>
                <Text style={{ width: "100%" }}>
                  Further, no intra-corporate issue involving third parties is
                  pending, may it be Criminal, Civil, or Administrative.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                {/* IN WITNESS WHEREOF, I have hereunto set my hand on this ____ of
                __________, ____ in ___________________, Philippines.  */}
                IN WITNESS WHEREOF, I have hereunto set my hands this ____ day
                of ____________ {new Date().getFullYear()} at
                _______________________________________.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {previewData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {previewData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const listOfStockholdersDocument = () => {
    return (
      <Document style={styles.document} title={selectedSecCertType}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.5in 0.5in 0.9in 0.9in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I,{" "}
                <Text style={higlightStyle("name", previewData.name)}>
                  {previewData.name == "" ? `<< Name >>` : previewData.name}
                </Text>
                , of legal age,{" "}
                <Text
                  style={higlightStyle("nationality", previewData.nationality)}
                >
                  {previewData.nationality == ""
                    ? `<< Nationality >>`
                    : previewData.nationality}
                </Text>
                , a resident of{" "}
                <Text style={higlightStyle("address", previewData.address)}>
                  {previewData.address == ""
                    ? `<< Address >>`
                    : previewData.address}
                </Text>{" "}
                being duly sworn, depose and state that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the duly elected and qualified Corporate Secretary of
                  {` ${previewData.company}`}, a corporation duly organized and
                  existing under and by the virtue of the Republic of the
                  Philippines, with principal office at 2F 166C Military Cut-off
                  Road, Military Cut-off Brgy., Baguio City.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  I am familiar with the facts herein certified and duly
                  authorized to Certify the List of the Shareholders as of{" "}
                  <Text style={higlightStyle("as_of", previewData.as_of)}>
                    {previewData.as_of == ""
                      ? `<< As of >>`
                      : moment(previewData.as_of).format(" MMMM DD, yyyy")}
                  </Text>{" "}
                  are:
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text style={{ ...styles.table, width: "16%" }}>
                  Name of Stockholder
                </Text>
                <Text style={styles.table}>Nationality</Text>
                <Text style={styles.table}>Number of Subscribed Shares</Text>
                <Text style={styles.table}>
                  Amount of Subscribed Shares (Php)
                </Text>
                <Text style={styles.table}>Paid Up Capital</Text>
                <Text style={styles.table}>Amount of Paid APIC (Php)</Text>
                <Text
                  style={{
                    ...styles.table,
                    borderRight: "1px solid black",
                  }}
                >
                  Total Amount Paid (Php)
                </Text>
              </View>

              {formData.stockHoldersInfo.length != 0 ? (
                formData.stockHoldersInfo.map((info, index) => {
                  let style = {
                    display: "flex",
                    flexDirection: "row",
                  };
                  return (
                    <View
                      key={`info-${index}`}
                      style={
                        index == formData.stockHoldersInfo.length - 1
                          ? { ...style, borderBottom: "1px solid black" }
                          : style
                      }
                    >
                      <Text
                        style={{
                          ...styles.table,
                          // padding: "1px",
                          width: "16%",
                        }}
                      >
                        {info.name}
                      </Text>
                      <Text style={styles.table}>{info.nationality}</Text>
                      <Text style={styles.table}>
                        {info.no_of_subscribed_shares}
                      </Text>
                      <Text style={styles.table}>
                        {info.amount_of_subscribed_shares}
                      </Text>
                      <Text style={styles.table}>{info.paidup_capital}</Text>
                      <Text style={styles.table}>
                        {info.amount_of_paid_APIC}
                      </Text>
                      <Text
                        style={{
                          ...styles.table,
                          borderRight: "1px solid black",
                        }}
                      >
                        {info.total_amount_paid}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    // ...styles.table,
                    display: "flex",
                    flexDirection: "row",
                    // borderBottom: "1px solid black",
                  }}
                >
                  <Text
                    style={{
                      ...styles.table,
                      borderRight: "1px solid black",
                      width: "100%",
                      borderBottom: "1px solid black",
                    }}
                  >
                    No records found.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Page>

        <Page size={"A4"}>
          <View
            style={{
              padding: "0.5in 0.5in 0.9in 0.9in",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                IN WITNESS WHEREOF, I have hereunto set my hands this ____ day
                of ____________ {new Date().getFullYear()} at
                _______________________________________.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {formData.tax_id_number}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this ___________day of
                _________,_____ at _______________________ by the above-named
                person who exhibited to me his/her valid government
                identification card as indicated below his/her name.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const authorizationDocument = () => {
    return (
      <Document style={styles.document} title={selectedSecCertType}>
        <Page size={"A4"}>
          <View
            style={{
              padding: "0.8in 1in 0.5in 1in",
              width: "100%",
            }}
          >
            <View>
              <Text>Republic of the Philippines)</Text>
              <Text>_____________________) S.S.</Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                SECRETARY'S CERTIFICATE
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>
                I, {previewData.name.toUpperCase()}, of legal age, Filipino, a
                resident of {previewData.address} being duly sworn, depose and
                state that:
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
                gap: "10px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>1.</Text>
                <Text style={{ width: "100%" }}>
                  I am the duly elected and qualified Corporate Secretary of
                  {` ${previewData.company}`}, a corporation duly organized and
                  existing under and by virtue of the Republic of the
                  Philippines, with principal office at{" "}
                  {previewData.principal_office}.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Text style={{ width: "20px" }}>2.</Text>
                <Text style={{ width: "100%" }}>
                  That the annual/ a special meeting of the Board of Directors
                  held on{" "}
                  <Text
                    style={higlightStyle(
                      "board_meeting_date",
                      previewData.board_meeting_date
                    )}
                  >
                    {previewData.board_meeting_date == ""
                      ? `<< Board Meeting Date >>`
                      : moment(previewData.board_meeting_date).format(
                          " MMMM DD, yyyy"
                        )}
                  </Text>{" "}
                  , there being a quorum, the following resolution was approved
                  and passed.
                </Text>
              </View>
            </View>

            {/* <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED, as it resolved that the Board of Directors hereby
                appoint {formatAppointees(formData.appointees)} as the Point of
                Contact to transact, apply, submit, receive, sign for on behalf
                of the company in all {formData.offices} related transactions.
              </Text>
            </View> */}

            {previewData.board_resolutions.map((reso, index) => {
              return (
                <View
                  key={`board-reso-${index}`}
                  style={{
                    width: "100%",
                    textAlign: "justify",
                    marginTop: `${margin_top}px`,
                  }}
                >
                  <Text style={{ textIndent: "40px" }}>{reso}</Text>
                </View>
              );
            })}

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED FURTHER, to authorize, negotiate, secure, claim and
                receive from the above stated agency any and all documents
                related to the above mentioned power.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                RESOLVED FINALLY, to authorize the above-named person/s to
                perform such other acts and to execute and sign any and all
                documents necessary to the accomplishment of the above mentioned
                authority.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>UNANIMOUSLY APPROVED.</Text>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  _____________________________
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {formData.name.toUpperCase()}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Corporate Secretary
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top + 20}px`,
              }}
            >
              <Text style={{ textIndent: "40px" }}>
                SUBSCRIBED AND SWORN to before me this _____day of
                ______________ {new Date().getFullYear()}, in _____________,
                Philippines.
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: `${margin_top + 20}px`,
                textAlign: "right",
              }}
            >
              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                NOTARY PUBLIC
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                textAlign: "justify",
                marginTop: `${margin_top}px`,
              }}
            >
              <Text>Doc. No. ______</Text>
              <Text>Page No. ______</Text>
              <Text>Book No. ______</Text>
              <Text>Series of {new Date().getFullYear()}.</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const getDocument = (
    type = "Secretary Certificate Waiver of Pre-emptive rights"
  ) => {
    if (type == "Secretary Certificate of no Dispute") {
      return noDisputeDocument();
    }
    if (type == "Secretary Certificate for List of Stockholders") {
      return listOfStockholdersDocument();
    }
    if (type == "Secretary Certificate for Authorization") {
      return authorizationDocument();
    }
    return preEmptiveRightsDocument();
  };

  return (
    <>
      <PDFViewer className="flex flex-col w-full rounded-md shadow-lg h-screen">
        {/* {preEmptiveRightsDocument()} */}
        {getDocument(selectedSecCertType)}
      </PDFViewer>
    </>
  );
};

export default PDFViewerSecCert;
