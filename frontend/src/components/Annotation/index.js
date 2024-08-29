import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const AnnotationDialog = ({
  openPopup,
  handleAnnotationSubmit,
  annotation,
  handleAnnotationChange,
  close,
}) => {
  return (
    <Dialog
      open={openPopup}
      onClose={() => {}}
      sx={{
        "& .MuiTextField-root": {
          minWidth: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Edit Bio{" "}
        <Typography
          sx={{
            cursor: "pointer",
            border: "0.125em solid grey",
            borderRadius: "1em",
            padding: "0  0.375em",
          }}
          onClick={close}
        >
          X
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="bio"
          label="Bio"
          type="text"
          multiline
          sx={{
            "& textarea": {
              resize: "both",
              minHeight: "6.25em",
              overflow: "auto",
            },
            "#bio-helper-text": {
              textAlign: "right",
            },
          }}
          value={annotation}
          onChange={handleAnnotationChange}
          helperText={`${annotation.length}/${500} characters`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAnnotationSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnotationDialog;
