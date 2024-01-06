import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import PreviewReport from "../report-preview/PreviewReport";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";


function ReportsTable({ resultList }) {
  // preview controller
  const [open,setOpen] = useState(false);
  
  // row data
  const [data,setData] = useState([]);

  // handle row click
  const handleRowClick = (rowData) => {
    setOpen(true);
    setData(rowData);
  }

  const getTotal = (invoices) => {
    var total = 0;
    for(var i=0; i<invoices.length; i++) 
      total += invoices[i].grossamt;
    return total;
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <b>Code</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Shopname</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Owner</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Phone</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>District</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Upazilla</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Total Amount</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {resultList.map((row) => (
            <StyledTableRow
              key={row.strShopKeeperCode}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => handleRowClick(row)}
            >
              <StyledTableCell component="th" scope="row">
                {row.strShopKeeperCode}
              </StyledTableCell>
              <StyledTableCell align="right">{row.shopname}</StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.district}</StyledTableCell>
              <StyledTableCell align="right">{row.upzila}</StyledTableCell>
              <StyledTableCell align="right">{getTotal(row.Invcoices)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <PreviewReport open={open} setOpen={setOpen} data={data}/>
    </>
  );
}

export default ReportsTable;
