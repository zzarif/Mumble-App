import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function TableView({ resultList, totalAmount }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ReceiptNumber</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Shopkeeper</TableCell>
            <TableCell align="right">Girl</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultList.map((row) => (
            <TableRow
              key={row.ReceiptNumber}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ReceiptNumber}
              </TableCell>
              <TableCell align="right">{row.Date}</TableCell>
              <TableCell align="right">{row.ShopKeeper.name}</TableCell>
              <TableCell align="right">{row.Girl.strName}</TableCell>
              <TableCell align="right">{row.grossamt}</TableCell>
            </TableRow>
          ))}
          <TableRow
            key={-1}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">Total Amount: {totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableView;
