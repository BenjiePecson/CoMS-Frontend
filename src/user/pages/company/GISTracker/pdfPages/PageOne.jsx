import { Page, Text, Image, StyleSheet, View } from "@react-pdf/renderer";
import pageOne from "../photos/page1.jpg";

const styles = StyleSheet.create({
  year: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 70,
    marginLeft: 295,
    position: "absolute",
  },
  view1: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 305,
    marginLeft: 470,
    position: "absolute",
  },
  text1_1: {
    marginBottom: 19,
  },
  text1_1_1: {
    marginBottom: 20,
  },
  text1_2: {
    marginBottom: 27,
  },
  text1_3: {
    marginBottom: 15,
  },
  text1_4: {
    marginBottom: 18,
  },
  text1_5: {
    marginBottom: 23,
  },
  text1_6: {
    marginBottom: 30,
  },
  text2_1_1: {
    marginBottom: 35,
  },
  text2_2: {
    marginBottom: 35,
  },
  text2_3: {
    marginBottom: 20,
  },
  text2_4: {
    marginBottom: 20,
  },
  text2_5: {
    marginBottom: 20,
  },
  text2_6: {
    marginBottom: 30,
  },
  view2: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 305,
    marginLeft: 60,
    position: "absolute",
  },
  view3: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 524,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  text2_1: {
    width: "51%",
  },
  view4: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 560,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
  view5: {
    fontFamily: "Times-Bold",
    fontSize: "10px",
    marginTop: 600,
    marginLeft: 50,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
  },
});

function PageOne({
  year,
  corporate_name,
  business_or_trade_name,
  sec_registration_number,
  date_of_annual_meeting,
  actual_date_of_annual_meeting,
  complete_principal_office_address,
  date_registered,
  fiscal_year_end,
  corporate_tin,
  website_url_address,
  official_email_address,
  fax_number,
  alternate_phone_number,
  telephone_number,
  geographical_code,
  alternate_email_address,
  official_mobile_number,
  name_of_external_auditor,
  sec_accreditation_number,
  industry_classification,
}) {
  return (
    <Page size="A4" style={{ position: "relative" }}>
      <Text style={styles.year}>{year}</Text>
      <View style={styles.view1}>
        <Text style={styles.text2_1_1}>{date_registered}</Text>
        <Text style={styles.text2_2}>{fiscal_year_end}</Text>
        <Text style={styles.text2_3}>{corporate_tin}</Text>
        <Text style={styles.text2_4}>{website_url_address}</Text>
        <Text style={styles.text2_5}>{official_email_address}</Text>
        <Text style={styles.text2_5}>{fax_number}</Text>
        <Text style={styles.text2_5}>{alternate_phone_number}</Text>
        <Text style={styles.text2_6}>{telephone_number}</Text>
        <Text>{geographical_code}</Text>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text1_1}>{corporate_name}</Text>
        <Text style={styles.text1_1_1}>{business_or_trade_name}</Text>
        <Text style={styles.text1_2}>{sec_registration_number}</Text>
        <Text style={styles.text1_3}>{date_of_annual_meeting}</Text>
        <Text style={styles.text1_4}>{actual_date_of_annual_meeting}</Text>
        <Text style={styles.text1_5}>{complete_principal_office_address}</Text>
        <Text>{complete_principal_office_address}</Text>
      </View>
      <View style={styles.view3}>
        <Text style={styles.text2_1}>{official_email_address}</Text>
        <Text style={styles.text2_1}>{alternate_email_address}</Text>
        <Text style={styles.text2_1}>{official_mobile_number}</Text>
      </View>
      <View style={styles.view4}>
        <Text style={styles.text2_1}>{name_of_external_auditor}</Text>
        <Text style={styles.text2_1}>{sec_accreditation_number}</Text>
      </View>
      <View style={styles.view5}>
        <Text style={styles.text2_1}></Text>
        <Text style={styles.text2_1}>{industry_classification}</Text>
      </View>
      <Image
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          width: "100%",
        }}
        src={pageOne}
      ></Image>
    </Page>
  );
}

PageOne.defaultProps = {
  year: "N/A",
  corporateName: "N/A",
};

export default PageOne;
