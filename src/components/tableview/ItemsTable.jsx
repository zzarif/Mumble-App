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
import UpdateItem from "../items-crud/UpdateItem";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

function ItemsTable({ resultList, loadItemList }) {
  const [ID,setID] = useState("");
  const [name, setName] = useState("");
  const [max, setMax] = useState("");
  const [price, setPrice] = useState("");
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
                <b>Serial</b>
              </StyledTableCell>
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
            {resultList.map((row,idx) => (
              <StyledTableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {idx+1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.max}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton edge="end" aria-label="update"
                    onClick={() => {
                      setID(row.id);
                      setName(row.name);
                      setMax(row.max);
                      setPrice(row.price);
                      setOpen(true);
                    }}>
                    <Tooltip id="update-item" title="Update Item">
                      <EditOutlined />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton edge="end" aria-label="delete" 
                    onClick={() => handleDelete(row.id)}>
                    <Tooltip id="delete-item" title="Delete Item">
                    <DeleteOutline />
                    </Tooltip>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateItem 
        open={open}
        setOpen={setOpen}
        ID={ID}
        name={name}
        setName={setName}
        max={max}
        setMax={setMax}
        price={price}
        setPrice={setPrice}
        loadItemList={loadItemList}
      />
    </>
  );
}

export default ItemsTable;
