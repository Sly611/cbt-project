import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "21rem",
  bgcolor: "background.paper",
  border: "1px solid #25252525",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

export default function CustomModal(props) {


  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: props.badge ? "flex" : "none" }}>
              {props.badge}
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              fontWeight="bold"
              component="h2"
            >
              {props.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ borderRadius: 5, width: "80%", my: 2 }}
              onClick={props.buttonHandler}
            >
              {props.buttonText}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
