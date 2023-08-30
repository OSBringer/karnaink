import React, { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { LoaderContext } from "../../App";
function Loader(props) {
  const { loaderState } = useContext(LoaderContext);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loaderState}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
