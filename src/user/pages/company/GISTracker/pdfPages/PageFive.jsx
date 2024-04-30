import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageFive from "../photos/page5.jpg";

const stockholdersInformation = [
  {
    name_etc: "MA. RONA B. PO",
    nationality: "FILIPINO",
    address:
      "UP-HO5 North Flair Towers Reliance Street cor Pines Highway Hills, Mandaluyong City",
    type: "COMMON",
    number: "1,189,998",
    amount: "1,189,998.00",
    percent_of_ownership: "53.4801%",
    amount_paid: "1,189,998.00",
    tax_id_number: "208-762-432-000",
    total_number: "1,189,998",
    total_amount: "1,189,998",
  },
  {
    name_etc: "MA. RONA B. PO",
    nationality: "FILIPINO",
    address:
      "UP-HO5 North Flair Towers Reliance Street cor Pines Highway Hills, Mandaluyong City",
    type: "COMMON",
    number: "1,189,998",
    amount: "1,189,998.00",
    percent_of_ownership: "53.4801%",
    amount_paid: "1,189,998.00",
    tax_id_number: "208-762-432-000",
    total_number: "1,189,998",
    total_amount: "1,189,998",
  },
  {
    name_etc: "MA. RONA B. PO",
    nationality: "FILIPINO",
    address:
      "UP-HO5 North Flair Towers Reliance Street cor Pines Highway Hills, Mandaluyong City",
    type: "COMMON",
    number: "1,189,998",
    amount: "1,189,998.00",
    percent_of_ownership: "53.4801%",
    amount_paid: "1,189,998.00",
    tax_id_number: "208-762-432-000",
    total_number: "1,189,998",
    total_amount: "1,189,998",
  },
];

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
    marginLeft: 60,
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
    width: "158px",
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
    width: "190px",
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
  },
  type: {
    width: "65px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  number: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "55px",
  },
  ammount: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "55px",
  },
  totalNumber: {
    fontFamily: "Times-Bold",
    width: "60px",
  },
  totalAmmount: {
    fontFamily: "Times-Bold",
    width: "60px",
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
    marginTop: 228,
    marginLeft: 325,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
  },

  removePercent: {
    backgroundColor: "#234123",
  },
});

const PageFive = () => {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateName}>
        Offshore Concept BPO Services Inc.
      </Text>
      <View style={styles.stockHolders}>
        <Text style={styles.totalNumberOfStockHolder}>10</Text>
        <Text>9</Text>
      </View>

      <View style={styles.stockHolderInformation}>
        {stockholdersInformation.map((txt, index) => (
          <View key={index} style={styles.stockHolderInformationView}>
            <View style={styles.nameNationalityAddress}>
              <Text style={styles.name}>MA. RUBI B. PO</Text>
              <Text>FILIPINO</Text>
              <Text style={styles.address}>
                Unit 1 Ballesteros Townhomes, Ballesteros Street, Mandaluyong
                Cit
              </Text>
            </View>
            <View style={styles.shareSubscribeView}>
              <View style={styles.shareSubscribe}>
                <Text style={styles.type}>COMMON</Text>
                <Text style={styles.number}>1</Text>
                <Text style={styles.ammount}>1.00</Text>
              </View>
              <View style={styles.shareSubscribeTotal}>
                <Text style={styles.totalNumber}>1189998</Text>
                <Text style={styles.totalAmmount}>123123</Text>
              </View>
            </View>

            <View style={styles.shareSView}>
              <Text style={styles.percentOfOwnership}>0.01%</Text>
              <Text style={styles.ammountPaid}>1.00</Text>
              <Text>306-557-791-000</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.totalAsset}>7,566,724.00</Text>
      <View style={styles.totalAmountSubscribeCapital}>
        <Text>0000000</Text>
        <Text>100%</Text>
      </View>
      <View style={styles.removePercent}></View>
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

export default PageFive;
