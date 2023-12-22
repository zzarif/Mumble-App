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
import UpdateGirl from "../girl-crud/UpdateGirl";

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

function GirlsTable({ resultList, loadGirlList }) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  // handle delete item
  const handleDelete = async (id) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "girl");
    url.searchParams.append("id", id);
    await fetch(url, {
      method: methods.DELETE,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          loadGirlList();
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
                <b>Code</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Name</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Email</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Phone</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Date of Birth</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>District</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Upozilla</b>
              </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {resultList.map((row) => (
              <StyledTableRow
                key={row.strGirlCode}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.strGirlCode}
                </StyledTableCell>
                <StyledTableCell align="right">{row.strName}</StyledTableCell>
                <StyledTableCell align="right">{row.strEmail}</StyledTableCell>
                <StyledTableCell align="right">{row.strPhone}</StyledTableCell>
                <StyledTableCell align="right">{row.strDOB}</StyledTableCell>
                <StyledTableCell align="right">{row.strDistrict}</StyledTableCell>
                <StyledTableCell align="right">{row.strSubLocation}</StyledTableCell>
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
      {data && <UpdateGirl open={open} setOpen={setOpen} data={data} loadGirlList={loadGirlList}/>}
    </>
  );
}

export default GirlsTable;
