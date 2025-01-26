import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "space-between", // Ensures spacing between sections
    padding: 20, // Adds padding around the page
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 2,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 10,
    color: "gray",
  },
});

const PdfDocument = ({
  companyName,
  hrEmail,
  productName,
  productType,
  requestDate,
  approvalDate,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Main Content */}
        <View style={styles.section}>
          <Text style={styles.header}>COMPANY NAME: {companyName} </Text>
          <Text style={styles.header}>HR Email: {hrEmail} </Text>
          <Text style={styles.header}>Asset's Information</Text>
          <Text style={styles.paragraph}>Product Name: {productName} </Text>
          <Text style={styles.paragraph}>Product Type: {productType}</Text>
          <Text style={styles.paragraph}>
            Request Date: {format(new Date(requestDate), "PPP")}
          </Text>
          <Text style={styles.paragraph}>
            Approval Date: {format(new Date(approvalDate), "PPP")}
          </Text>
        </View>
        <Text style={styles.footer}>
          Generated on: {format(new Date(), "PPP")}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;
