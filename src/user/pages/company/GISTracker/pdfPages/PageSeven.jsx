import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageSeven from "../photos/page7.jpg";
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

  totalAmountSubscribeCapital: {
    marginTop: 626,
    marginLeft: 320,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    position: "absolute",
  },
  totalAmountSubscribeCapital1: {
    width: "40px",
    position: "absolute",
  },
  totalAmountSubscribeCapital2: {
    padding: "1px",
    width: "25px",
    backgroundColor: "#ffffff",
    position: "absolute",
    marginLeft: 66,
  },
  totalAmountSubscribeCapital3: {
    marginTop: 5,
    marginLeft: 167,
    padding: "1px",
    width: "25px",
    backgroundColor: "#ffffff",
  },
});
const PageSeven = () => {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateName}>
        Offshore Concept BPO Services Inc.
      </Text>
      <View style={styles.stockHolders}>
        <Text style={styles.totalNumberOfStockHolder}>10</Text>
        <Text>9</Text>
      </View>
      <View style={styles.totalAmountSubscribeCapital}>
        <Text style={styles.totalAmountSubscribeCapital1}>0000000</Text>
        <Text style={styles.totalAmountSubscribeCapital2}>16%</Text>
        <Text style={styles.totalAmountSubscribeCapital3}>0.00</Text>
      </View>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageSeven}
      ></Image>
    </Page>
  );
};

export default PageSeven;
