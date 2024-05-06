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
    marginTop: 128,
    marginLeft: 180,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },
  stockHolderInformation: {
    marginTop: 205,
    marginLeft: 32,
  },
  stockHolderInformationView: {
    display: "flex",
    flexDirection: "row",
    height: "60px",
  },
  nameNationalityAddress: {
    display: "flex",
    flexDirection: "column",
    fontSize: "9px",
    width: "173px",
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
    width: "174px",
  },
  shareSubscribe: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    height: "35px",
  },
  shareSubscribeTotal: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    marginLeft: 50,
  },
  type: {
    width: "33px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  number: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "63px",
  },
  ammount: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "40px",
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
    width: "50px",
  },
  ammountPaid: {
    width: "69",
  },

  totalAmountSubscribeCapital: {
    marginTop: 627,
    marginLeft: 304,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    position: "absolute",
  },
  totalAmountSubscribeCapital1: { width: "83px" },
  totalAmountSubscribeCapital2: { width: "95px" },
  totalAmountSubscribeCapital3: {},
});
const PageSeven = ({
  stock_holders_information,
  corporate_name,
  total_number_of_stockholders,
  number_of_stockholders_with_more_shares_each,
  total_assets_based_on_latest_audited,
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
      <Text style={styles.totalAsset}>
        {total_assets_based_on_latest_audited}
      </Text>

      <View style={styles.stockHolderInformation}>
        {stock_holders_information.slice(14).map((txt, index) => (
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
                {txt.percent_of_ownership}%
              </Text>
              <Text style={styles.ammountPaid}>{txt.amount_paid}</Text>
              <Text>{txt.tax_id_number}</Text>
            </View>
          </View>
        ))}
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
