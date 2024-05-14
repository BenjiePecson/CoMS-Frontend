import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageSix from "../photos/page6.jpg";

const styles = StyleSheet.create({
  corporateName: {
    marginTop: 95,
    marginLeft: 120,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },

  stockHolders: {
    marginTop: 114,
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
    marginTop: 136,
    marginLeft: 180,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },
  stockHolderInformation: {
    marginTop: 215,
    marginLeft: 32,
  },
  stockHolderInformationView: {
    display: "flex",
    flexDirection: "row",
    height: "50px",
    marginBottom: 3,
  },
  nameNationalityAddress: {
    display: "flex",
    flexDirection: "column",
    fontSize: "9px",
    width: "166px",
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
    width: "182px",
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
    width: "43px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  number: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "50px",
    textAlign: "right",
  },
  ammount: {
    fontFamily: "Times-Bold",
    fontSize: "9px",
    width: "82px",
    textAlign: "right",
  },
  totalNumber: {
    fontFamily: "Times-Bold",
    width: "45px",
    textAlign: "right",
  },
  totalAmmount: {
    fontFamily: "Times-Bold",
    width: "80px",
    textAlign: "right",
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
    width: "75px",
  },

  totalAmountSubscribeCapital: {
    marginTop: 586,
    marginLeft: 305,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "9px",
    position: "absolute",
  },
  totalAmountSubscribeCapital1: { width: "84px" },
  totalAmountSubscribeCapital2: {
    padding: "1px",
    width: "60px",

    marginRight: 45,
  },
  totalAmountSubscribeCapital3: {
    padding: "1px",
  },
});

const PageSix = ({
  stock_holders_information,
  corporate_name,
  total_number_of_stockholders,
  number_of_stockholders_with_more_shares_each,
  total_assets_based_on_latest_audited,
  subscribe_capital_total_amount,
  subscribe_capital_total_percent_of_ownership,
}) => {
  const formatNumberWithComma = (number) => {
    // Convert number to fixed 2 decimal places

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
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
        {formatNumberWithComma(total_assets_based_on_latest_audited)}
      </Text>
      <View style={styles.stockHolderInformation}>
        {stock_holders_information.slice(7, 14).map((txt, index) => (
          <View key={index} style={styles.stockHolderInformationView}>
            <View style={styles.nameNationalityAddress}>
              <Text style={styles.name}>{txt.name}</Text>
              <Text>{txt.nationality}</Text>
              <Text style={styles.address}>{txt.current_residual_address}</Text>
            </View>
            <View style={styles.shareSubscribeView}>
              <View style={styles.shareSubscribe}>
                <Text style={styles.type}>{txt.type}</Text>
                <Text style={styles.number}>
                  {formatNumberWithComma(txt.number)}
                </Text>
                <Text style={styles.ammount}>
                  {formatNumberWithComma(Number(txt.amount).toFixed(2))}
                </Text>
              </View>
              <View style={styles.shareSubscribeTotal}>
                <Text style={styles.totalNumber}>
                  {Number(txt.total_number).toFixed(2)}
                </Text>
                <Text style={styles.totalAmmount}>
                  {formatNumberWithComma(Number(txt.total_amount).toFixed(2))}
                </Text>
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
        <Text style={styles.totalAmountSubscribeCapital1}>
          {formatNumberWithComma(
            Number(subscribe_capital_total_amount).toFixed(2)
          )}
        </Text>
        <Text style={styles.totalAmountSubscribeCapital2}>
          {subscribe_capital_total_percent_of_ownership}%
        </Text>
        <Text style={styles.totalAmountSubscribeCapital3}></Text>
      </View>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageSix}
      ></Image>
    </Page>
  );
};

export default PageSix;
