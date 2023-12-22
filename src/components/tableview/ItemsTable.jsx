import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, MenuItem, Select } from "@mui/material";
import { methods } from "../../constants/methods";
import { select_styles } from "../../constants/select_styles";
import {
  DeleteOutline,
  Edit,
  EditOff,
  EditOutlined,
  UpdateOutlined,
  UpdateRounded,
} from "@mui/icons-material";
import UpdateItem from "../items-crud/UpdateItem";

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

function ItemsTable({ resultList, loadItemList }) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  // handle delete item
  const handleDelete = async (id) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "item");
    url.searchParams.append("id", id);
    await fetch(url, {
      method: methods.DELETE,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          loadItemList();
        } else alert("Something went wrong");
      })
      .catch((err) => alert(err));
  };

  return (
    <>
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
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
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
                    <EditOutlined
                      onClick={() => {
                        setData(row);
                        setOpen(true);
                      }}
                    />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton edge="end" aria-label="delete">
                    <DeleteOutline onClick={() => handleDelete(row.id)} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data && <UpdateItem open={open} setOpen={setOpen} data={data} />}
    </>
  );
}

export default ItemsTable;
