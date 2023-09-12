import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

export default function DashboardDialog({ state, setState }) {
  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
      state: false,
    }));
  };

  const handleAccept = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
      state: true,
    }));
  };

  return (
    <div>
      <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Určite chcete zmazať ${state?.timeObject?.value} tento čas?`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAccept} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
