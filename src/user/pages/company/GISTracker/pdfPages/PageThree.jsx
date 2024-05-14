import React from "react";
import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageThree from "../photos/page3.jpg";

const styles = StyleSheet.create({
  corporateName: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    margin: "5px",
    marginTop: 99,
    marginLeft: 220,
    position: "absolute",
  },
  //Authorize Capital Stock
  autorizedCapitalStock: {
    marginTop: 170,
    position: "absolute",
  },
  displayFlex1: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 150,
  },
  authorizedCapitalStock1: { width: "20%" },
  authorizedCapitalStock2: { width: "25%" },
  authorizedCapitalStock3: { width: "25%" },
  authorizedCapitalStock4: { width: "25%" },

  displayFlexTotal: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 240,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 213,
    position: "absolute",
  },
  authorizedCapitalStockTotal1: {
    width: "55%",
  },
  authorizedCapitalStockTotal2: {
    width: "70%",
  },

  //Filipino Subscribe Capital
  filipinosubscribeCapitalStyle: {
    marginTop: 285,
    position: "absolute",
  },
  displayFlex2: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 50,
  },
  fcs1: {
    width: "10%",
  },
  fcs2: {
    width: "10%",
  },
  fcs3: { width: "14%" },
  fcs4: { width: "15%" },
  fcs5: { width: "10%" },
  fcs6: { width: "13%" },
  fcs7: { width: "17%" },
  fcs8: { width: "10%" },
  displayTotalFlex2: {
    marginTop: 328,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  fcs9: { width: "200px" },
  fcs10: { width: "95px" },

  //FOREIGN SUBSCRIBED CAPITAL
  foreignsubscribeCapitalStyle: {
    marginTop: 390,
    position: "absolute",
  },
  displayFlex3: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "8px",
    marginLeft: 20,
  },
  fSubCap1: {
    fontSize: "7px",
    width: "15%",
  },
  fSubCap2: {
    width: "8%",
  },
  fSubCap3: {
    width: "15%",
  },
  fSubCap4: {
    width: "15%",
  },
  fSubCap5: {
    width: "8%",
  },
  fSubCap6: {
    width: "13%",
  },
  fSubCap7: {
    width: "16%",
  },
  fSubCap8: {
    width: "10%",
  },

  //Percentage of Foreign Equity
  foreignEquity: {
    marginTop: 443,
    marginLeft: 120,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
  foreignEquityText1: {
    width: "117px",
  },
  foreignEquityText2: {
    width: "198px",
  },
  foreignEquityText3: {
    width: "104px",
  },
  foreignEquityText4: {
    width: "",
  },

  foreignEquity2: {
    marginTop: 454,
    marginLeft: 435,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
  foreignEquityText5: {
    width: "65%",
  },
  foreignEquityText6: {
    width: "60%",
  },

  //Filipino Paid-Up Capital
  filipinoPaidUpCapitalText1: {
    marginTop: 510,
    marginLeft: 530,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },

  filipinoPaidUpCapitalText2: {
    width: "65%",
  },

  foreignPaidUpCapitalText1: {
    width: "71%",
  },
  //Updated
  filipinoPaidUpCapital: {
    marginTop: 510,
    position: "absolute",
  },
  filipinoPaidUpCapitalTotal: {
    marginTop: 563,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  foreignPaidUpCapitalTotal: {
    marginTop: 638,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    marginLeft: 236,
  },
  foreignPaidUpCapital: {
    marginTop: 585,
    position: "absolute",
  },
  totalPaidUp: {
    marginTop: 650,
    marginLeft: 435,
    display: "flex",
    flexDirection: "row",
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
  },
});

const formatNumberWithComma = (number) => {
  // Convert number to fixed 2 decimal places
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function PageThree({
  corporate_name,
  auth_capital_stock,
  auth_capital_stock_total_number_of_shares,
  auth_capital_stock_total_amount,
  subscribe_capital_filipino,
  subscribe_capital_foreign,
  sub_total_number_of_shares_filipino,
  sub_total_amount_filipino,
  sub_total_ownership_filipino,
  percentage_of_foreign_equity,
  sub_total_number_of_shares_foreign,
  sub_total_amount_foreign,
  sub_total_ownership_foreign,
  subscribe_capital_total_amount,
  subscribe_capital_total_percent_of_ownership,
  filipino_paid_up_capital,
  foreign_paid_up_capital,
  paid_up_sub_total_amount_filipino,
  paid_sub_total_ownership_filipino,
  paid_sub_total_number_of_shares_filipino,
  paid_up_sub_total_amount_foreign,
  paid_sub_total_ownership_foreign,
  paid_sub_total_number_of_shares_foreign,
  paid_up_capital_total_amount,
  paid_total_percent_ownership,
}) {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <View style={styles.autorizedCapitalStock}>
        {auth_capital_stock.map((txt, index) => (
          <View key={index} style={styles.displayFlex1}>
            <Text style={styles.authorizedCapitalStock1}>
              {txt.type_of_shares}
            </Text>
            <Text style={styles.authorizedCapitalStock2}>
              {formatNumberWithComma(txt.number_of_shares)}
            </Text>
            <Text style={styles.authorizedCapitalStock3}>
              {Number(txt.par_or_stated_value).toFixed(2)}
            </Text>
            <Text style={styles.authorizedCapitalStock4}>
              {formatNumberWithComma(Number(txt.amount).toFixed(2))}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.filipinosubscribeCapitalStyle}>
        {subscribe_capital_filipino.map((txt, index) => (
          <View key={index} style={styles.displayFlex2}>
            <Text style={styles.fcs1}></Text>
            <Text style={styles.fcs2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fcs3}>{txt.types_of_shares}</Text>
            <Text style={styles.fcs4}>
              {formatNumberWithComma(txt.number_of_shares)}
            </Text>
            <Text style={styles.fcs5}>{txt.number_of_shares_in_hands}</Text>
            <Text style={styles.fcs6}>
              {Number(txt.par_or_stated_value).toFixed(2)}
            </Text>
            <Text style={styles.fcs7}>
              {formatNumberWithComma(Number(txt.amount).toFixed(2))}
            </Text>
            <Text style={styles.fcs8}>{txt.percent_of_ownership}%</Text>
          </View>
        ))}
      </View>
      <View style={styles.foreignsubscribeCapitalStyle}>
        {subscribe_capital_foreign.map((txt, index) => (
          <View key={index} style={styles.displayFlex3}>
            <Text style={styles.fSubCap1}>{txt.nationality}</Text>
            <Text style={styles.fSubCap2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fSubCap3}>{txt.types_of_shares}</Text>
            <Text style={styles.fSubCap4}>
              {formatNumberWithComma(txt.number_of_shares)}
            </Text>
            <Text style={styles.fSubCap5}>{txt.number_of_shares_in_hands}</Text>
            <Text style={styles.fSubCap6}>
              {Number(txt.par_or_stated_value).toFixed(2)}
            </Text>
            <Text style={styles.fSubCap7}>
              {formatNumberWithComma(Number(txt.amount).toFixed(2))}
            </Text>
            <Text style={styles.fSubCap8}>{txt.percent_of_ownership}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.corporateName}>{corporate_name}</Text>

      <View style={styles.displayFlexTotal}>
        <Text style={styles.authorizedCapitalStockTotal1}>
          {formatNumberWithComma(auth_capital_stock_total_number_of_shares)}
        </Text>
        <Text style={styles.authorizedCapitalStockTotal2}>
          {formatNumberWithComma(
            Number(auth_capital_stock_total_amount).toFixed(2)
          )}
        </Text>
      </View>

      <View style={styles.displayTotalFlex2}>
        <Text style={styles.fcs9}>
          {formatNumberWithComma(sub_total_number_of_shares_filipino)}
        </Text>
        <Text style={styles.fcs10}>
          {formatNumberWithComma(Number(sub_total_amount_filipino).toFixed(2))}
        </Text>
        <Text>{sub_total_ownership_filipino}%</Text>
      </View>

      <View style={styles.foreignEquity}>
        <Text style={styles.foreignEquityText1}>
          {percentage_of_foreign_equity}%
        </Text>
        <Text style={styles.foreignEquityText2}>
          {formatNumberWithComma(sub_total_number_of_shares_foreign)}
        </Text>
        <Text style={styles.foreignEquityText3}>
          {formatNumberWithComma(Number(sub_total_amount_foreign).toFixed(2))}
        </Text>
        <Text style={styles.foreignEquityText4}>
          {sub_total_ownership_foreign}%
        </Text>
      </View>

      <View style={styles.foreignEquity2}>
        <Text style={styles.foreignEquityText5}>
          {formatNumberWithComma(
            Number(subscribe_capital_total_amount).toFixed(2)
          )}
        </Text>
        <Text style={styles.foreignEquityText6}>
          {subscribe_capital_total_percent_of_ownership}%
        </Text>
      </View>

      <View style={styles.filipinoPaidUpCapital}>
        {filipino_paid_up_capital.map((txt) => (
          <View key={txt.id} style={styles.displayFlex2}>
            <Text style={styles.fcs1}></Text>
            <Text style={styles.fcs2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fcs3}>{txt.types_of_shares}</Text>
            <Text style={styles.fcs4}>
              {formatNumberWithComma(txt.number_of_shares)}
            </Text>
            <Text style={styles.fcs5}>
              {Number(txt.par_or_stated_value).toFixed(2)}
            </Text>
            <Text style={styles.fcs6}>{txt.number_of_shares_in_hands}</Text>
            <Text style={styles.fcs7}>
              {formatNumberWithComma(Number(txt.amount).toFixed(2))}
            </Text>
            <Text style={styles.fcs8}>{txt.percent_of_ownership}</Text>
          </View>
        ))}
      </View>

      <View style={styles.foreignPaidUpCapital}>
        {foreign_paid_up_capital.map((txt) => (
          <View key={txt.id} style={styles.displayFlex3}>
            <Text style={styles.fSubCap1}>{txt.nationality}</Text>
            <Text style={styles.fSubCap2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fSubCap3}>{txt.types_of_shares}</Text>
            <Text style={styles.fSubCap4}>
              {formatNumberWithComma(txt.number_of_shares)}
            </Text>
            <Text style={styles.fSubCap5}>{txt.par_or_stated_value}</Text>
            <Text style={styles.fSubCap6}>
              {Number(txt.number_of_shares_in_hands).toFixed(2)}
            </Text>
            <Text style={styles.fSubCap7}>
              {formatNumberWithComma(Number(txt.amount).toFixed(2))}
            </Text>
            <Text style={styles.fSubCap8}>{txt.percent_of_ownership}</Text>
          </View>
        ))}
      </View>

      <View style={styles.filipinoPaidUpCapitalTotal}>
        <Text style={styles.fcs9}>
          {formatNumberWithComma(paid_sub_total_number_of_shares_filipino)}
        </Text>
        <Text style={styles.fcs10}>
          {formatNumberWithComma(
            Number(paid_up_sub_total_amount_filipino).toFixed(2)
          )}
        </Text>
        <Text>{paid_sub_total_ownership_filipino}%</Text>
      </View>

      <View style={styles.foreignPaidUpCapitalTotal}>
        <Text style={styles.fcs9}>
          {formatNumberWithComma(paid_sub_total_number_of_shares_foreign)}
        </Text>
        <Text style={styles.fcs10}>
          {formatNumberWithComma(
            Number(paid_up_sub_total_amount_foreign).toFixed(2)
          )}
        </Text>
        <Text>{paid_sub_total_ownership_foreign}%</Text>
      </View>

      <View style={styles.totalPaidUp}>
        <Text style={styles.foreignEquityText5}>
          {formatNumberWithComma(
            Number(paid_up_capital_total_amount).toFixed(2)
          )}
        </Text>
        <Text style={styles.foreignEquityText6}>
          {paid_total_percent_ownership}%
        </Text>
      </View>

      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageThree}
      ></Image>
    </Page>
  );
}

export default PageThree;
