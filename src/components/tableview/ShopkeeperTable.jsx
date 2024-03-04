import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Alert, MenuItem, Select, Snackbar } from "@mui/material";
import { methods } from "../../constants/methods";
import { select_styles2 } from "../../constants/select_styles2";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";


function ShopkeeperTable({ resultList, setResultList }) {

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
      .then((res) => {
        if(res.ok) setOpen(true);
        else alert("Something went wrong");
      })
      .catch((err) => alert(err));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <b>Serial</b>
            </StyledTableCell>
            <StyledTableCell align="right">
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
              <b>Status</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {resultList.map((row,idx) => (
            <StyledTableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {idx+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.strShopKeeperCode}</StyledTableCell>
              <StyledTableCell align="right">{row.shopname}</StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.district}</StyledTableCell>
              <StyledTableCell align="right">{row.upzila}</StyledTableCell>
              <StyledTableCell align="right">
                <Select
                  value={row.status}
                  sx={select_styles2}
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
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Status updated successfully.
      </Alert>
    </Snackbar>
    </>
  );
}

export default ShopkeeperTable;
