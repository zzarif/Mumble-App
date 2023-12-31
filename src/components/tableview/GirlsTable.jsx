import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import { methods } from "../../constants/methods";
import {
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import UpdateGirl from "../girl-crud/UpdateGirl";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

function GirlsTable({ resultList, loadGirlList }) {
  // selected fields
  const [code,setCode] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [district,setDistrict] = useState("");
  const [upozilla,setUpozilla] = useState("");

  const [open, setOpen] = useState(false);

  // handle delete item
  const handleDelete = async (id) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + `girl/${id}`);
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
              {/* <StyledTableCell align="right">
                <b>Email</b>
              </StyledTableCell> */}
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
                <b>Upazilla</b>
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
                {/* <StyledTableCell align="right">{row.strEmail}</StyledTableCell> */}
                <StyledTableCell align="right">{row.strPhone}</StyledTableCell>
                <StyledTableCell align="right">{new Date(row.strDOB).toISOString().replace(/T.*/g,'')}</StyledTableCell>
                <StyledTableCell align="right">{row.strDistrict}</StyledTableCell>
                <StyledTableCell align="right">{row.strSubLocation}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton 
                    edge="end" 
                    aria-label="update"
                    onClick={() => {
                      setCode(row.strGirlCode);
                      setName(row.strName);
                      setPhone(row.strPhone);
                      setDOB(row.strDOB);
                      setDistrict(row.strDistrict);
                      setUpozilla(row.strSubLocation);
                      setOpen(true);
                    }}
                    >
                    <Tooltip id="update-girl" title="Update Girl">
                      <EditOutlined />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleDelete(row.strGirlCode)} edge="end" aria-label="delete">
                    <Tooltip id="delete-girl" title="Delete Girl">
                      <DeleteOutline />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateGirl 
        open={open} 
        setOpen={setOpen} 
        code={code}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        DOB={DOB}
        setDOB={setDOB}
        district={district}
        setDistrict={setDistrict}
        upozilla={upozilla}
        setUpozilla={setUpozilla}
        loadGirlList={loadGirlList}
      />
    </>
  );
}

export default GirlsTable;
