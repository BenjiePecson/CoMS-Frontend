import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageNine from "../photos/page9_new.jpg";

const styles = StyleSheet.create({
  corporateSecretary: {
    marginTop: 50,
    marginLeft: 30,
    textAlign: "center",
    width: "166px",
    fontFamily: "Times-Bold",
    fontSize: "11px",
    position: "absolute",
  },
  corporateName: {
    marginTop: 53,
    marginLeft: 315,
    textAlign: "center",
    width: "166px",
    fontFamily: "Times-Roman",
    fontSize: "7px",
  },
  coporateSignature: {
    marginTop: 300,
    marginLeft: 315,
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  corporateNameSignature: {
    fontFamily: "Times-Bold",
    fontSize: "11px",
  },
  corporateSecretaryTitle: {
    fontFamily: "Times-Roman",
    fontSize: "10px",
  },
  inputPreview: {
    marginTop: 500,
    marginLeft: 50,
    position: "absolute",
    fontFamily: "Times-Bold",
    fontSize: "11px",
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

const PageNine = ({ formData, corporate_secretary, coporate_name }) => {
  const baseFontSize = 12;

  const page9_old = (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateSecretary}>{corporate_secretary}</Text>
      <Text style={styles.corporateName}>{coporate_name}</Text>
      <View style={styles.coporateSignature}>
        <Text style={styles.corporateNameSignature}>
          {corporate_secretary.toUpperCase()}
        </Text>
        <Text style={styles.corporateSecretaryTitle}>Coporate Secretary</Text>
      </View>

      <View style={styles.inputPreview}>
        <Text>Doc No.: _________________</Text>
        <Text>Page No.: _________________</Text>
        <Text>Book No.: _________________</Text>
        <Text>Series No.: __________________</Text>
      </View>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageNine}
      ></Image>
    </Page>
  );

  const page9 = () => (
    <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
      {/* <Text style={styles.corporateSecretary}>{corporate_secretary}</Text>
      <Text style={styles.corporateName}>{coporate_name}</Text>
      <View style={styles.coporateSignature}>
        <Text style={styles.corporateNameSignature}>
          {corporate_secretary.toUpperCase()}
        </Text>
        <Text style={styles.corporateSecretaryTitle}>Coporate Secretary</Text>
      </View> */}

      {/* <View style={styles.inputPreview}>
        <Text>Doc No.: _________________</Text>
        <Text>Page No.: _________________</Text>
        <Text>Book No.: _________________</Text>
        <Text>Series No.: __________________</Text>
      </View> */}

      <View>
        <View
          style={{
            marginTop: 86,
            marginLeft: 62,
            fontSize: "11px",
            position: "absolute",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "171px",
              height: "15px",
            }}
          >
            <Text
              style={{
                fontFamily: "CambriaBold",
                textAlign: "center",
                fontSize: getFontSize(
                  formData.corporate_secretary.length,
                  25,
                  baseFontSize - 1
                ),
              }}
            >
              {formData.corporate_secretary}
            </Text>
          </View>
          <View
            style={{
              width: "174px",
              marginLeft: "112px",
              height: "15px",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: getFontSize(
                  formData.corporate_name.length,
                  27,
                  baseFontSize - 1
                ),
                fontFamily: "CambriaBold",
              }}
            >
              {formData.corporate_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 382,
            marginLeft: 338,
            fontSize: "11px",
            position: "absolute",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "209px",
              height: "15px",
            }}
          >
            <Text
              style={{
                fontFamily: "CambriaBold",
                textAlign: "center",
                fontSize: getFontSize(
                  formData.corporate_secretary.length,
                  31,
                  baseFontSize - 1
                ),
              }}
            >
              {formData.corporate_secretary}
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
        src={pageNine}
      ></Image>
    </Page>
  );
  return page9();
};

export default PageNine;
