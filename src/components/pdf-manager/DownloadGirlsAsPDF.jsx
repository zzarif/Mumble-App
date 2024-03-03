import React, { useState } from "react";
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import { Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";

function DownloadGirlsAsPDF({ district, upozilla }) {
  // fetch all reports
  const [dlLoading, setDlLoading] = useState(false);
  const downloadGirlsAsPDF = async () => {
    setDlLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "girls");
    url.searchParams.append("district", district);
    url.searchParams.append("strSubLocation", upozilla);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        // convert data & download as PDF
        exportPDF(obj);
      })
      .catch((err) => alert(err))
      .finally(() => setDlLoading(false));
  };

  // export PDF from jsPDF
  const exportPDF = (data) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Registered Girls";
    const headers = [["Name", "Phone", "District", "Upazilla"]];

    const body = data.map((item) => [
      item.strName,
      item.strPhone,
      item.strDistrict,
      item.strSubLocation,
    ]);

    const content = {
      startY: 50,
      head: headers,
      body: body,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("reports.pdf");
  };

  return (
    <LoadingButton
      loading={dlLoading}
      loadingPosition="start"
      startIcon={<Download />}
      onClick={downloadGirlsAsPDF}
      variant="contained"
      sx={{
        fontFamily: "Poppins",
        textTransform: "none",
      }}
    >
      <span>Download</span>
    </LoadingButton>
  );
}

export default DownloadGirlsAsPDF;
