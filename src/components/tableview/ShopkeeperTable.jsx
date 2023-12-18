import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MenuItem, Select } from "@mui/material";
import { methods } from "../../constants/methods";
import { select_styles } from "../../constants/select_styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    backgroundColor: "#2f2f3d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.8rem",
    fontFamily: "Inter",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



function ShopkeeperTable({ resultList, setResultList, totalAmount }) {

  // array of action status
  const [statusList,setStatusList] = useState([]);

// handle status select
  const handleSelectStatus = async (row_code,s_status) => {
    const updatedResultList = resultList.map(result =>
      result.strShopKeeperCode === row_code ? { ...result, status: s_status } : result
    );
    setResultList(updatedResultList);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "shopkeeper/status");
    url.searchParams.append("strShopKeeperCode", row_code);
    await fetch(url, {
      method: methods.PUT,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: s_status
      })
    })
      .then((res) => res.json())
      .then((obj) => {
      })
      .catch((err) => alert(err));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <b>Name</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Shop</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Phone</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Email</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Action</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {resultList.map((row) => (
            <StyledTableRow
              key={row.ReceiptNumber}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.shopname}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">
                <Select
                  value={row.status}
                  sx={select_styles}
                  onChange={(e) => handleSelectStatus(row.strShopKeeperCode,e.target.value)}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                >
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {totalAmount && (
            <StyledTableRow
              key={-1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">
                <b>Total: {totalAmount}</b>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShopkeeperTable;
