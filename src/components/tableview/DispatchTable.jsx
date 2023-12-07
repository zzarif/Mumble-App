import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function DispatchTable({ resultList, totalAmount }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell><b>Receipt Number</b></StyledTableCell>
            <StyledTableCell align="right"><b>Date</b></StyledTableCell>
            <StyledTableCell align="right"><b>Shopname</b></StyledTableCell>
            <StyledTableCell align="right"><b>Shopkeeper</b></StyledTableCell>
            <StyledTableCell align="right"><b>District</b></StyledTableCell>
            <StyledTableCell align="right"><b>Upozilla</b></StyledTableCell>
            <StyledTableCell align="right"><b>Beneficiary Name</b></StyledTableCell>
            <StyledTableCell align="right"><b>Beneficiary Phone Number</b></StyledTableCell>
            <StyledTableCell align="right"><b>Total Amount</b></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {resultList.map((row) => (
            <StyledTableRow
              key={row.ReceiptNumber}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ReceiptNumber}
              </TableCell>
              <StyledTableCell align="right">{new Date(row.Date).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{row.ShopKeeper.shopname}</StyledTableCell>
              <StyledTableCell align="right">{row.ShopKeeper.name}</StyledTableCell>
              <StyledTableCell align="right">{row.ShopKeeper.district}</StyledTableCell>
              <StyledTableCell align="right">{row.ShopKeeper.upzila}</StyledTableCell>
              <StyledTableCell align="right">{row.Girl.strName}</StyledTableCell>
              <StyledTableCell align="right">{row.Girl.strPhone}</StyledTableCell>
              <StyledTableCell align="right">{row.grossamt}</StyledTableCell>
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
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"><b>Total: {totalAmount}</b></StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DispatchTable;
