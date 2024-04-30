import React from "react";
import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageFour from "../photos/page4.jpg";

const directorsOrOfficers = [
  {
    name_or_current: "ROVIMAE B. PO",
    residual_address:
      "230 Happy Homes CampoSioco, Brgy. Ferdinand, Baguio City",
    nationality: "FILIPINO",
    incorporator: "Y",
    board: "C",
    gender: "F",
    stock_holder: "Y",
    officer: "PRESIDENT",
    executive_committe: "N/A",
    tax_id_number: "429-981-055-000",
  },
  {
    name_or_current: "MA RUBI B. PO",
    residual_address:
      "230 Happy Homes CampoSioco, Brgy. Ferdinand, Baguio City",
    nationality: "FILIPINO",
    incorporator: "N",
    board: "M",
    gender: "F",
    stock_holder: "N",
    officer: "CORPORATE SECRETARY",
    executive_committe: "N/A",
    tax_id_number: "306-557-791-000",
  },
  {
    name_or_current: "ZSOLT MALOTA",
    residual_address:
      "UP HO5 North Flair Towers Reliance Street cor Pines Highway Hills, Mandaluyong ",
    nationality: "AUSTRALIAN",
    incorporator: "N",
    board: "M",
    gender: "M",
    stock_holder: "Y",
    officer: "TREASURER",
    executive_committe: "N/A",
    tax_id_number: "496-880-660-000",
  },
  {
    name_or_current: "REYNALDO P. MACROHON",
    residual_address:
      "Blk 3 Lot 11, Phase 2B, Camella Bermuda, Banlic, Cabuyao City, Laguna",
    nationality: "FILIPINO",
    incorporator: "N",
    board: "",
    gender: "M",
    stock_holder: "Y",
    officer: "N/A",
    executive_committe: "N/A",
    tax_id_number: "100-625-806-000",
  },
  {
    name_or_current: "RODOLFO B. PO III",
    residual_address:
      "230 Happy Homes CampoSioco, Brgy. Ferdinand, Baguio City",
    nationality: "FILIPINO",
    incorporator: "N",
    board: "",
    gender: "M",
    stock_holder: "Y",
    officer: "N/A",
    executive_committe: "N/A",
    tax_id_number: "732-602-644-000",
  },
];

const styles = StyleSheet.create({
  corporateName: {
    marginTop: 92,
    marginLeft: 120,
    fontSize: "10px",
    fontFamily: "Times-Bold",
    position: "absolute",
  },
  directorsOfficer: {
    marginTop: 148,
    marginLeft: 35,
  },
  directorsOfficerInfo: {
    display: "flex",
    flexDirection: "row",
    margin: "3px",
    height: "23px",
  },
  nameAddress: {
    width: "162px",
    flexDirection: "column",
  },
  name: { fontFamily: "Times-Bold", fontSize: "8px" },
  address: {
    fontFamily: "Times-Roman",
    width: "100px",
    fontSize: "6px",
  },
  nationality: {
    width: "65px",
    fontFamily: "Times-Bold",
    fontSize: "7px",
  },
  incr: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  board: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  gender: { width: "38px", fontFamily: "Times-Bold", fontSize: "10px" },
  stockHolder: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  officer: { width: "50px", fontFamily: "Times-Bold", fontSize: "7px" },
  execCom: { width: "35px", fontFamily: "Times-Bold", fontSize: "10px" },
  tin: { width: "", fontFamily: "Times-Bold", fontSize: "10px" },
});
function PageFour({ directors_or_officers, corporate_name }) {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.corporateName}>{corporate_name}</Text>
      <View style={styles.directorsOfficer}>
        {directors_or_officers.map((txt, index) => (
          <View key={index} style={styles.directorsOfficerInfo}>
            <View style={styles.nameAddress}>
              <Text style={styles.name}>{txt.name}</Text>
              <Text style={styles.address}>{txt.current_residual_address}</Text>
            </View>
            <Text style={styles.nationality}>{txt.nationality}</Text>
            <Text style={styles.incr}>{txt.incorporator}</Text>
            <Text style={styles.board}>{txt.board}</Text>
            <Text style={styles.gender}>{txt.gender}</Text>
            <Text style={styles.stockHolder}>{txt.stock_holder}</Text>
            <Text style={styles.officer}>{txt.officer}</Text>
            <Text style={styles.execCom}>{txt.executive_committe}</Text>
            <Text style={styles.tin}>{txt.tax_id_number}</Text>
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
        src={pageFour}
      ></Image>
    </Page>
  );
}

export default PageFour;
