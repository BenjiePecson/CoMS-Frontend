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
import React from "react";
import moment from "moment/moment";

import ProximaNova from "/fonts/ProximaNova.ttf";
import ProximaNovaBlack from "/fonts/ProximaNovaSemiBold.ttf";

const PDFViewerNOM = ({ selectedCompany, formData }) => {
  // Register font
  Font.register({ family: "ProximaNova", src: ProximaNova });
  Font.register({ family: "ProximaNovaBlack", src: ProximaNovaBlack });

  // Reference font
  const styles = StyleSheet.create({
    view: {
      fontFamily: "ProximaNova",
      fontSize: "12px",
    },
    title: {
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "black",
      padding: "0px 50px",
      margin: "20px 0px",
      fontFamily: "ProximaNovaBlack",
    },
  });

  const formatText = (inputString) => {
    // Split the string into words
    let words = inputString.toLowerCase().split(" ");

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string and return
    return words.join(" ");
  };

  const extractDate = (datetime) => {
    const dateTime = new Date(datetime);

    return moment(dateTime).format("DD MMMM YYYY");
  };

  const extractTime = (datetime) => {
    const dateTime = new Date(datetime);
    return moment(dateTime).format("hA");
  };

  const extractDirectorName = (director) => {
    if (director != "" && director != undefined) {
      let extract = director.split("-")[0];
      return formatText(extract.substring(0, extract.length - 1, 0));
    }

    return formatText(director);
  };

  const extractDirectorPosition = (director) => {
    if (director != "" && director != undefined) {
      let extract = director.split("-")[1];
      if (extract.substring(1, extract.length, 0) == "N/A")
        return extract.substring(1, extract.length, 0);
      return formatText(extract.substring(1, extract.length, 0));
    }
    return formatText(director);
  };

  return (
    <PDFViewer
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <Document title={`${selectedCompany.companyName} NOM`}>
        <Page size={"A4"} style={styles.view}>
          <View style={{ padding: "0px 50px" }}>
            {selectedCompany.letterHeader != "" &&
              selectedCompany.letterHeader != null && (
                <View>
                  <Image
                    src={selectedCompany.letterHeader}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  ></Image>
                </View>
              )}

            <View>
              <Text style={styles.title}>
                NOTICE OF 2023{" "}
                {formData.type_of_meeting == "Special" ? "SPECIAL" : "ANNUAL"}{" "}
                STOCKHOLDERS' MEETING OF
                {" " + selectedCompany.companyName.toUpperCase()}
              </Text>
              <Text
                style={{
                  marginBottom: "15px",
                  fontFamily: "ProximaNovaBlack",
                }}
              >
                To All Stockholders:
              </Text>

              <Text
                style={{
                  width: "100%",
                  textAlign: "justify",
                  marginBottom: "20px",
                  fontFamily: "ProximaNova",
                }}
              >
                <Text style={{ fontFamily: "ProximaNova" }}>
                  Please note that the{" "}
                  {formData.type_of_meeting == "Special" ? "Special" : "Annual"}{" "}
                  Stockholders' Meeting of
                </Text>
                <Text
                  style={{
                    fontFamily: "ProximaNovaBlack",
                  }}
                >
                  {" " + selectedCompany.companyName.toUpperCase() + " "}
                </Text>
                <Text>(the "Corporation") will be held on </Text>
                <Text>{`${extractDate(formData.others.actual_meeting)}`}</Text>
                <Text>, at </Text>
                <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                  {`${extractTime(formData.others.actual_meeting)}, `}
                </Text>
                <Text>
                  {formData.others.place_of_meeting == "Video Conference" ||
                  formData.others.place_of_meeting == "Teleconference"
                    ? `via ${formData.others.place_of_meeting}.`
                    : `in ${formData.others.place_of_meeting}.`}
                </Text>
              </Text>

              <Text
                style={{
                  marginBottom: "20px",
                  textDecoration: "underline",
                }}
              >
                The Agenda:
              </Text>
              <View style={{ flexDirection: "column", width: 400 }}>
                {formData.others.agendas.map((value, index) => {
                  return (
                    <View
                      key={index}
                      style={{ flexDirection: "row", marginBottom: 4 }}
                    >
                      <Text style={{ textAnchor: "10px" }}>
                        {index + 1 + ". "}
                      </Text>
                      <Text>{value}</Text>
                    </View>
                  );
                })}
              </View>
              <Text> </Text>
              <Text>
                Stockholders intending to attend and vote in the meeting should
                notify the Corporate Secretary by email on or before
                {` ${extractDate(
                  formData.others.confirmation_meeting
                )}, ${extractTime(
                  formData.others.confirmation_meeting
                )} (Philippine Time).`}
              </Text>
              <Text> </Text>
              <Text style={{ marginBottom: "15px" }}>
                Stockholders who cannot attend the meeting but would like to be
                represented thereat should accomplish the attached proxy form
                which has been emailed to them together with this Notice, and
                return the same via email on or before
                {` ${extractDate(
                  formData.others.notice_meeting
                )}, ${extractTime(
                  formData.others.notice_meeting
                )} (Philippine Time).`}
              </Text>

              <Text style={{ margin: "30px 0px" }}>
                FOR THE BOARD OF DIRECTORS:
              </Text>

              <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                {extractDirectorName(formData.others.director)}
              </Text>
              <Text>{extractDirectorPosition(formData.others.director)}</Text>
              <Text>{selectedCompany.latestGIS.official_email_address}</Text>
            </View>
          </View>
        </Page>
        <Page size={"A4"} style={styles.view}>
          <View style={{ padding: "0px 50px" }}>
            {selectedCompany.letterHeader != "" &&
              selectedCompany.letterHeader != null && (
                <View>
                  <Image
                    src={selectedCompany.letterHeader}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignSelf: "center",
                    }}
                  ></Image>
                </View>
              )}
            <View>
              <Text style={styles.title}>Proxy</Text>
              <Text
                style={{
                  marginBottom: "15px",
                  fontFamily: "ProximaNovaBlack",
                }}
              >
                KNOW ALL MEN BY THESE PRESENTS:
              </Text>
              <Text
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                  textAlign: "justify",
                }}
              >
                <Text>I/We the undersigned Stockholder(s) of</Text>
                <Text
                  style={{
                    fontFamily: "ProximaNovaBlack",
                    marginTop: "1.8px",
                  }}
                >
                  {" " + selectedCompany.companyName.toUpperCase() + " "}
                </Text>
                <Text>(the “Corporation”), </Text>
                <Text>do hereby name and appoint:</Text>
              </Text>
              <View style={{ marginBottom: "30px" }}>
                <Svg height="10" width="100%" style={{ marginBottom: "10px" }}>
                  <Line
                    x1="0"
                    y1="10"
                    x2="500"
                    y2="10"
                    strokeWidth={1}
                    stroke="rgb(0,0,0)"
                  />
                </Svg>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                    textAlign: "justify",
                  }}
                >
                  <Text>
                    or in his/her absence, the Chairman of the Meeting, as
                    my/our proxy to represent the undersigned and vote all
                    shares owned by and/ or registered in the name of the
                    undersigned in the books of the Corporation at the Annual
                    Stockholders' Meeting of the Corporation to be held on
                  </Text>
                  <Text>{`${extractDate(
                    formData.others.actual_meeting
                  )}, at `}</Text>
                  <Text>{`${extractTime(
                    formData.others.actual_meeting
                  )}, `}</Text>
                  <Text>
                    {formData.others.place_of_meeting == "Video Conference" ||
                    formData.others.place_of_meeting == "Teleconference"
                      ? `via ${formData.others.place_of_meeting} `
                      : `in ${formData.others.place_of_meeting}, `}
                  </Text>
                  <Text>and at any postponement or </Text>
                  <Text>adjournment thereof.</Text>
                </View>
              </View>
              <View>
                <Svg height="10" width="100%">
                  <Line
                    x1="0"
                    y1="10"
                    x2="230"
                    y2="10"
                    strokeWidth={1}
                    stroke="rgb(0,0,0)"
                  />
                </Svg>
              </View>
              <Text style={{ marginTop: "5px", marginBottom: "5px" }}>
                Signature over Printed Name
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text>Number of shares held:</Text>
                <View
                  style={{
                    width: "100%",
                    marginLeft: "33px",
                    marginTop: "3px",
                  }}
                >
                  <Svg height="10" width="100%">
                    <Line
                      x1="0"
                      y1="10"
                      x2="105"
                      y2="10"
                      strokeWidth={1}
                      stroke="rgb(0,0,0)"
                    />
                  </Svg>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFViewerNOM;
