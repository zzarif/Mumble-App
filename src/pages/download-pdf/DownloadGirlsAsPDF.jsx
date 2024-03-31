import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { downloadBtn } from "../../constants/downloadBtn";
import { select_styles } from "../../constants/select_styles";
import styles from "./downpdf.module.css";
import { useLocation } from "react-router-dom";

function DownloadGirlsAsPDF() {
  const location = useLocation();
  const resultList = location.state.resultList;
  // fetch all reports
  const [loading, setLoading] = useState(false);

  const rangeSize = 100;

  const generateRangeOptions = () => {
    const rangeOptions = [];
    const itemCount = resultList.length;

    for (let i = 0; i < itemCount; i += rangeSize) {
      const startIndex = i + 1;
      const endIndex = Math.min(i + rangeSize, itemCount);
      const rangeOption = `${startIndex}-${endIndex}`;
      rangeOptions.push(rangeOption);
    }

    return rangeOptions;
  };

  const rangeOptions = generateRangeOptions();

  const [selectedRange, setSelectedRange] = useState(rangeOptions[0]);
  const [selectedItems, setSelectedItems] = useState(resultList.slice(0,Math.min(rangeSize,resultList.length)));

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
    const [startIndex, endIndex] = event.target.value.split("-").map(Number);
    setSelectedItems(resultList.slice(startIndex - 1, endIndex));
  };

  // export PDF from jsPDF
  const exportPDF = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [297, 210], // A4 page size in mm
      });
      const input = document.getElementById("girlqrview");
      await html2canvas(input, {
        allowTaint: true,
        useCORS: true,
        scale: 2.8,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.1);

        // Set the image size and position to fit the page
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var position = 0;

        // Add the canvas image to the PDF document
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF document
        doc.save("GirlQRList.pdf");
      });
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.pageTitle}>Download Girls PDF</div>
      <div className={styles.bigContainer}>
        <div className={styles.rowContainer}>
          <FormControl sx={{ minWidth: "50%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Range
            </InputLabel>
            <Select
              fullWidth
              value={selectedRange}
              sx={select_styles}
              onChange={handleRangeChange}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Select Range"
            >
              {rangeOptions.map((obj) => (
                <MenuItem key={obj} value={obj}>
                  {obj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            disabled={selectedItems.length === 0}
            loading={loading}
            loadingPosition="start"
            startIcon={<Download />}
            onClick={exportPDF}
            variant="contained"
            sx={downloadBtn}
          >
            <span>Download PDF</span>
          </LoadingButton>
        </div>

        <div
          id="girlqrview"
          style={{
            width: "40rem",
            display: "flex",
            flexDirection: "column",
            padding: "0.5rem",
          }}
        >
          {selectedItems.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
                alignItems: "center",
                border: "1px solid gray",
                borderRadius: "1rem",
                marginBottom: (idx + 1) % 4 === 0 ? "6.1rem" : "1rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "Inter",
                  alignItems: "flex-start",
                  fontSize: "medium",
                }}
              >
                Name: {row.strName}
                <br />
                Father: {row.father ? row.father : "--"}
                <br />
                Mother: {row.mother ? row.mother : "--"}
                <br />
                District: {row.strDistrict}
                <br />
                Upazilla: {row.strSubLocation}
                <br />
                Union: {row.strUnion ? row.strUnion : "--"}
                <br />
                Phone: {row.strPhone}
                <br />
                Date of Birth:{" "}
                {new Date(row.strDOB).toISOString().replace(/T.*/g, "")}
              </div>
              <img
                style={{
                  width: "10rem",
                  height: "auto",
                }}
                src={
                  row.strImage
                    ? row.strImage
                    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOmY3NTYxODZmLWJjODYtNDA0MC04ZjViLTcyMWI0ODE2ZmU3ZDwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjBmY2UzMDUzLWRjZGEtNDcyNi1hYTg1LTQwNWI4MWNlYTA4MjwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBaAFoAwERAAIRAQMRAf/EABsAAQEBAAIDAAAAAAAAAAAAAAAGBwMFAQIE/8QAPBABAAEBAwkDCgUEAwEAAAAAAAECAwQRBQYWITFRcZPhEkFVExUyNVRhdIGkwgcUIrHRM4OR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OnndAfLlTOu2vVztLvYXWLDykdmqua+1OE7cNQJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DownloadGirlsAsPDF;
