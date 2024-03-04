import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import { methods } from "../../constants/methods";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

function UsersTable({ resultList, setResultList }) {

// handle status select
  const handleStatusUpdate = async (rowData,new_status) => {
    const updatedResultList = resultList.map(result =>
      result.id === rowData.id ? { ...result, Active: new_status } : result
    );
    setResultList(updatedResultList);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "user");
    url.searchParams.append("id", rowData.id);
    await fetch(url, {
      method: methods.PUT,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: rowData.name,
        phone: rowData.phone,
        pin: rowData.pin,
        level: rowData.level,
        District: rowData.District,
        Active: new_status
      })
    })
      .then((res) => {
        if(res.ok) {if(new_status) setOpen(true);}
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
            <StyledTableCell>
              <b>Name</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Phone</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>PIN</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Level</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>District</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Approve</b>
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
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.pin}</StyledTableCell>
              <StyledTableCell align="right">{row.level}</StyledTableCell>
              <StyledTableCell align="right">{row.District}</StyledTableCell>
              <StyledTableCell align="right">
                <Checkbox
                  checked={row.Active}
                  onChange={(e) => handleStatusUpdate(row,e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Co-ordinator approved.
      </Alert>
    </Snackbar>
    </>
  );
}

export default UsersTable;
