import React from "react";
import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageThree from "../photos/page3.jpg";

const authorizedCapitalStock = [
  {
    id: 1,
    tos: "COMMON",
    nos: "6,000,000",
    psv: "1.0",
    amt: "6,000,000",
  },
  {
    id: 2,
    tos: "COMMON",
    nos: "6,000,000",
    psv: "1.0",
    amt: "6,000,000",
  },
  {
    id: 3,
    tos: "COMMON",
    nos: "6,000,000",
    psv: "1.0",
    amt: "6,000,000",
  },
  {
    id: 4,
    tos: "COMMON",
    nos: "6,000,000",
    psv: "1.0",
    amt: "6,000,000",
  },
  {
    id: 5,
    tos: "COMMON",
    nos: "6,000,000",
    psv: "1.0",
    amt: "6,000,000",
  },
];
const filipinosubscribeCapital = [
  {
    id: 1,
    number_of_stock_holders: "8",
    types_of_shares: "COMMON",
    number_of_shares: "1,475,099",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1",
    amount: "1,475,099",
    percent_of_ownership: "66.290%",
  },
  {
    id: 2,
    number_of_stock_holders: "8",
    types_of_shares: "COMMON",
    number_of_shares: "1,475,099",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1",
    amount: "1,475,099",
    percent_of_ownership: "66.290%",
  },
  {
    id: 3,
    number_of_stock_holders: "8",
    types_of_shares: "COMMON",
    number_of_shares: "1,475,099",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1",
    amount: "1,475,099",
    percent_of_ownership: "66.290%",
  },
  {
    id: 4,
    number_of_stock_holders: "8",
    types_of_shares: "COMMON",
    number_of_shares: "1,475,099",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1",
    amount: "1,475,099",
    percent_of_ownership: "66.290%",
  },
  {
    id: 5,
    number_of_stock_holders: "8",
    types_of_shares: "COMMON",
    number_of_shares: "1,475,099",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1",
    amount: "1,475,099",
    percent_of_ownership: "66.290%",
  },
];
const foreignSubscribeCapital = [
  {
    id: 1,
    nationality: "SINGAPOREAN",
    number_of_stock_holders: "1",
    types_of_shares: "COMMON",
    number_of_shares: "749,999",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1.00",
    amount: "749,999.00",
    percent_of_ownership: "33.71%",
  },
  {
    id: 2,
    nationality: "AUSTRALIAN",
    number_of_stock_holders: "1",
    types_of_shares: "COMMON",
    number_of_shares: "1",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1.00",
    amount: "1.00",
    percent_of_ownership: "0.00%",
  },
  {
    id: 3,
    nationality: "AUSTRALIAN",
    number_of_stock_holders: "1",
    types_of_shares: "COMMON",
    number_of_shares: "1",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1.00",
    amount: "1.00",
    percent_of_ownership: "0.00%",
  },
  {
    id: 4,
    nationality: "AUSTRALIAN",
    number_of_stock_holders: "1",
    types_of_shares: "COMMON",
    number_of_shares: "1",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1.00",
    amount: "1.00",
    percent_of_ownership: "0.00%",
  },
  {
    id: 5,
    nationality: "AUSTRALIAN",
    number_of_stock_holders: "1",
    types_of_shares: "COMMON",
    number_of_shares: "1",
    number_of_shares_in_hands: "",
    par_or_stated_value: "1.00",
    amount: "1.00",
    percent_of_ownership: "0.00%",
  },
];

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
  fcs9: { width: "58%" },
  fcs10: { width: "28%" },

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
    width: "25%",
  },
  foreignEquityText2: {
    width: "42%",
  },
  foreignEquityText3: {
    width: "20%",
  },
  foreignEquityText4: {
    width: "15%",
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
  filipinoPaidUpCapital: {
    marginTop: 563,
    marginLeft: 445,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  filipinoPaidUpCapitalText2: {
    width: "65%",
  },

  //Foreign Paid-up Capital
  foreignPaidUpCapital: {
    marginTop: 638,
    marginLeft: 445,
    fontFamily: "Times-Bold",
    fontSize: "10px",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  foreignPaidUpCapitalText1: {
    width: "71%",
  },
});

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
              {txt.number_of_shares}
            </Text>
            <Text style={styles.authorizedCapitalStock3}>
              {txt.par_or_stated_value}
            </Text>
            <Text style={styles.authorizedCapitalStock4}>{txt.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.filipinosubscribeCapitalStyle}>
        {subscribe_capital_filipino.map((txt, index) => (
          <View key={index} style={styles.displayFlex2}>
            <Text style={styles.fcs1}></Text>
            <Text style={styles.fcs2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fcs3}>{txt.types_of_shares}</Text>
            <Text style={styles.fcs4}>{txt.number_of_shares}</Text>
            <Text style={styles.fcs5}>{txt.number_of_shares_in_hands}</Text>
            <Text style={styles.fcs6}>{txt.par_or_stated_value}</Text>
            <Text style={styles.fcs7}>{txt.amount}</Text>
            <Text style={styles.fcs8}>{txt.percent_of_ownership}</Text>
          </View>
        ))}
      </View>
      <View style={styles.foreignsubscribeCapitalStyle}>
        {subscribe_capital_foreign.map((txt, index) => (
          <View key={index} style={styles.displayFlex3}>
            <Text style={styles.fSubCap1}>{txt.nationality}</Text>
            <Text style={styles.fSubCap2}>{txt.number_of_stock_holders}</Text>
            <Text style={styles.fSubCap3}>{txt.types_of_shares}</Text>
            <Text style={styles.fSubCap4}>{txt.number_of_shares}</Text>
            <Text style={styles.fSubCap5}>{txt.number_of_shares_in_hands}</Text>
            <Text style={styles.fSubCap6}>{txt.par_or_stated_value}</Text>
            <Text style={styles.fSubCap7}>{txt.amount}</Text>
            <Text style={styles.fSubCap8}>{txt.percent_of_ownership}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.corporateName}>{corporate_name}</Text>

      <View style={styles.displayFlexTotal}>
        <Text style={styles.authorizedCapitalStockTotal1}>
          {auth_capital_stock_total_number_of_shares}
        </Text>
        <Text style={styles.authorizedCapitalStockTotal2}>
          {auth_capital_stock_total_amount}
        </Text>
      </View>

      <View style={styles.displayTotalFlex2}>
        <Text style={styles.fcs9}>{sub_total_number_of_shares_filipino}</Text>
        <Text style={styles.fcs10}>{sub_total_amount_filipino}</Text>
        <Text>{sub_total_ownership_filipino}%</Text>
      </View>

      <View style={styles.foreignEquity}>
        <Text style={styles.foreignEquityText1}>
          {percentage_of_foreign_equity}%
        </Text>
        <Text style={styles.foreignEquityText2}>
          {sub_total_number_of_shares_foreign}
        </Text>
        <Text style={styles.foreignEquityText3}>
          {sub_total_amount_foreign}
        </Text>
        <Text style={styles.foreignEquityText4}>
          {sub_total_ownership_foreign}%
        </Text>
      </View>

      <View style={styles.foreignEquity2}>
        <Text style={styles.foreignEquityText5}>2,225,099.00</Text>
        <Text style={styles.foreignEquityText6}>100%</Text>
      </View>

      <Text style={styles.filipinoPaidUpCapitalText1}>66.290%</Text>

      <View style={styles.filipinoPaidUpCapital}>
        <Text style={styles.filipinoPaidUpCapitalText2}>0.00</Text>
        <Text>66.290%</Text>
      </View>

      <View style={styles.foreignPaidUpCapital}>
        <Text style={styles.foreignPaidUpCapitalText1}>2,225,099.00</Text>
        <Text>100%</Text>
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
