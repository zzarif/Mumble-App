import React, { Fragment } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow} from "../../styles/table_styles";

export default function PreviewReport({ open, setOpen, data }) {
  return (
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 300,
            maxHeight: 400,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            overflowY: "auto"
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontFamily="Poppins"
            fontWeight="lg"
            mb={1}
          >
            List of Receipts
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    <b>Receipt Number</b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Date</b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Beneficiary Name</b>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <b>Total Amount</b>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.Invcoices&&data.Invcoices.map((row,idx) => (
                  <StyledTableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.ReceiptNumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">{new Date(row.Date).toLocaleString()}</StyledTableCell>
                    <StyledTableCell align="right">{row.girlPhone}</StyledTableCell>
                    <StyledTableCell align="right">{row.grossamt}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
