import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import API_ROUTES from "../../constants/apiRoutes";

const DataPopup = ({ open, onClose, title, link, closeOption }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      PaperProps={{
        style: {
          maxWidth: "71.25em",
          height: "auto",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{title}</Typography>
        <Typography
          sx={{
            cursor: "pointer",
            border: "0.125em solid grey",
            borderRadius: "1em",
            padding: "0  0.375em",
          }}
          onClick={closeOption}
        >
          X
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          my={2}
          id="saved-view"
          sx={{
            overflow: "hidden",
            resize: "both",
            height: "25em",
            width: "100%",
            maxWidth: "71.25em",
            border: "0.063em solid #ccc",
            "& video": { width: "100%", height: "100%" },
          }}
        >
          <video
            src={`${process.env.REACT_APP_BACKEND_BASE_URL}${API_ROUTES.VIEW_UPLOADS}/${link}`}
            controls
          ></video>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DataPopup;
