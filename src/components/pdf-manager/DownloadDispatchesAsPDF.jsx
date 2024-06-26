import React, { useState } from "react";
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import { Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";

function DownloadDispatchesAsPDF({
  district,
  upozilla,
  shopname,
  startDate,
  endDate,
}) {
  // fetch all reports
  const [dlLoading, setDlLoading] = useState(false);
  const downloadDispatchesAsPDF = async () => {
    setDlLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "invoices/web");
    url.searchParams.append("district", district);
    url.searchParams.append("upzila", upozilla);
    url.searchParams.append("shopname", shopname);
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        // convert data & download as PDF
        exportPDF(obj.result);
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

    const title = `District: ${district ? district : "N.S."}\tUpazilla: ${
      upozilla ? upozilla : "N.S."
    }\tDate: ${getFormattedDate(startDate)} to ${getFormattedDate(endDate)}`;
    const headers = [
      [
        "Serial",
        "Date",
        "Distribution Point",
        "Distributor",
        "District",
        "Upazilla",
        "Union",
        "Beneficiary Name",
        "Beneficiary Phone No.",
      ],
    ];

    const body = data.map((item, idx) => [
      idx+1,
      new Date(item.Date).toLocaleDateString(),
      item.ShopKeeper.shopname,
      item.ShopKeeper.name,
      item.Girl.strDistrict,
      item.Girl.strSubLocation,
      item.Girl.strUnion?item.Girl.strUnion:"--",
      item.Girl?item.Girl.strName:"--",
      item.Girl?item.Girl.strPhone:"--",
    ]);

    const content = {
      startY: 50,
      head: headers,
      body: body,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("dispatches.pdf");
  };

  // format date
  const getFormattedDate = (dateString) => {
    const today = new Date(dateString);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  return (
    <LoadingButton
      loading={dlLoading}
      loadingPosition="start"
      startIcon={<Download />}
      onClick={downloadDispatchesAsPDF}
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

export default DownloadDispatchesAsPDF;
