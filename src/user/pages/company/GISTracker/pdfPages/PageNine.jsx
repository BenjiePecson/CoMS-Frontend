import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageNine from "../photos/page9.jpg";

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

const PageNine = ({ corporate_secretary, coporate_name }) => {
  return (
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
};

export default PageNine;
