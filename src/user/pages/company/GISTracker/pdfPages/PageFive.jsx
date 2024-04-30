import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageFive from "../photos/page5.jpg";

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
    height: "53px",
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

const PageFive = ({
  corporate_name,
  total_number_of_stockholders,
  number_of_stockholders_with_more_shares_each,
  total_assets_based_on_latest_audited,
  stock_holders_information,
}) => {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateName}>{corporate_name}</Text>
      <View style={styles.stockHolders}>
        <Text style={styles.totalNumberOfStockHolder}>
          {total_number_of_stockholders}
        </Text>
        <Text>{number_of_stockholders_with_more_shares_each}</Text>
      </View>

      <View style={styles.stockHolderInformation}>
        {stock_holders_information.slice(0, 7).map((txt, index) => (
          <View key={index} style={styles.stockHolderInformationView}>
            <View style={styles.nameNationalityAddress}>
              <Text style={styles.name}>{txt.name}</Text>
              <Text>{txt.nationality}</Text>
              <Text style={styles.address}>{txt.current_residual_address}</Text>
            </View>
            <View style={styles.shareSubscribeView}>
              <View style={styles.shareSubscribe}>
                <Text style={styles.type}>{txt.type}</Text>
                <Text style={styles.number}>{txt.number}</Text>
                <Text style={styles.ammount}>{txt.amount}</Text>
              </View>
              <View style={styles.shareSubscribeTotal}>
                <Text style={styles.totalNumber}>{txt.total_number}</Text>
                <Text style={styles.totalAmmount}>{txt.total_amount}</Text>
              </View>
            </View>

            <View style={styles.shareSView}>
              <Text style={styles.percentOfOwnership}>
                {txt.percent_of_ownership}
              </Text>
              <Text style={styles.ammountPaid}>{txt.amount_paid}</Text>
              <Text>{txt.tax_id_number}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.totalAsset}>
        {total_assets_based_on_latest_audited}
      </Text>
      {/* <View style={styles.totalAmountSubscribeCapital}>
        <Text>0000000</Text>
        <Text>100%</Text>
      </View> */}

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
