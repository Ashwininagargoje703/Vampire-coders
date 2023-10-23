import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import JobPostMoreInfoCard from ".";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function JobDetailsDialogs({ title }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          color: "white",
          backgroundColor: "#004c3d",
          textTransform: "none",
          ":hover": {
            color: "white",
            backgroundColor: "#004c3d",
            textTransform: "none",
          },
        }}
        onClick={handleClickOpen}
      >
        More Info
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: 600 }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.3em" /* Set width of scrollbar */,
              background: "#F5F5F5" /* Set background color of scrollbar */,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#004c3d" /* Set color of scrollbar thumb */,
            },
          }}
        >
          <JobPostMoreInfoCard />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ textTransform: "none", color: "#F5F5F5" }}
          >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
