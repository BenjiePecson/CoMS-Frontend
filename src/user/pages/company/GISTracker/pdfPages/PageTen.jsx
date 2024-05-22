import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageTen from "../photos/page10.jpg";

const styles = StyleSheet.create({
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

const PageTen = ({ beneficial_ownership_declaration, year }) => {
  return (
    <Page size="A4" style={{ position: "relative" }}>
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

export default PageTen;
