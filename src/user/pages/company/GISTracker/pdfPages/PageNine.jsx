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
});

const PageNine = () => {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateSecretary}>Ma. Ruby Po</Text>
      <Text style={styles.corporateName}>
        OFFSHORE CONCEPT BPO SERVICES INC. ,
      </Text>
      <View style={styles.coporateSignature}>
        <Text style={styles.corporateNameSignature}>MA. RUBY PO</Text>
        <Text style={styles.corporateSecretaryTitle}>Coporate Secretary</Text>
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
