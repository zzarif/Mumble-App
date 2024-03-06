import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function DownloadGirlsAsPDF({ toggle, setToggle }) {
  // fetch all reports
  const [dlLoading, setDlLoading] = useState(false);

  useEffect(() => {
    if (!toggle) exportPDF();
  },[toggle]);

  // export PDF from jsPDF
  const exportPDF = async () => {
    try {
      setDlLoading(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [297, 210] // A4 page size in mm
      });
      const input = document.getElementById("girlqrview");
      await html2canvas(input,{allowTaint: true, useCORS: true, scale: 2.8 })
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 0.1);
  
            // Set the image size and position to fit the page
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var position = 0;
            
            // Add the canvas image to the PDF document
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }
        
            // Save the PDF document
            doc.save('GirlQRList.pdf');
          });
    } catch (err) {
      alert(err);
    } finally {
      setDlLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={dlLoading}
      loadingPosition="start"
      startIcon={<Download />}
      onClick={() => {if (toggle) setToggle(false)}}
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
