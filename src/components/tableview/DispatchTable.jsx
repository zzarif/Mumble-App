import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import PreviewDispatch from '../dispatch-preview/PreviewDispatch';
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

function DispatchTable({ resultList, totalAmount }) {
  // preview controller
  const [open,setOpen] = useState(false);
  
  // row data
  const [data,setData] = useState([]);

  // handle row click
  const handleRowClick = (rowData) => {
    setOpen(true);
    setData(rowData);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell><b>Serial</b></StyledTableCell>
              {/* <StyledTableCell align="right"><b>Receipt Number</b></StyledTableCell> */}
              <StyledTableCell align="right"><b>Date</b></StyledTableCell>
              <StyledTableCell align="right"><b>Distribution Point</b></StyledTableCell>
              <StyledTableCell align="right"><b>Distributor</b></StyledTableCell>
              <StyledTableCell align="right"><b>District</b></StyledTableCell>
              <StyledTableCell align="right"><b>Upazilla</b></StyledTableCell>
              <StyledTableCell align="right"><b>Union</b></StyledTableCell>
              <StyledTableCell align="right"><b>Beneficiary Name</b></StyledTableCell>
              <StyledTableCell align="right"><b>Beneficiary Phone Number</b></StyledTableCell>
              <StyledTableCell align="right"><b>Total Amount</b></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {resultList.map((row,idx) => (
              <StyledTableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell component="th" scope="row">
                  {idx+1}
                </TableCell>
                {/* <StyledTableCell align="right">{row.ReceiptNumber}</StyledTableCell> */}
                <StyledTableCell align="right">{new Date(row.Date).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.shopname}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.name}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl.strDistrict}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl.strSubLocation}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl.strUnion?row.Girl.strUnion:"--"}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl?row.Girl.strName:"--"}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl?row.Girl.strPhone:"--"}</StyledTableCell>
                <StyledTableCell align="right">{row.grossamt}</StyledTableCell>
              </StyledTableRow>
            ))}
            {/* {totalAmount && (
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
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"><b>Total: {totalAmount}</b></StyledTableCell>
              </StyledTableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      <PreviewDispatch open={open} setOpen={setOpen} data={data}/>
    </>
  );
}

export default DispatchTable;
