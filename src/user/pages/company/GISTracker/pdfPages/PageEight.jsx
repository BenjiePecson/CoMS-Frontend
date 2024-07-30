import { Page, Text, Image, StyleSheet, View, Font } from "@react-pdf/renderer";
import pageEight from "../photos/page8.jpg";

import Cambria from "/fonts/Cambria.ttf";
import CambriaBold from "/fonts/CambriaBold.ttf";

Font.register({ family: "Cambria", src: Cambria });
Font.register({ family: "CambriaBold", src: CambriaBold });

const baseFontSize = 12; // Base font size

const styles = StyleSheet.create({
  corporateName: {
    marginTop: 105,
    marginLeft: 120,
    fontSize: "10px",
    fontFamily: "CambriaBold",
    position: "absolute",
  },
  view1: {
    marginTop: 162,
    marginLeft: 300,
    position: "absolute",
  },
  view1_1: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    // fontFamily: "Times-Roman",
    marginBottom: 14,
  },
  text1: {
    width: "170px",
  },

  view2: {
    marginTop: 310,
    marginLeft: 150,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
  },
  text2: {
    // fontFamily: "Times-Roman",
    width: "240px",
  },
  text2_1: {
    // fontFamily: "Times-Roman",
    width: "120px",
  },
  text2_2: {
    // fontFamily: "Times-Bold",
  },
  view3: {
    marginTop: 374,
    marginLeft: 150,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    // fontFamily: "Times-Roman",
  },
  text3: {
    width: "240",
  },

  view4: {
    marginTop: 440,
    marginLeft: 355,
    position: "absolute",
  },
  view4_1: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    // fontFamily: "Times-Roman",
    marginBottom: 4,
  },
  text4: {
    width: "157px",
  },
  view5: {
    marginTop: 596,
    marginLeft: 190,
    position: "absolute",
  },
  view5_1: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    // fontFamily: "Times-Bold",
    marginBottom: 14,
  },
  text5: {
    width: "150px",
  },
  view6: {
    marginTop: 700,
    marginLeft: 120,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    fontSize: "9px",
    // fontFamily: "Times-Bold",
  },
  text6: {
    width: "160px",
  },
  text6_1: {
    width: "125px",
  },
  text6_2: {
    width: "105px",
  },
});

const PageEight = ({ corporate_name }) => {
  return (
    <Page size="A4" style={{ position: "relative", fontFamily: "Cambria" }}>
      <Text style={styles.corporateName}>{corporate_name}</Text>
      <View style={styles.view1}>
        <View style={styles.view1_1}>
          <Text style={styles.text1}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view1_1}>
          <Text style={styles.text1}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view1_1}>
          <Text style={styles.text1}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view1_1}>
          <Text style={styles.text1}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view1_1}>
          <Text style={styles.text1}>N/A</Text>
          <Text>N/A</Text>
        </View>
      </View>

      <View style={styles.view2}>
        <Text style={styles.text2}>N/A</Text>
        <Text style={styles.text2_1}>N/A</Text>
        <Text style={styles.text2_2}>N/A</Text>
      </View>

      <View style={styles.view3}>
        <Text style={styles.text3} t>
          N/A
        </Text>
        <Text>N/A</Text>
      </View>

      <View style={styles.view4}>
        <View style={styles.view4_1}>
          <Text style={styles.text4}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view4_1}>
          <Text style={styles.text4}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view4_1}>
          <Text style={styles.text4}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view4_1}>
          <Text style={styles.text4}></Text>
          <Text>N/A</Text>
        </View>
      </View>

      <View style={styles.view5}>
        <View style={styles.view5_1}>
          <Text style={styles.text5}>N/A</Text>
          <Text style={styles.text5}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view5_1}>
          <Text style={styles.text5}>N/A</Text>
          <Text style={styles.text5}>N/A</Text>
          <Text>N/A</Text>
        </View>
        <View style={styles.view5_1}>
          <Text style={styles.text5}>N/A</Text>
          <Text style={styles.text5}>N/A</Text>
          <Text>N/A</Text>
        </View>
      </View>

      <View style={styles.view6}>
        <Text style={styles.text6}>N/A</Text>
        <Text style={styles.text6_1}>N/A</Text>
        <Text style={styles.text6_2}>N/A</Text>
        <Text>N/A</Text>
      </View>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageEight}
      ></Image>
    </Page>
  );
};

export default PageEight;
