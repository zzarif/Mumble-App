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
import { UpdateOutlined } from "@mui/icons-material";

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



function ItemsTable({ resultList }) {
  // handle status select
  const handleUpdate = async (rowData) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "item");
    url.searchParams.append("id", rowData.id);
    await fetch(url, {
      method: methods.PUT,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: rowData.name,
        max: rowData.max,
        price: rowData.price
      })
    })
      .then((res) => res.json())
      .then((obj) => {

        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  const [open0,setOpen0] = useState(false);
  const [open1,setOpen1] = useState(false);

  // handle delete item
  const handleDelete = async (id) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "item");
    url.searchParams.append("id",id);
    await fetch(url, {
      method: methods.DELETE,
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if(!res.ok) {
          alert("Something went wrong");
        } else {
          //
          return res.json();
        }
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
              <b>Max</b>
            </StyledTableCell>
            <StyledTableCell align="right">
              <b>Price</b>
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
              <StyledTableCell align="right">{row.max}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton edge="end" aria-label="update">
                  <UpdateOutlined
                    onClick={() => setOpen1(true)}
                  />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton edge="end" aria-label="delete">
                  <DeleteOutline
                    onClick={() => handleDelete(row.id)}
                  />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
