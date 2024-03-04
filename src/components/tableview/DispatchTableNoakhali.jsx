import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import PreviewDispatch from '../dispatch-preview/PreviewDispatch';
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

function DispatchTableNoakhali({ resultList }) {
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
              <StyledTableCell align="right"><b>Receipt Number</b></StyledTableCell>
              <StyledTableCell align="right"><b>Date</b></StyledTableCell>
              <StyledTableCell align="right"><b>Staff</b></StyledTableCell>
              <StyledTableCell align="right"><b>Designation</b></StyledTableCell>
              <StyledTableCell align="right"><b>District</b></StyledTableCell>
              <StyledTableCell align="right"><b>Upazilla</b></StyledTableCell>
              <StyledTableCell align="right"><b>Union</b></StyledTableCell>
              <StyledTableCell align="right"><b>Beneficiary Name</b></StyledTableCell>
              <StyledTableCell align="right"><b>Beneficiary Phone Number</b></StyledTableCell>
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
                <StyledTableCell align="right">{row.ReceiptNumber}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.Date).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.name}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.shopname}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.district}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.upzila}</StyledTableCell>
                <StyledTableCell align="right">{row.ShopKeeper.strUnion?row.ShopKeeper.strUnion:"--"}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl?row.Girl.strName:"--"}</StyledTableCell>
                <StyledTableCell align="right">{row.Girl?row.Girl.strPhone:"--"}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PreviewDispatch open={open} setOpen={setOpen} data={data}/>
    </>
  );
}

export default DispatchTableNoakhali;
